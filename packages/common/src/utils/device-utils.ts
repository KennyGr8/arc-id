import geoip from "geoip-lite";

export function getGeoLocation(ip?: string) {
  const location = ip ? geoip.lookup(ip) : null;
  return {
    city: location?.city || null,
    country: location?.country || null,
  };
}
