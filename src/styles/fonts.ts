import { Inter as FontSans, Newsreader as FontSerif } from "next/font/google";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const fontSerif = FontSerif({
  subsets: ["latin"],
  style: ["italic", "normal"],
  variable: "--font-serif",
});
