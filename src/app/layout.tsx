
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/header/Navbar";
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from "@/app/queryClient";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { ReduxProvider } from '../utils/redux toolkit/ReduxProvider';

const inter = Inter({ subsets: ["latin"] });

// replaced this original package.json 
// "scripts": {
//     "dev": "next dev",
//     "build": "next build",
//     "start": "next start",
//     "lint": "next lint"
//   },

export const metadata: Metadata = {
  title: "دیجی لاگ بوک سازمانی",
  description: "دیجی لاگ بوک برای سازمان ها",
  icons: {
    icon: "/images/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ 
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <QueryClientProvider client={queryClient}>
        <body className="">
          <ReduxProvider>
              <Navbar /> 
              <main>{children}</main> {/* Main content area */}
              <ToastContainer/>        
          </ReduxProvider>
        </body>
      </QueryClientProvider>
    </html>
  );
}
