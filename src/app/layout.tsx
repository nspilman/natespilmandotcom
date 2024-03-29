import { Metadata } from "next";
import "../../public/css/globals.css";
import { Layout } from "@/components/layout";
import Script from "next/script";

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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
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
  );
}
