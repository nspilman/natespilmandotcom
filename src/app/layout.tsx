import { Metadata } from "next";
import "../../public/css/globals.css";
import { Layout } from "@/components/layout";
import Script from "next/script";
import { CSPostHogProvider } from "./posthog-provider";

export const metadata: Metadata = {
  title: {
    absolute: "Nate Spilman Dot Com",
    template: "%s | Nate Spilman Dot Com",
  },
  description: "Nate Spilman's Personal Website",
  icons: "/favicon.png",
  authors: [{ name: "Nate Spilman", url: "https://natespilman.com" }],
  creator: "Nate Spilman",
  publisher: "Nate Spilman",
  openGraph: {
    title: 'Nate Spilman Dot Com',
    description: "Nate Spilman's Personal Website",
    url: 'https://natespilman.com',
    siteName: 'Nate Spilman Dot Com',
    images: [
      {
        url: 'https://natespilman.com/favicon.png',
        width: 630,
        height: 630,
        alt: 'Nate Spilman Dot Com',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CSPostHogProvider>
    <html lang="en">
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ID}`}
      />
      <Script id="get-google-analytics" strategy="lazyOnload">{`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ID}', {
        page_path: window.location.pathname,
        });
    `}</Script>
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
    </CSPostHogProvider>
  );
}
