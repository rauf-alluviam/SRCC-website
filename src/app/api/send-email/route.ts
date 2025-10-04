import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, message, source } = await req.json();

    sendEmail({ name, email, phone, message, source });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: "Failed to send email" },
      { status: 500 }
    );
  }
}

async function sendEmail({
  name,
  email,
  phone,
  message,
  source,
}: {
  name: string;
  email: string;
  phone: string;
  message: string;
  source: string;
}) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"SRCC Truck Transport" <${process.env.EMAIL_USER}>`,
    to: "riya@novusha.com",
    subject: `New Business Inquiry - ${name} via ${source}`,
    text: `New inquiry received\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}\n\nSource: ${source}`,
    html: getEmailTemplate({ name, email, phone, message, source }),
    attachments: [
      {
        filename: "logo.png",
        path: path.join(process.cwd(), "public/logo.png"),
        cid: "srcc_logo",
      },
    ],
  });
}

function getEmailTemplate({
  name,
  email,
  phone,
  message,
  source,
}: {
  name: string;
  email: string;
  phone: string;
  message: string;
  source: string;
}) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Business Inquiry - SRCC Truck Transport</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f4f4f4;">
  
  <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f4f4f4; padding: 40px 0;">
    <tr>
      <td align="center">
        
        <!-- Main Email Container -->
        <table role="presentation" style="width: 100%; max-width: 680px; background-color: #ffffff; border-collapse: collapse; box-shadow: 0 4px 6px rgba(0,0,0,0.07);">
          
          <!-- Header with Logo -->
          <tr>
            <td style="background-color: #ffffff; padding: 30px 40px; text-align: center; border-bottom: 4px solid #F7941E;">
              <img src="cid:srcc_logo" alt="SRCC Truck Transport" style="height: 65px; display: block; margin: 0 auto;" />
            </td>
          </tr>

          <!-- Orange Accent Bar -->
          <tr>
            <td style="background-color: #F7941E; padding: 20px 40px;">
              <table role="presentation" style="width: 100%;">
                <tr>
                  <td>
                    <h1 style="margin: 0; color: #ffffff; font-size: 22px; font-weight: 600; letter-spacing: 0.3px;">
                      New Business Inquiry
                    </h1>
                  </td>
                  <td align="right">
                    <span style="display: inline-block; background-color: rgba(255,255,255,0.2); color: #ffffff; padding: 6px 14px; border-radius: 4px; font-size: 13px; font-weight: 600; letter-spacing: 0.5px;">
                      ${source.toUpperCase()}
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="padding: 40px 40px 30px 40px;">
              
              <!-- Introduction -->
              <table role="presentation" style="width: 100%; margin-bottom: 28px;">
                <tr>
                  <td>
                    <p style="margin: 0; font-size: 15px; color: #5B4B43; line-height: 1.6;">
                      A potential client has submitted an inquiry through the SRCC Truck Transport website. Review the details below and respond promptly to convert this lead.
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Inquiry Details -->
              <table role="presentation" style="width: 100%; border: 1px solid #e0e0e0; border-collapse: collapse; margin-bottom: 30px;">
                
                <!-- Table Header -->
                <tr style="background-color: #f8f8f8;">
                  <td colspan="2" style="padding: 14px 20px; border-bottom: 2px solid #e0e0e0;">
                    <p style="margin: 0; font-size: 14px; font-weight: 700; color: #1a1a1a; text-transform: uppercase; letter-spacing: 0.8px;">
                      Client Information
                    </p>
                  </td>
                </tr>

                <!-- Name -->
                <tr>
                  <td style="padding: 16px 20px; border-bottom: 1px solid #e0e0e0; width: 30%; background-color: #fafafa;">
                    <p style="margin: 0; font-size: 13px; font-weight: 700; color: #666666; text-transform: uppercase; letter-spacing: 0.5px;">
                      Name
                    </p>
                  </td>
                  <td style="padding: 16px 20px; border-bottom: 1px solid #e0e0e0; background-color: #ffffff;">
                    <p style="margin: 0; font-size: 15px; color: #1a1a1a; font-weight: 600;">
                      ${name}
                    </p>
                  </td>
                </tr>

                <!-- Email -->
                <tr>
                  <td style="padding: 16px 20px; border-bottom: 1px solid #e0e0e0; background-color: #fafafa;">
                    <p style="margin: 0; font-size: 13px; font-weight: 700; color: #666666; text-transform: uppercase; letter-spacing: 0.5px;">
                      Email
                    </p>
                  </td>
                  <td style="padding: 16px 20px; border-bottom: 1px solid #e0e0e0; background-color: #ffffff;">
                    <a href="mailto:${email}" style="margin: 0; font-size: 15px; color: #F7941E; font-weight: 600; text-decoration: none;">
                      ${email}
                    </a>
                  </td>
                </tr>

                <!-- Phone -->
                <tr>
                  <td style="padding: 16px 20px; border-bottom: 1px solid #e0e0e0; background-color: #fafafa;">
                    <p style="margin: 0; font-size: 13px; font-weight: 700; color: #666666; text-transform: uppercase; letter-spacing: 0.5px;">
                      Phone
                    </p>
                  </td>
                  <td style="padding: 16px 20px; border-bottom: 1px solid #e0e0e0; background-color: #ffffff;">
                    <a href="tel:${phone}" style="margin: 0; font-size: 15px; color: #F7941E; font-weight: 600; text-decoration: none;">
                      ${phone}
                    </a>
                  </td>
                </tr>

                <!-- Received -->
                <tr>
                  <td style="padding: 16px 20px; background-color: #fafafa;">
                    <p style="margin: 0; font-size: 13px; font-weight: 700; color: #666666; text-transform: uppercase; letter-spacing: 0.5px;">
                      Received
                    </p>
                  </td>
                  <td style="padding: 16px 20px; background-color: #ffffff;">
                    <p style="margin: 0; font-size: 14px; color: #666666;">
                      ${new Date().toLocaleString('en-US', { 
                        month: 'short', 
                        day: 'numeric', 
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true
                      })}
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Message Section -->
              <table role="presentation" style="width: 100%; margin-bottom: 32px;">
                <tr>
                  <td style="background-color: #f8f8f8; padding: 20px; border-left: 4px solid #F7941E;">
                    <p style="margin: 0 0 8px 0; font-size: 13px; font-weight: 700; color: #5B4B43; text-transform: uppercase; letter-spacing: 0.5px;">
                      Message
                    </p>
                    <p style="margin: 0; font-size: 15px; color: #5B4B43; line-height: 1.7; white-space: pre-wrap;">
${message}
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Action Buttons -->
              <table role="presentation" style="width: 100%;">
                <tr>
                  <td align="center" style="padding: 20px 0;">
                    <table role="presentation" style="border-collapse: separate; border-spacing: 12px 0;">
                      <tr>
                        <td>
                          <a href="mailto:${email}?subject=Re: Your Inquiry - SRCC Truck Transport" 
                             style="display: inline-block; background-color: #5B4B43; color: #ffffff; text-decoration: none; padding: 14px 28px; font-size: 14px; font-weight: 700; letter-spacing: 0.5px; text-transform: uppercase; border-radius: 3px;">
                            Reply to Client
                          </a>
                        </td>
                        <td>
                          <a href="http://srccweb.s3-website.ap-south-1.amazonaws.com/" 
                             style="display: inline-block; background-color: #F7941E; color: #ffffff; text-decoration: none; padding: 14px 28px; font-size: 14px; font-weight: 700; letter-spacing: 0.5px; text-transform: uppercase; border-radius: 3px;">
                            View Dashboard
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #5B4B43; padding: 30px 40px; border-top: 4px solid #F7941E;">
              <table role="presentation" style="width: 100%;">
                <tr>
                  <td align="center">
                    <p style="margin: 0 0 8px 0; font-size: 16px; color: #ffffff; font-weight: 700; letter-spacing: 0.5px;">
                      SRCC TRUCK TRANSPORT
                    </p>
                    <p style="margin: 0 0 16px 0; font-size: 13px; color: #D4C4BC; line-height: 1.5;">
                      Professional Logistics & Transportation Solutions
                    </p>
                    <div style="width: 50px; height: 2px; background-color: #F7941E; margin: 0 auto 16px auto;"></div>
                    <p style="margin: 0; font-size: 12px; color: #9A8B83; line-height: 1.6;">
                      © ${new Date().getFullYear()} SRCC Truck Transport. All Rights Reserved.<br/>
                      <span style="color: #8A7B73;">Automated notification from website contact system</span>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
  `;
}