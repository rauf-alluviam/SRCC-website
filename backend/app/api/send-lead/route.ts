import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import path from "path";
import { corsResponse, handleOptions } from "../../../lib/cors";

export async function OPTIONS() {
  return handleOptions();
}

export async function POST(req: NextRequest) {
  try {
    const { email, pdf } = await req.json();

    await sendCaseStudyEmail({ email, pdf });

    return corsResponse({ success: true });
  } catch (error) {
    console.error(error);
    return corsResponse({ success: false, error: String(error) }, 500);
  }
}

async function sendCaseStudyEmail({
  email,
  pdf,
}: {
  email: string;
  pdf: string;
}) {
  const transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    secure: false, // false for TLS
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // ---------------- Owner Notification Email ----------------
  await transporter.sendMail({
    from: `"SR Container Carriers" <${process.env.EMAIL_USER}>`,
    to: "asthabhatt2005@gmail.com",
    subject: `New Case Study Download - ${pdf}`,
    text: `New case study download\n\nEmail: ${email}\nRequested PDF: ${pdf}\nDownloaded: ${new Date().toLocaleString()}`,
    html: getCaseStudyEmailTemplate({ email, pdf }),
    attachments: [
      {
        filename: "logo.png",
        path: path.join(process.cwd(), "public/logo.png"),
        cid: "srcc_logo",
      },
    ],
  });
}

// ---------------- Owner Notification Email Template ----------------
function getCaseStudyEmailTemplate({
  email,
  pdf,
}: {
  email: string;
  pdf: string;
}) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Case Study Download - SR Container Carriers</title>
</head>
<body style="margin:0;padding:0;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;background-color:#f4f4f4;">
  <table role="presentation" style="width:100%;border-collapse:collapse;background-color:#f4f4f4;padding:40px 0;">
    <tr>
      <td align="center">
        <table role="presentation" style="width:100%;max-width:680px;background-color:#ffffff;border-collapse:collapse;box-shadow:0 4px 6px rgba(0,0,0,0.07);">
          <tr>
            <td style="background-color:#ffffff;padding:30px 40px;text-align:center;border-bottom:4px solid #F7941E;">
              <img src="cid:srcc_logo" alt="SR Container Carriers" style="height:65px;display:block;margin:0 auto;" />
            </td>
          </tr>
          <tr>
            <td style="background-color:#F7941E;padding:20px 40px;">
              <table role="presentation" style="width:100%;">
                <tr>
                  <td>
                    <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:600;letter-spacing:0.3px;">
                      New Case Study Download
                    </h1>
                  </td>
                  <td align="right">
                    <span style="display:inline-block;background-color:rgba(255,255,255,0.2);color:#ffffff;padding:6px 14px;border-radius:4px;font-size:13px;font-weight:600;letter-spacing:0.5px;">
                      WEBSITE
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:40px 40px 30px 40px;">
              <table role="presentation" style="width:100%; margin-bottom:28px;">
                <tr>
                  <td>
                    <p style="margin:0;font-size:15px;color:#5B4B43;line-height:1.6;">
                      A visitor has downloaded a case study from the SR Container Carriers website. This indicates strong interest in your services.
                    </p>
                  </td>
                </tr>
              </table>
              <table role="presentation" style="width:100%;border:1px solid #e0e0e0;border-collapse:collapse;margin-bottom:30px;">
                <tr style="background-color:#f8f8f8;">
                  <td colspan="2" style="padding:14px 20px;border-bottom:2px solid #e0e0e0;">
                    <p style="margin:0;font-size:14px;font-weight:700;color:#1a1a1a;text-transform:uppercase;letter-spacing:0.8px;">
                      Download Details
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:16px 20px;border-bottom:1px solid #e0e0e0;width:30%;background-color:#fafafa;">
                    <p style="margin:0;font-size:13px;font-weight:700;color:#666666;text-transform:uppercase;letter-spacing:0.5px;">Email</p>
                  </td>
                  <td style="padding:16px 20px;border-bottom:1px solid #e0e0e0;background-color:#ffffff;">
                    <a href="mailto:${email}" style="color:#F7941E;text-decoration:none;font-size:15px;font-weight:600;">${email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding:16px 20px;border-bottom:1px solid #e0e0e0;background-color:#fafafa;">
                    <p style="margin:0;font-size:13px;font-weight:700;color:#666666;text-transform:uppercase;letter-spacing:0.5px;">Case Study</p>
                  </td>
                  <td style="padding:16px 20px;border-bottom:1px solid #e0e0e0;background-color:#ffffff;">
                    <p style="margin:0;font-size:15px;color:#1a1a1a;font-weight:600;">${pdf}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:16px 20px;background-color:#fafafa;">
                    <p style="margin:0;font-size:13px;font-weight:700;color:#666666;text-transform:uppercase;letter-spacing:0.5px;">Downloaded</p>
                  </td>
                  <td style="padding:16px 20px;background-color:#ffffff;">
                    <p style="margin:0;font-size:15px;color:#1a1a1a;">${new Date().toLocaleString('en-US', {month:'short',day:'numeric',year:'numeric',hour:'2-digit',minute:'2-digit',hour12:true})}</p>
                  </td>
                </tr>
              </table>
              <table role="presentation" style="width:100%;margin-bottom:20px;">
              
              </table>
            </td>
          </tr>
          <tr>
            <td style="background-color:#5B4B43;padding:30px 40px;border-top:4px solid #F7941E;text-align:center;color:#fff;font-size:12px;">
              © ${new Date().getFullYear()} SR Container Carriers. All Rights Reserved.
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

// ---------------- User Acknowledgment Email Template ----------------
function getUserAcknowledgmentTemplate({
  email,
  pdf,
}: {
  email: string;
  pdf: string;
}) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Case Study Download - SR Container Carriers</title>
</head>
<body style="font-family:Arial,sans-serif;background-color:#f4f4f4;margin:0;padding:0;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center">
        <table width="680" style="background:#fff;margin:20px auto;padding:20px;box-shadow:0 4px 6px rgba(0,0,0,0.07);border-radius:8px;">
          <tr>
            <td style="text-align:center;padding:20px;border-bottom:4px solid #F7941E;">
              <img src="cid:srcc_logo" alt="SR Container Carriers" style="height:65px;">
            </td>
          </tr>
          <tr>
            <td style="padding:30px;">
              <h2 style="color:#F7941E;margin-bottom:10px;">Thank You for Your Interest!</h2>
              <p style="font-size:15px;color:#5B4B43;line-height:1.6;">
                We appreciate your interest in <strong>SR Container Carriers</strong>. Your case study "<strong>${pdf}</strong>" should begin downloading shortly.
              </p>
              <p style="font-size:15px;color:#5B4B43;line-height:1.6;">
                If you have any questions about our container transportation services or would like to discuss your specific logistics needs, please don't hesitate to reach out to us.
              </p>
              <div style="text-align:center;margin:30px 0;">
                <a href="mailto:${process.env.EMAIL_USER || 'contact@srcontainercarriers.com'}" style="display:inline-block;background-color:#F7941E;color:#ffffff;padding:12px 30px;text-decoration:none;border-radius:4px;font-weight:600;font-size:14px;">
                  Contact Us
                </a>
              </div>
              <p style="font-size:14px;color:#666;line-height:1.6;margin-top:20px;">
                We look forward to serving your container transportation needs.
              </p>
            </td>
          </tr>
          <tr>
            <td style="background:#5B4B43;color:#fff;text-align:center;padding:20px;font-size:12px;border-radius:0 0 8px 8px;">
              © ${new Date().getFullYear()} SR Container Carriers. All Rights Reserved.
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