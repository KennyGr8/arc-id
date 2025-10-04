import * as bcrypt from "bcryptjs";

export const hashValue = async (value: string, saltRounds = 10) =>
  bcrypt.hash(value, saltRounds);

export const compareValue = async (value: string, hashedValue: string) =>
  bcrypt.compare(value, hashedValue);
