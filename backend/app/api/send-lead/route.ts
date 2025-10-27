import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import path from "path";
import fs from "fs";

// ---------------- CORS Setup ----------------
const allowedOrigins = [
  "http://localhost:3000",
  "http://srccweb.s3-website.ap-south-1.amazonaws.com",
  "https://srcc-website-git-main-asthas-projects-a512680d.vercel.app",
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
    const { email, pdf } = await req.json();

    // Send email asynchronously to owner
    void sendCaseStudyEmail({ email, pdf });

    // Immediate success response
    return corsResponse({ success: true }, 200, req);
  } catch (err) {
    console.error("POST handler error:", err);
    return corsResponse({ success: false, error: String(err) }, 500, req);
  }
}

// ---------------- Email Sending Function ----------------
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
    secure: false,
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
  });

  try {
    const attachments = logoBuffer ? [{ filename: "logo.png", content: logoBuffer, cid: "srcc_logo" }] : [];

    // Only send email to owner
    await transporter.sendMail({
      from: `"SR Container Carriers" <${process.env.EMAIL_USER}>`,
      to: process.env.OWNER_EMAIL,
      subject: `New Case Study Download - ${pdf}`,
      html: getOwnerEmailTemplate({ email, pdf }),
      attachments,
    });

    console.log("Owner notified about case study download:", pdf, email);
  } catch (err) {
    console.error("Error sending case study email:", err);
  }
}

// ---------------- Owner Notification Email Template ----------------
function getOwnerEmailTemplate({ email, pdf }: { email: string; pdf: string }) {
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
                        A visitor has downloaded a case study from the SR Container Carriers website.
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
                      <p style="margin:0;font-size:15px;color:#1a1a1a;">${new Date().toLocaleString()}</p>
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
