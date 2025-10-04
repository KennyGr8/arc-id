import geoip from "geoip-lite";
import { UAParser } from "ua-parser-js";
import crypto from "crypto";

export const getLocationFromIP = (ip: string) => {
  const geo = geoip.lookup(ip);
  return geo ? `${geo.city}, ${geo.country}` : "Unknown";
};

export const parseUserAgent = (ua: string) => {
  const parsed = new UAParser(ua);
  const device = parsed.getDevice();
  const os = parsed.getOS();
  const browser = parsed.getBrowser();
  return {
    device: device.model || device.type || "Unknown Device",
    os: os.name || "Unknown OS",
    browser: browser.name || "Unknown Browser",
  };
};

export const generateFingerprint = ({ ip, userAgent }: { ip: string; userAgent: string }) => {
  return crypto
    .createHash("sha256")
    .update(ip + userAgent)
    .digest("hex");
};
