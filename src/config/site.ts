export const siteConfig = {
    name: 'Ubaid Rehman',
    description: 'Digital Business Card',
    title: 'Senior Full Stack Engineer',
    email: 'ubaidurrehman99913@gmail.com',
    url: 'https://iubaidrehman.com',
    links: {
        twitter: 'https://twitter.com/iubaidrehman',
        github: 'https://github.com/iubaidrehman',
        linkedin: 'https://linkedin.com/in/iubaidrehman',
    },
    // Allows overriding via ENV variables if needed in the future
    env: {
        url: process.env.NEXT_PUBLIC_SITE_URL,
    }
};

export type SiteConfig = typeof siteConfig;
