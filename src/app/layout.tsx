import Player from "@/components/Player";
import Sidebar from "@/components/Sidebar";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Spotify Clone - Next.js",
  description: "Spotify Clone - Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="h-full flex flex-col bg-black">
          <div className="flex w-full grow-[1] overflow-hidden">
            {/* @ts-expect-error Async Server Component */}
            <Sidebar />
            {children}
          </div>
          <div className="h-[95px] grow-0 shrink-0 w-full">
            <Player />
          </div>
        </main>
      </body>
    </html>
  );
}
