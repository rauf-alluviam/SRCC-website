import { NextRequest, NextResponse } from "next/server";

const allowedOrigins = [
  "http://localhost:3000", // local dev
  "http://srccweb.s3-website.ap-south-1.amazonaws.com", // production
  "https://srcc-website-git-main-asthas-projects-a512680d.vercel.app", // preview deployment
];

export function corsResponse(body: any, status = 200, req?: NextRequest) {
  const requestOrigin = req?.headers.get("origin") || "";
  const isAllowed = allowedOrigins.includes(requestOrigin);

  if (!isAllowed) {
    return NextResponse.json({ error: "CORS not allowed" }, { status: 403 });
  }

  const response = NextResponse.json(body, { status });
  response.headers.set("Access-Control-Allow-Origin", requestOrigin); 
  response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  response.headers.set("Access-Control-Allow-Credentials", "true");
  return response;
}

export function handleOptions(req: NextRequest) {
  const requestOrigin = req.headers.get("origin") || "";
  const isAllowed = allowedOrigins.includes(requestOrigin);

  if (!isAllowed) {
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
