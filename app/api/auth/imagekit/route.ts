import ImageKit from "imagekit";
import "dotenv/config";
import config from "@/lib/config";
import { NextResponse } from "next/server";

const imagekit = new ImageKit({
  publicKey: config.imagekit.publicKey,
  privateKey: config.imagekit.privateKey,
  urlEndpoint: config.imagekit.urlEndpoint,
});

export async function GET() {
  console.log("Hitted");

  const authParams = imagekit.getAuthenticationParameters();
  return NextResponse.json(authParams);
}
