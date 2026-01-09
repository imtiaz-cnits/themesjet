import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: "mail.themesjet.com",
    port: 465,
    secure: true,
    auth: {
        user: "services@themesjet.com",
        pass: "]aKr[j);@BK5U+$S",
    },
});

export const sendServiceRequestEmail = async (data: any) => {
    const { name, email, company, phone, projectType, budget, title, description } = data;

    const htmlContent = `
    <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 8px; overflow: hidden;">
      <div style="background-color: #2563eb; padding: 20px; color: white;">
        <h2 style="margin: 0;">New Service Request</h2>
        <p style="margin: 5px 0 0;">From ${company}</p>
      </div>
      
      <div style="padding: 20px;">
        <h3 style="border-bottom: 2px solid #f3f4f6; padding-bottom: 10px;">Contact Information</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Phone:</strong> ${phone || "N/A"}</p>
        <p><strong>Company:</strong> ${company}</p>

        <h3 style="border-bottom: 2px solid #f3f4f6; padding-bottom: 10px; margin-top: 20px;">Project Details</h3>
        <p><strong>Type:</strong> ${projectType}</p>
        <p><strong>Budget:</strong> $${budget}</p>
        <p><strong>Title:</strong> ${title}</p>
        <div style="background: #f9fafb; padding: 15px; border-radius: 6px; margin-top: 10px;">
          <strong>Description:</strong><br/>
          ${description}
        </div>
      </div>
      
      <div style="background-color: #f9fafb; padding: 15px; text-align: center; font-size: 12px; color: #666;">
        Sent from Themes Jet Website
      </div>
    </div>
  `;

    try {
        await transporter.sendMail({
            from: '"Themes Jet Web" <services@themesjet.com>',
            to: "services@themesjet.com", // Sending to yourself
            replyTo: email, // So you can hit 'Reply' to answer the client
            subject: `[New Lead] ${projectType} - ${company}`,
            html: htmlContent,
        });
        console.log("Email sent successfully");
    } catch (error) {
        console.error("Error sending email:", error);
    }
};