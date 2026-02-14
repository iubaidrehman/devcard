/**
 * Generates a vCard 3.0 string for importing contacts.
 * @param data User data object
 * @returns Formatted vCard string
 */
export const generateVCard = (data: {
  firstName: string;
  lastName: string;
  title: string;
  email: string;
  url: string;
  linkedin?: string;
  github?: string;
  twitter?: string;
}) => {
  const vcard = `BEGIN:VCARD
VERSION:3.0
N:${data.lastName};${data.firstName};;;
FN:${data.firstName} ${data.lastName}
TITLE:${data.title}
EMAIL;type=INTERNET;type=WORK:${data.email}
URL:${data.url}
${data.linkedin ? `X-SOCIALPROFILE;type=linkedin:${data.linkedin}` : ''}
${data.github ? `X-SOCIALPROFILE;type=github:${data.github}` : ''}
${data.twitter ? `X-SOCIALPROFILE;type=twitter:${data.twitter}` : ''}
END:VCARD`;

  return vcard.trim();
};
