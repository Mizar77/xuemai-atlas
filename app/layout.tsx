import type { Metadata } from "next";
import { headers } from "next/headers";
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

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const title = "学脉 Atlas — AI / NLP 学术关系图谱";
  const description = "探索新加坡 AI、NLP 与 LLM 学者的师承、合作、研究群落与人才流向。关系与职业信息均附可追溯来源。";

  return {
    metadataBase: new URL(`${protocol}://${host}`),
    title,
    description,
    icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
    openGraph: {
      title,
      description,
      type: "website",
      locale: "zh_CN",
      images: [{ url: "/og-public.png", width: 1200, height: 630, alt: "学脉 Atlas — 新加坡 AI / NLP 学术关系图谱" }],
    },
    twitter: { card: "summary_large_image", title, description, images: ["/og-public.png"] },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body className={`${noto.variable} ${space.variable}`}>{children}</body>
    </html>
  );
}
