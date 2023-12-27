import { Metadata } from "next";
import "../../public/css/globals.css";
import { Layout } from "@/components/layout";

export const metadata: Metadata = {
  title: "Nate Spilman Dot Com",
  description: "Nate Spilman's Personal Website",
  icons: "/favicon.png",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
