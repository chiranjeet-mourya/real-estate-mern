const sendEmail = async (option) => {
  try {
    const BREVO_API_KEY = process.env.BREVO_API_KEY?.trim();
    const EMAIL_USER = process.env.EMAIL_USER?.trim();

    if (!BREVO_API_KEY) {
      throw new Error("BREVO_API_KEY is missing");
    }

    if (!EMAIL_USER) {
      throw new Error("EMAIL_USER is missing");
    }

    if (!option?.email) {
      throw new Error("Recipient email is missing");
    }

    const data = {
      sender: {
        name: "Real Estate Platform",
        email: EMAIL_USER,
      },
      to: [
        {
          email: option.email,
        },
      ],
      subject: option.subject || "Email Verification OTP",
      htmlContent: option.message,
    };

    const response = await fetch(
      "https://api.brevo.com/v3/smtp/email",
      {
        method: "POST",
        headers: {
          accept: "application/json",
          "api-key": BREVO_API_KEY,
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    const result = await response.json();

    console.log("📧 Brevo Response:", result);

    if (!response.ok) {
      throw new Error(
        result?.message || "Brevo email sending failed"
      );
    }

    console.log("✅ Email sent successfully");
    console.log("📨 Message ID:", result.messageId);

    return result;
  } catch (error) {
    console.error("❌ Brevo Email Error:", error.message);
    throw error;
  }
};

export default sendEmail;