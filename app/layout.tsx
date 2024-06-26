"use client";
import { Poppins } from "next/font/google";
import { Josefin_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./utils/theme-provider";
import { Toaster } from "react-hot-toast";
import { Providers } from "./provider";
import { SessionProvider } from "next-auth/react";
import { useLoaduserQuery } from "@/redux/features/api/apiSlice";
import Loader from "./component/Loader/Loader";
import socketIO from "socket.io-client";
import dotenv from "dotenv";
dotenv.config();
import { useEffect } from "react";
const ENDPOINT = process.env.SOCKET_URL || "";
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-Poppins",
});
const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-Josefin",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="en">
        <body
          className={`${poppins.variable} ${josefin.variable} !bg-white bg-no-repeat dark:bg-gradient-to-b dark:from-gray-900  dark:to-black duration-300`}
        >
          <Providers>
            <SessionProvider>
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
              >
                <Custom>{children}</Custom>
                <Toaster position="top-center" reverseOrder={false} />
              </ThemeProvider>
            </SessionProvider>
          </Providers>
        </body>
      </html>
    </>
  );
}

const Custom: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isLoading } = useLoaduserQuery({});

  useEffect(() => {
    socketId.on("connection", () => {});
  }, []);

  return <>{isLoading ? <Loader /> : <>{children}</>}</>;
};
