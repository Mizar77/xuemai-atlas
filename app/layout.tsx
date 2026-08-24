import type { Metadata } from "next";
import { Noto_Sans_SC, Space_Grotesk } from "next/font/google";
import "./globals.css";

const noto = Noto_Sans_SC({
  variable: "--font-noto",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
});

const space = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
});

const title = "学脉 Atlas — AI / NLP 学术关系图谱";
const description = "探索香港与新加坡 AI、NLP、LLM 学者的师承、合作、研究群落与人才流向。关系与职业信息均附可追溯来源。";
const siteUrl = new URL("https://mizar77.github.io/xuemai-atlas/");
const faviconUrl = new URL("favicon.svg", siteUrl).toString();
const socialImageUrl = new URL("og-public.png", siteUrl).toString();

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title,
  description,
  icons: { icon: faviconUrl, shortcut: faviconUrl },
  openGraph: {
    title,
    description,
    type: "website",
    locale: "zh_CN",
    url: siteUrl,
    images: [{ url: socialImageUrl, width: 1200, height: 630, alt: "学脉 Atlas — 香港与新加坡 AI / NLP 学术关系图谱" }],
  },
  twitter: { card: "summary_large_image", title, description, images: [socialImageUrl] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body className={`${noto.variable} ${space.variable}`}>{children}</body>
    </html>
  );
}
