const nodemailer = require("nodemailer");

const sendContactMessage = async (req, res) => {
  try {
    const {
      name,
      email,
      subject,
      message,
    } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and message are required.",
      });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address.",
      });
    }

    // Gmail transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // Send email
    await transporter.sendMail({
      from: `"NurseConnect Website" <${process.env.GMAIL_USER}>`,
      to: process.env.CONTACT_RECEIVER,

      // When you click Reply, it replies to the visitor
      replyTo: email,

      subject: `NurseConnect Contact: ${
        subject || "General Inquiry"
      }`,

      text: `
New message from the NurseConnect website

--------------------------------

Name:
${name}

Email:
${email}

Subject:
${subject || "General Inquiry"}

Message:
${message}

--------------------------------

This message was sent through the NurseConnect Contact Us form.
      `,

      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #001F24;">

          <h2 style="color: #00535B;">
            New NurseConnect Contact Message
          </h2>

          <div style="
            background: #EDFCFF;
            padding: 20px;
            border-radius: 10px;
          ">

            <p>
              <strong>Name:</strong>
              ${name}
            </p>

            <p>
              <strong>Email:</strong>
              ${email}
            </p>

            <p>
              <strong>Subject:</strong>
              ${subject || "General Inquiry"}
            </p>

            <p>
              <strong>Message:</strong>
            </p>

            <div style="
              background: white;
              padding: 15px;
              border-radius: 8px;
              white-space: pre-wrap;
            ">
              ${message}
            </div>

          </div>

          <p style="
            color: #6F797A;
            font-size: 12px;
            margin-top: 20px;
          ">
            This message was sent through the NurseConnect Contact Us form.
          </p>

        </div>
      `,
    });

    return res.status(200).json({
      success: true,
      message: "Message sent successfully.",
    });

  } catch (error) {
    console.error("Contact email error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to send message.",
    });
  }
};

module.exports = {
  sendContactMessage,
};