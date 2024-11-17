import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
  let confirmLink;
  if (process.env.NODE_ENV === 'development') {
    confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`;
  } else {
    confirmLink = `https://app.structifyapp.com/auth/new-verification?token=${token}`;
  }

  await resend.emails.send({
    from: 'noreply@app.structifyapp.com',
    to: email,
    subject: 'Confirm your email',
    html: `<p>Click <a href="${confirmLink}">here</a> to confirm email.</p>`,
  });
};

export const sendPasswordEmail = async (email: string, token: string) => {
  let resetLink;
  if (process.env.NODE_ENV === 'development') {
    resetLink = `http://localhost:3000/auth/new-password?token=${token}`;
  } else {
    resetLink = `https://app.structifyapp.com/auth/new-password?token=${token}`;
  }

  await resend.emails.send({
    from: 'noreply@app.structifyapp.com',
    to: email,
    subject: 'Reset your password',
    html: `<p>Click <a href="${resetLink}">here</a> to reset password.</p>`,
  });
};
