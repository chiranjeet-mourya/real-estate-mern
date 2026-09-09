import Contact from "../models/contact.model.js";
import sendEmail from "../utils/sendEmail.js";
 
export const createContact = async (req, res) => {
  try {
    const { name, email, phone, role, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Name, email and message are required",
      });
    }
 
    const newContact = new Contact({
      name,
      email,
      phone: phone || "",
      role: role || "buyer",
      message,
    });

    await newContact.save();

    const adminEmail = process.env.EMAIL_USER;

    const adminMessage = `
      <div
        style="
          font-family: Arial, sans-serif;
          max-width: 600px;
          margin: 0 auto;
          color: #1e293b;
        "
      >
        <h2 style="color: #0d9488;">
          New Contact Request
        </h2>

        <p>
          You have received a new message from the platform.
        </p>

        <div
          style="
            background: #f8fafc;
            padding: 20px;
            border-radius: 10px;
            border: 1px solid #e2e8f0;
          "
        >
          <p>
            <strong>Name:</strong> ${name}
          </p>

          <p>
            <strong>Email:</strong> ${email}
          </p>

          <p>
            <strong>Phone:</strong> ${phone || "N/A"}
          </p>

          <p>
            <strong>Role:</strong> ${role || "N/A"}
          </p>

          <p style="margin-top: 15px;">
            <strong>Message:</strong>
          </p>

          <p
            style="
              font-style: italic;
              color: #475569;
            "
          >
            "${message}"
          </p>
        </div>
      </div>
    `;

    if (adminEmail) {
      try {
        await sendEmail({
          email: adminEmail,
          subject: `New Contact Message from ${name}`,
          message: adminMessage,
        });

        console.log("Admin notification email sent successfully");
      } catch (emailError) {
        console.error(
          "Admin notification email failed:",
          emailError.message
        );
      }
    } else {
      console.log("EMAIL_USER is not configured");
    }

    return res.status(201).json({
      success: true,
      message: "Message sent successfully",
    });

  } catch (error) {
    console.error("Contact error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to send message",
    });
  }
};
 
export const getAllContact = async (req, res) => {
  try {
    const contacts = await Contact
      .find()
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      contacts,
    });

  } catch (error) {
    console.error("Get contacts error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch contacts",
    });
  }
};
