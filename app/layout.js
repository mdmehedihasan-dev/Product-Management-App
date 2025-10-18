"use client";
import "./globals.css";
import ReduxProvider from "./components/ReduxProvider";
import Header from "./components/Header";
import ProtectedRoute from "./components/ProtectedRoute";
import { usePathname } from "next/navigation";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/login";

  return (
    <html lang="en">
      <body className="bg-[#0D1821] text-[#EFF1F3] max-w-7xl mx-auto">
        <ReduxProvider>
          {isLoginPage ? (
            children
          ) : (
            <ProtectedRoute>
              <Header />
              <main className="p-6">{children}</main>
            </ProtectedRoute>
          )}
        </ReduxProvider>
      </body>
    </html>
  );
}
