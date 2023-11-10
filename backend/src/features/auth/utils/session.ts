import { randomBytes } from "crypto";

export function generateSession(): Promise<string> {
  return new Promise((resolve, reject) => {
    randomBytes(48, (err, buffer) => {
      if (err) reject();
      resolve(buffer.toString("hex"));
    });
  });
}
