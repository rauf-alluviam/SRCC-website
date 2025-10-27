import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import path from "path";
import fs from "fs";

// ---------------- CORS Setup ----------------
const allowedOrigins = [
  "http://localhost:3000", // local dev
  "http://srccweb.s3-website.ap-south-1.amazonaws.com", // production
  "https://srcc-website-git-main-asthas-projects-a512680d.vercel.app", // preview deployment
];

function corsResponse(body: any, status = 200, req?: NextRequest) {
  const requestOrigin = req?.headers.get("origin") || "";
  if (!allowedOrigins.includes(requestOrigin)) {
    return NextResponse.json({ error: "CORS not allowed" }, { status: 403 });
  }

  const response = NextResponse.json(body, { status });
  response.headers.set("Access-Control-Allow-Origin", requestOrigin);
  response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  response.headers.set("Access-Control-Allow-Credentials", "true");
  return response;
}

function handleOptions(req: NextRequest) {
  const requestOrigin = req.headers.get("origin") || "";
  if (!allowedOrigins.includes(requestOrigin)) {
    return new NextResponse(JSON.stringify({ error: "CORS not allowed" }), { status: 403 });
  }

  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": requestOrigin,
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Allow-Credentials": "true",
    },
  });
}

// ---------------- Preload Attachments ----------------
const logoBuffer = fs.existsSync(path.join(process.cwd(), "public/logo.png"))
  ? fs.readFileSync(path.join(process.cwd(), "public/logo.png"))
  : null;

const logo2Buffer = fs.existsSync(path.join(process.cwd(), "public/logo.png"))
  ? fs.readFileSync(path.join(process.cwd(), "public/logo.png"))
  : null;

// ---------------- API Handlers ----------------
export async function OPTIONS(req: NextRequest) {
  return handleOptions(req);
}

export async function POST(req: NextRequest) {
  const origin = req.headers.get("origin") || "";
  if (!allowedOrigins.includes(origin)) {
    return corsResponse({ error: "CORS not allowed" }, 403);
  }

  try {
    const { name, email, phone, message, source } = await req.json();

    // Send emails asynchronously (fire-and-forget)
    void sendEmail({ name, email, phone, message, source });

    // Immediate success response with CORS headers
    return corsResponse({ success: true }, 200, req);
  } catch (err) {
    return corsResponse({ success: false, error: String(err) }, 500, req);
  }
}

// ---------------- Email Sending Function ----------------
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
    host: "smtp-mail.outlook.com",
    port: 587,
    secure: false,
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
  });

  try {
    // Prepare attachments safely
    const ownerAttachments = logoBuffer ? [{ filename: "logo.png", content: logoBuffer, cid: "srcc_logo" }] : [];
    const userAttachments = logo2Buffer ? [{ filename: "logo.png", content: logo2Buffer, cid: "srcc_logo" }] : [];

    // ---------------- Owner Email ----------------
    await transporter.sendMail({
      from: `"SR Container Carriers" <${process.env.EMAIL_USER}>`,
      to: process.env.OWNER_EMAIL,
      subject: `New Business Inquiry - ${name} via ${source}`,
      html: getEmailTemplate({ name, email, phone, message, source }),
      attachments: ownerAttachments,
    });

    // ---------------- User Acknowledgment ----------------
    await transporter.sendMail({
      from: `"SR Container Carriers" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Thank You for Your Inquiry - SR Container Carriers`,
      html: getAcknowledgmentTemplate({ name, message }),
      attachments: userAttachments,
    });
  } catch (err) {
    console.error("Error sending emails:", err);
  }
}

// ---------------- Owner Email Template ----------------
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
  <title>New Business Inquiry - SR Container Carriers</title>
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
                      New Business Inquiry
                    </h1>
                  </td>
                  <td align="right">
                    <span style="display:inline-block;background-color:rgba(255,255,255,0.2);color:#ffffff;padding:6px 14px;border-radius:4px;font-size:13px;font-weight:600;letter-spacing:0.5px;">
                      ${source.toUpperCase()}
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
                      A potential client has submitted an inquiry through the SR Container Carriers website. Review the details below and respond promptly.
                    </p>
                  </td>
                </tr>
              </table>
              <table role="presentation" style="width:100%;border:1px solid #e0e0e0;border-collapse:collapse;margin-bottom:30px;">
                <tr style="background-color:#f8f8f8;">
                  <td colspan="2" style="padding:14px 20px;border-bottom:2px solid #e0e0e0;">
                    <p style="margin:0;font-size:14px;font-weight:700;color:#1a1a1a;text-transform:uppercase;letter-spacing:0.8px;">
                      Client Information
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:16px 20px;border-bottom:1px solid #e0e0e0;width:30%;background-color:#fafafa;">
                    <p style="margin:0;font-size:13px;font-weight:700;color:#666666;text-transform:uppercase;letter-spacing:0.5px;">Name</p>
                  </td>
                  <td style="padding:16px 20px;border-bottom:1px solid #e0e0e0;background-color:#ffffff;">
                    <p style="margin:0;font-size:15px;color:#1a1a1a;font-weight:600;">${name}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:16px 20px;border-bottom:1px solid #e0e0e0;background-color:#fafafa;">Email</td>
                  <td style="padding:16px 20px;border-bottom:1px solid #e0e0e0;background-color:#ffffff;"><a href="mailto:${email}" style="color:#F7941E;">${email}</a></td>
                </tr>
                <tr>
                  <td style="padding:16px 20px;border-bottom:1px solid #e0e0e0;background-color:#fafafa;">Phone</td>
                  <td style="padding:16px 20px;border-bottom:1px solid #e0e0e0;background-color:#ffffff;"><a href="tel:${phone}" style="color:#F7941E;">${phone}</a></td>
                </tr>
                <tr>
                  <td style="padding:16px 20px;background-color:#fafafa;">Received</td>
                  <td style="padding:16px 20px;background-color:#ffffff;">${new Date().toLocaleString('en-US', {month:'short',day:'numeric',year:'numeric',hour:'2-digit',minute:'2-digit',hour12:true})}</td>
                </tr>
              </table>
              <table role="presentation" style="width:100%;margin-bottom:32px;">
                <tr>
                  <td style="background-color:#f8f8f8;padding:20px;border-left:4px solid #F7941E;">
                    <p style="margin:0 0 8px 0;font-size:13px;font-weight:700;color:#5B4B43;text-transform:uppercase;letter-spacing:0.5px;">Message</p>
                    <p style="margin:0;font-size:15px;color:#5B4B43;line-height:1.7;white-space:pre-wrap;">${message}</p>
                  </td>
                </tr>
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

// ---------------- User Acknowledgment Template ----------------
function getAcknowledgmentTemplate({ name, message }: { name: string; message: string }) {
  const submissionDate = new Date().toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Thank You for Your Inquiry</title>
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
                <h2 style="color:#F7941E;margin-bottom:10px;">Hello ${name},</h2>
                <p style="font-size:15px;color:#5B4B43;line-height:1.6;">
                  Thank you for reaching out to <strong>SR Container Carriers</strong>. We have received your inquiry on <strong>${submissionDate}</strong> and will get back to you shortly.
                </p>
                <p style="font-size:15px;color:#5B4B43;line-height:1.6;">
                  <strong>Your Message:</strong><br/>${message}
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
