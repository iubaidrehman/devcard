import { SiteConfig } from "@/config/site"

/**
 * Generates a standard VCF v3.0 string for the vCard.
 * @param config The site configuration containing user details.
 * @returns A formatted VCF string.
 */
export function generateVCard(config: SiteConfig): string {
  const [firstName, lastName] = config.name.split(" ")

  return `BEGIN:VCARD
VERSION:3.0
N:${lastName};${firstName};;;
FN:${config.name}
TITLE:${config.title}
EMAIL;type=INTERNET;type=WORK;type=PREF:${config.email}
URL:${config.url}
URL;type=GITHUB:${config.links.github}
URL;type=LINKEDIN:${config.links.linkedin}
URL;type=TWITTER:${config.links.twitter}
END:VCARD`
}
