import type { Metadata } from "next";
import "../globals.css";
import { TopSection } from "./components/TopSection";
import { NotesContextProvider } from "../context/notesStore";
import { MainDash } from "./components/MainDash";
import { MyProvider } from "../context/store";
import { ToastProvider } from "@/components/ToastContainer";


export const metadata: Metadata = {
  title: "NoteX",
  description: "Generated by NoteX",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <body >
        
          <NotesContextProvider>
            <MyProvider>
            <TopSection/>
            <MainDash/>
            {children}
            <ToastProvider />
            </MyProvider>
          </NotesContextProvider>
        
        </body>
    </html>
  );
}
