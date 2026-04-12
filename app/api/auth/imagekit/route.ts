import ImageKit from "imagekit";
import config from "@/lib/config";
import { NextResponse } from "next/server";

const imagekit = new ImageKit({
  publicKey: config.imagekit.publicKey,
  privateKey: config.imagekit.privateKey,
  urlEndpoint: config.imagekit.urlEndpoint,
});

export async function GET() {
  const authParams = imagekit.getAuthenticationParameters();
  return NextResponse.json(authParams);
}
