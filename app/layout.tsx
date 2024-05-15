import { cn } from "@/lib/utils";
import "@/styles/globals.scss";
import { Inter as FontSans } from "next/font/google";
import { getServerSession } from "next-auth";
import SessionProvider from "@/components/provider/SessionProvider";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased bg-gradient-to-br from-[#1A1B20] to-[#020308]",
          fontSans.variable
        )}
      >
        <SessionProvider session={session}>{children}</SessionProvider>
      </body>
    </html>
  );
}
