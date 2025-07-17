import nodemailer from 'nodemailer';

export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  async sendVerificationCode(email: string, code: string): Promise<boolean> {
    try {
      // TODO: Make email html look better
      const mailOptions = {
        from: process.env.FROM_EMAIL || 'noreply@tuontabai.com',
        to: email,
        subject: 'Email Verification Code - TuonTaBai',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2563eb;">Email Verification</h2>
            <p>Your verification code is:</p>
            <div style="background-color: #f3f4f6; padding: 20px; text-align: center; border-radius: 8px; margin: 20px 0;">
              <h1 style="color: #1f2937; font-size: 32px; margin: 0; letter-spacing: 4px;">${code}</h1>
            </div>
            <p style="color: #6b7280;">This code will expire in 5 minutes.</p>
            <p style="color: #6b7280;">If you didn't request this code, please ignore this email.</p>
          </div>
        `,
      };

      await this.transporter.sendMail(mailOptions);
      return true;
    } catch (error) {
      console.error('Failed to send verification email:', error);
      return false;
    }
  }
}