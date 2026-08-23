import { getDb } from "../../../db";
import { feedback } from "../../../db/schema";

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

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as Record<string, unknown>;
    const website = clean(payload.website, 200);

    // Hidden honeypot: acknowledge automated submissions without storing them.
    if (website) {
      return Response.json({ ok: true, reference: "received" }, { status: 201 });
    }

    const feedbackType = clean(payload.feedbackType, 40);
    const subject = clean(payload.subject, 160);
    const content = clean(payload.content, 3000);
    const sourceUrl = clean(payload.sourceUrl, 600);
    const submitterName = clean(payload.submitterName, 100);
    const contact = clean(payload.contact, 200);
    const context = clean(payload.context, 300);

    if (!feedbackTypes.has(feedbackType)) {
      return Response.json({ error: "请选择反馈类型。" }, { status: 400 });
    }
    if (subject.length < 2) {
      return Response.json({ error: "请填写涉及的人物、机构或关系。" }, { status: 400 });
    }
    if (content.length < 10) {
      return Response.json({ error: "请至少提供 10 个字的说明。" }, { status: 400 });
    }
    if (!validSourceUrl(sourceUrl)) {
      return Response.json({ error: "来源链接需要以 http:// 或 https:// 开头。" }, { status: 400 });
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

    return Response.json({ ok: true, reference: publicId }, { status: 201 });
  } catch {
    return Response.json({ error: "暂时无法提交，请稍后再试。" }, { status: 500 });
  }
}
