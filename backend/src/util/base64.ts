export function encodeBase64(data: string): string {
  return Buffer.from(data).toString("base64");
}

export function decodeBase64(data: string): string {
  return Buffer.from(data, "base64").toString("ascii");
}
