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

const title = "学脉 Atlas — AI / NLP / CV 学术关系图谱";
const description = "探索中国大陆、香港、新加坡、美国与欧洲 AI、NLP、计算机视觉、多模态与机器人学者的师承、合作、研究群落与人才流向。关系与职业信息均附可追溯来源。";
const siteUrl = new URL("https://mizar77.github.io/xuemai-atlas/");
const faviconUrl = new URL("favicon.svg", siteUrl).toString();
const socialImageUrl = new URL("og.png", siteUrl).toString();

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
    images: [{ url: socialImageUrl, width: 1728, height: 910, alt: "学脉 Atlas — 中国大陆、香港、新加坡、美国与欧洲 AI / NLP / CV 学术关系图谱" }],
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
