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
      const mailOptions = {
        from: process.env.FROM_EMAIL || 'noreply@tuontabai.com',
        to: email,
        subject: '📚 Verify Your Email - TuonTaBai',
        html: `
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Email Verification - TuonTaBai</title>
          </head>
          <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background: linear-gradient(135deg, #00bcff 0%, #00a6f4 100%); min-height: 100vh;">
            <table role="presentation" style="width: 100%; border-collapse: collapse; margin: 0; padding: 0; background: linear-gradient(135deg, #00bcff 0%, #00a6f4 100%);">
              <tr>
                <td style="padding: 40px 20px; text-align: center;">
                  <!-- Main Container -->
                  <table role="presentation" style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04); overflow: hidden;">
                    
                    <!-- Header Section -->
                    <tr>
                      <td style="background: linear-gradient(135deg, #00bcff 0%, #00a6f4 100%); padding: 40px 30px; text-align: center;">
                        <h1 style="color: white; margin: 0 0 16px 0; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">TuonTaBai</h1>
                        <p style="color: rgba(255, 255, 255, 0.9); margin: 0; font-size: 16px; font-weight: 400;">Your learning journey starts here</p>
                      </td>
                    </tr>
                    
                    <!-- Content Section -->
                    <tr>
                      <td style="padding: 48px 40px;">
                        <!-- TODO: Email Verification Icon -->
                        
                        <!-- Main Heading -->
                        <h2 style="color: #030712; font-size: 28px; font-weight: 700; text-align: center; margin: 0 0 16px 0; line-height: 1.2;">
                          Verify Your Email Address
                        </h2>
                        
                        <!-- Description -->
                        <p style="color: #6b7280; font-size: 16px; line-height: 1.6; text-align: center; margin: 0 0 32px 0;">
                          Welcome to TuonTaBai! To complete your account setup and ensure the security of your learning journey, please verify your email address using the code below.
                        </p>
                        
                        <!-- Verification Code Box -->
                        <div style="
                          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
                          border: 2px solid #ebecec;
                          border-radius: 12px;
                          padding: 32px;
                          text-align: center;
                          margin: 32px 0;
                          position: relative;
                          overflow: hidden;
                          z-index: 0;
                        ">

                          <!-- Main content -->
                          <p style="
                            color: #374151;
                            font-size: 14px;
                            font-weight: 600;
                            text-transform: uppercase;
                            letter-spacing: 1px;
                            margin: 0 0 16px 0;
                          ">
                            Your Verification Code
                          </p>

                          <div style="
                            font-size: 42px;
                            font-weight: 800;
                            color: #030712;
                            letter-spacing: 8px;
                            font-family: 'Courier New', monospace;
                            margin: 16px 0;
                            position: relative;
                            z-index: 1;
                          ">
                            ${code}
                          </div>

                          <p style="
                            color: #6b7280;
                            font-size: 12px;
                            margin: 16px 0 0 0;
                            font-style: italic;
                          ">
                            Enter this code in the verification form
                          </p>
                        </div>
                        
                        <!-- Important Notice -->
                        <div style="background: #fef3cd; border: 1px solid #fbbf24; border-radius: 8px; padding: 16px; margin: 24px 0;">
                          <div style="display: flex; align-items: flex-start;">
                            <div style="flex-shrink: 0; margin-right: 12px;">
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="12" cy="12" r="10" stroke="#f59e0b" stroke-width="2"/>
                                <line x1="12" y1="8" x2="12" y2="12" stroke="#f59e0b" stroke-width="2" stroke-linecap="round"/>
                                <line x1="12" y1="16" x2="12.01" y2="16" stroke="#f59e0b" stroke-width="2" stroke-linecap="round"/>
                              </svg>
                            </div>
                            <div>
                              <p style="color: #92400e; font-size: 14px; font-weight: 600; margin: 0 0 4px 0;">Important:</p>
                              <p style="color: #92400e; font-size: 14px; margin: 0; line-height: 1.4;">
                                This verification code will expire in <strong>5 minutes</strong>. If you don't use it within this time, you'll need to request a new one.
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        <!-- Security Notice -->
                        <div style="background: #f0f9ff; border: 1px solid #00a6f4; border-radius: 8px; padding: 16px; margin: 24px 0;">
                          <div style="display: flex; align-items: flex-start;">
                            <div style="flex-shrink: 0; margin-right: 12px;">
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9 12l2 2 4-4" stroke="#00a6f4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3" stroke="#00a6f4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3" stroke="#00a6f4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M3 12h6m6 0h6" stroke="#00a6f4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                              </svg>
                            </div>
                            <div>
                              <p style="color: #0c4a6e; font-size: 14px; margin: 0; line-height: 1.4;">
                                <strong>Didn't request this?</strong> If you didn't create a TuonTaBai account, you can safely ignore this email. Your information remains secure.
                              </p>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                    
                    <!-- Footer Section -->
                    <tr>
                      <td style="background: #f8fafc; padding: 32px 40px; border-top: 1px solid #ebecec;">
                        <div style="text-align: center;">
                          <p style="color: #6b7280; font-size: 14px; margin: 0 0 16px 0; line-height: 1.5;">
                            Need help? Contact our support team at 
                            <a href="mailto:support@tuontabai.com" style="color: #00a6f4; text-decoration: none; font-weight: 600;">support@tuontabai.com</a>
                          </p>
                          
                          <div style="margin: 24px 0; height: 1px; background: #ebecec;"></div>
                          
                          <div style="margin-bottom: 16px;">
                            <span style="color: #6b7280; font-size: 16px; font-weight: 600;">TuonTaBai</span>
                          </div>
                          
                          <p style="color: #9ca3af; font-size: 12px; margin: 0; line-height: 1.4;">
                            This email was sent to ${email}. This is an automated message, please do not reply to this email.
                          </p>
                          
                          <p style="color: #9ca3af; font-size: 12px; margin: 8px 0 0 0;">
                            © ${new Date().getFullYear()} TuonTaBai. All rights reserved.
                          </p>
                        </div>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </body>
          </html>
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