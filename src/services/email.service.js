import sgMail from "@sendgrid/mail";

const sendEmail = async (to, content, subject) => {
  sgMail.setApiKey(process.env.SENDGRID_KEY);
  const msg = {
    to: to,
    from: process.env.FROM_EMAIL,
    subject: subject,
    html: content,
  };

  try {
    await sgMail.send(msg);
  } catch (err) {
    console.error(err);
  }
};

export default sendEmail;
