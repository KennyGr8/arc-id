import { randomUUID, randomBytes } from "crypto";

export const generateId = (): string => randomUUID();

export const generateShortId = (length = 16): string =>
  randomBytes(Math.ceil(length / 2))
    .toString("hex")
    .slice(0, length);

export const generateVerificationToken = (): string =>
  Math.floor(100000 + Math.random() * 900000).toString();
