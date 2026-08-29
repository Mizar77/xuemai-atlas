import { getDb } from "../../../db";
import { feedback } from "../../../db/schema";
import { eq } from "drizzle-orm";

const githubPagesOrigin = "https://mizar77.github.io";

const feedbackTypes = new Set([
  "correction",
  "add_person",
  "add_relation",
  "career_update",
  "source",
  "other",
]);

function clean(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function validSourceUrl(value: string) {
  if (!value) return true;
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

function corsHeaders(request: Request) {
  return request.headers.get("origin") === githubPagesOrigin
    ? { "Access-Control-Allow-Origin": githubPagesOrigin, Vary: "Origin" }
    : {};
}

function json(request: Request, body: unknown, init?: ResponseInit) {
  const headers = new Headers(init?.headers);
  Object.entries(corsHeaders(request)).forEach(([key, value]) => headers.set(key, value));
  return Response.json(body, { ...init, headers });
}

export async function OPTIONS(request: Request) {
  if (request.headers.get("origin") !== githubPagesOrigin) {
    return new Response(null, { status: 403 });
  }

  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": githubPagesOrigin,
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Max-Age": "86400",
      Vary: "Origin",
    },
  });
}

export async function GET(request: Request) {
  try {
    const reference = new URL(request.url).searchParams.get("reference")?.trim() ?? "";
    if (!/^fb_[a-f0-9]{12}$/i.test(reference)) {
      return json(request, { error: "请输入有效的反馈参考编号。" }, { status: 400 });
    }

    const db = getDb();
    const [record] = await db.select({ publicId: feedback.publicId, status: feedback.status, createdAt: feedback.createdAt })
      .from(feedback)
      .where(eq(feedback.publicId, reference))
      .limit(1);

    if (!record) return json(request, { error: "未找到该反馈编号。" }, { status: 404 });
    return json(request, { reference: record.publicId, status: record.status, createdAt: record.createdAt });
  } catch {
    return json(request, { error: "暂时无法查询，请稍后再试。" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as Record<string, unknown>;
    const website = clean(payload.website, 200);

    // Hidden honeypot: acknowledge automated submissions without storing them.
    if (website) {
      return json(request, { ok: true, reference: "received" }, { status: 201 });
    }

    const feedbackType = clean(payload.feedbackType, 40);
    const subject = clean(payload.subject, 160);
    const content = clean(payload.content, 3000);
    const sourceUrl = clean(payload.sourceUrl, 600);
    const submitterName = clean(payload.submitterName, 100);
    const contact = clean(payload.contact, 200);
    const context = clean(payload.context, 300);

    if (!feedbackTypes.has(feedbackType)) {
      return json(request, { error: "请选择反馈类型。" }, { status: 400 });
    }
    if (subject.length < 2) {
      return json(request, { error: "请填写涉及的人物、机构或关系。" }, { status: 400 });
    }
    if (content.length < 10) {
      return json(request, { error: "请至少提供 10 个字的说明。" }, { status: 400 });
    }
    if (!validSourceUrl(sourceUrl)) {
      return json(request, { error: "来源链接需要以 http:// 或 https:// 开头。" }, { status: 400 });
    }

    const publicId = `fb_${crypto.randomUUID().replaceAll("-", "").slice(0, 12)}`;
    const db = getDb();
    await db.insert(feedback).values({
      publicId,
      feedbackType: feedbackType as typeof feedback.$inferInsert.feedbackType,
      subject,
      content,
      sourceUrl: sourceUrl || null,
      submitterName: submitterName || null,
      contact: contact || null,
      context: context || null,
    });

    return json(request, { ok: true, reference: publicId }, { status: 201 });
  } catch {
    return json(request, { error: "暂时无法提交，请稍后再试。" }, { status: 500 });
  }
}
