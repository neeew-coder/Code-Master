const { Resend } = require('resend');
const resend = new Resend(process.env.RESEND_API_KEY);

async function sendResetEmail(to, resetLink) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'CodeMaster <noreply@codemaster.com>',
      to,
      subject: 'Reset Your Password',
      html: `
        <div style="font-family: sans-serif;">
          <h2>Reset Your Password</h2>
          <p>Click below to reset your password:</p>
          <a href="${resetLink}" style="color:#6366f1;">Reset Password</a>
        </div>
      `
    });

    if (error) throw error;
    return data;
  } catch (err) {
    console.error("❌ Resend error:", err);
    throw new Error("Email dispatch failed");
  }
}

module.exports = { sendResetEmail };
