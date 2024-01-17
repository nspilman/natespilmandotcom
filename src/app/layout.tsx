import { Metadata } from "next";
import "../../public/css/globals.css";
import { Layout } from "@/components/layout";
import { GoogleTagManager } from "@next/third-parties/google";

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
      <body>
        <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GOOGLE_ID || ""} />
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
