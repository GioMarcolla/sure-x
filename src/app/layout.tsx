import type { Metadata } from 'next';
import { FC, HTMLAttributes, ReactElement } from 'react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/next';
import { cookies } from 'next/headers';
import SureThemeScript from '@/components/ui/SureThemeScript';
import { Fraunces, Roboto, Space_Grotesk } from 'next/font/google';
import '@/app/globals.css';
import { cn } from '@/lib/tailwind.utils';

const spaceGrotesk = Space_Grotesk({
    weight: ['400', '500', '600', '700'],
    subsets: ['latin', 'latin-ext'],
    variable: '--font-space-grotesk',
    display: 'swap',
});

const fraunces = Fraunces({
    weight: ['400', '500', '600', '700', '800', '900'],
    subsets: ['latin', 'latin-ext'],
    variable: '--font-fraunces',
    display: 'swap',
});

const roboto = Roboto({
    weight: ['400', '500', '600', '700', '800', '900'],
    subsets: ['latin', 'latin-ext'],
    variable: '--font-roboto',
    display: 'swap',
});

export const metadata: Metadata = {
    title: {
        default: 'Sureplai.ai',
        template: '%s | Sureplai.ai',
    },
    description:
        'Sureplai.ai — life interpretation and navigation through a living haze-map.',
    keywords: [
        'Sureplai',
        'life navigation',
        'life interpretation',
        'haze map',
        'signals',
        'insights',
        'directions',
        'self-navigation',
        'personal clarity',
        'orientation',
        'decision support',
    ],
    authors: [{ name: 'Sureplai', url: 'https://sureplai.ai' }],
    creator: 'Sureplai',
    publisher: 'Sureplai',
    openGraph: {
        title: 'Sureplai.ai — life interpretation and navigation',
        description:
            'Interpret signals, see your current state, and navigate through the haze with grounded direction.',
        url: 'https://sureplai.ai',
        siteName: 'Sureplai.ai',
        images: [
            {
                url: 'https://sureplai.ai/og-image.png',
                width: 1200,
                height: 630,
                alt: 'Sureplai.ai — life interpretation and haze map',
            },
        ],
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        site: '@sureplai',
        title: 'Sureplai.ai — life interpretation and navigation',
        description:
            'Interpret signals, understand your current state, and navigate with clarity.',
        images: ['https://sureplai.ai/og-image.png'],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    icons: {
        icon: '/images/favicon.ico?v=2',
        apple: '/images/apple-touch-icon.png?v=2',
        shortcut: '/images/favicon-32x32.png?v=2',
    },
};

type RootLayoutProps = HTMLAttributes<HTMLDivElement> & {};

const RootLayout: FC<RootLayoutProps> = async ({
    children,
}): Promise<ReactElement> => {
    const theme = (await cookies()).get('theme')?.value;

    return (
        <html
            lang="en"
            className={cn(
                'min-h-dvh antialiased',
                spaceGrotesk.variable,
                fraunces.variable,
                roboto.variable,
                theme ?? ''
            )}
            suppressHydrationWarning
        >
            <head>{!theme && <SureThemeScript />}</head>
            <body className="relative flex min-h-dvh flex-col">
                {children}
                <SpeedInsights />
                <Analytics />
            </body>
        </html>
    );
};

RootLayout.displayName = 'RootLayout';

export default RootLayout;
