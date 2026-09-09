import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import sendEmail from "../utils/sendEmail.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";

// Register
export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const userExits = await User.findOne({ email });
    if (userExits) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashpassword = await bcrypt.hash(password, 10);

    const verificationToken = Math.floor(
      100000 + Math.random() * 900000,
    ).toString();

    const user = await User.create({
      name,
      email,
      password: hashpassword,
      role,
      isApproved: role === "seller" ? false : true,
      verificationToken,
    });

    try {
      await sendEmail({
        email,
        subject: "Verify Your Email - Real EState Platform",
        message: `<p>Your emailverification code is: <strong>${verificationToken}</strong></p><p>Please enter this code on the verification page to activate your account</p>`,
      });
    } catch (emailError) {
      console.log("Failed to send verification email:", emailError);
    }

    res.status(201).json({
      message:
        "User registered. Please check your email for the verification code.",
      user: {
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required.",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Invalid Email or password.",
      });
    }

    if (!user.isVerified) {
      return res.status(403).json({
        message: "Please verify your email or contact support",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid Email or password.",
      });
    }

    if (user.isBlocked) {
      return res.status(403).json({
        message:
          "Your Account has been blocked by an admin. Please contact support",
      });
    }

    // token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    res.json({
      message: "Login Successfuly",
      token,
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// get profile pic
export const getme = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// verify email
export const verifyEmail = async (req, res) => {
  try {
    const { email, code } = req.body;
    if (!email || !code) {
      return res.status(400).json({ message: "Email and code are required." });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.isVerified) {
      return res.status(400).json({ message: "Email already verified." });
    }

    if (user.verificationToken !== code) {
      return res.status(400).json({ message: "Invalid verification code." });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();
    res.status(200).json({
      message: "Email verified successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

// forgot password
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const user = await User.findOne({
      email: normalizedEmail,
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "No user found with that email address",
      });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(20).toString("hex");

    // Token expires in 15 minutes
    const resetPasswordExpire = Date.now() + 15 * 60 * 1000;

    // Save hashed token in database
    user.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.resetPasswordExpire = resetPasswordExpire;

    await user.save();

    // Frontend URL
    const clientUrl = "http://localhost:5173";

    const resetUrl = `${clientUrl}/reset-password/${resetToken}`;

    console.log("🔗 Reset URL:", resetUrl);

    const message = `
      <div style="font-family: Arial, sans-serif;">
        <h2>Password Reset Request</h2>

        <p>
          You requested a password reset for your Real Estate Platform account.
        </p>

        <p>
          Click the button below to reset your password:
        </p>

        <p>
          <a
            href="${resetUrl}"
            style="
              display:inline-block;
              padding:12px 20px;
              background:#2563eb;
              color:white;
              text-decoration:none;
              border-radius:6px;
            "
          >
            Reset Password
          </a>
        </p>

        <p>
          Or copy this link into your browser:
        </p>

        <p>${resetUrl}</p>

        <p>
          This link will expire in 15 minutes.
        </p>

        <p>
          If you did not request this password reset, you can safely ignore this email.
        </p>
      </div>
    `;

    try {
      const emailResponse = await sendEmail({
        email: user.email,
        subject: "Password Reset - Real Estate Platform",
        message,
      });

      console.log("✅ Reset email sent:", emailResponse);

      return res.status(200).json({
        success: true,
        message: "Password reset email sent successfully",
      });
    } catch (emailError) {
      console.error("❌ Forgot Password Email Error:", emailError.message);

      // Remove reset token if email failed
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      await user.save();

      return res.status(500).json({
        success: false,
        message: "Could not send email",
        error: emailError.message,
      });
    }
  } catch (err) {
    console.error("❌ Forgot Password Error:", err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// reset password
export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid or expire password reset token",
        success: false,
      });
    }

    user.password = await bcrypt.hash(password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(200).json({
      message: "Password updated successfully",
      success: true,
    });
  } catch (err) {
    res.status(500).json({ message: err.message, success: false });
  }
};
