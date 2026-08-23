"use client";

import { useEffect, useState, type FormEvent } from "react";

type FeedbackDrawerProps = {
  defaultSubject: string;
};

const feedbackOptions = [
  ["correction", "纠正现有信息"],
  ["add_person", "补充学者"],
  ["add_relation", "补充师承或合作关系"],
  ["career_update", "补充学生去向"],
  ["source", "补充来源"],
  ["other", "其他建议"],
] as const;

function feedbackApiUrl() {
  return window.location.hostname.toLowerCase() === "mizar77.github.io"
    ? "https://xuemai-atlas.miromind-0889.chatgpt.site/api/feedback"
    : "/api/feedback";
}

export default function FeedbackDrawer({ defaultSubject }: FeedbackDrawerProps) {
  const [open, setOpen] = useState(false);
  const [feedbackType, setFeedbackType] = useState("correction");
  const [subject, setSubject] = useState(defaultSubject);
  const [content, setContent] = useState("");
  const [sourceUrl, setSourceUrl] = useState("");
  const [submitterName, setSubmitterName] = useState("");
  const [contact, setContact] = useState("");
  const [website, setWebsite] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [reference, setReference] = useState("");

  useEffect(() => {
    if (open && !content && !reference) setSubject(defaultSubject);
  }, [defaultSubject, open, content, reference]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  async function submitFeedback(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const response = await fetch(feedbackApiUrl(), {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          feedbackType,
          subject,
          content,
          sourceUrl,
          submitterName,
          contact,
          website,
          context: `${window.location.pathname}${window.location.hash}`,
        }),
      });
      const payload = await response.json() as { error?: string; reference?: string };
      if (!response.ok) throw new Error(payload.error || "提交失败，请稍后再试。");
      setReference(payload.reference || "received");
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : "提交失败，请稍后再试。");
    } finally {
      setSubmitting(false);
    }
  }

  function startAnother() {
    setReference("");
    setContent("");
    setSourceUrl("");
    setFeedbackType("correction");
    setSubject(defaultSubject);
    setError("");
  }

  return (
    <>
      <button className="feedback-trigger" onClick={() => setOpen(true)} aria-label="提交纠错或补充信息">
        <span>＋</span><b>纠错 / 补充</b>
      </button>
      {open && <div className="feedback-overlay" onClick={() => setOpen(false)} aria-hidden="true" />}
      {open && <aside className="feedback-drawer open" role="dialog" aria-modal="true" aria-label="纠错与信息补充">
        <header>
          <div><small>CONTRIBUTE</small><h2>纠错与信息补充</h2></div>
          <button onClick={() => setOpen(false)} aria-label="关闭反馈面板">×</button>
        </header>

        {reference ? (
          <div className="feedback-success" role="status">
            <span>✓</span>
            <h3>已收到，谢谢你的补充。</h3>
            <p>提交内容将经过来源核验后再更新到图谱，不会直接公开显示。</p>
            <small>参考编号：{reference}</small>
            <button onClick={startAnother}>继续提交</button>
          </div>
        ) : (
          <form onSubmit={submitFeedback}>
            <p className="feedback-intro">欢迎纠正人物信息、师承关系、合作记录和职业去向。若能附上学校主页、个人简历、论文或公司页面，审核会更快。</p>
            <label>反馈类型<select value={feedbackType} onChange={(event) => setFeedbackType(event.target.value)}>{feedbackOptions.map(([value, label]) => <option value={value} key={value}>{label}</option>)}</select></label>
            <label>涉及对象<input value={subject} onChange={(event) => setSubject(event.target.value)} maxLength={160} required placeholder="人物、机构、公司或关系" /></label>
            <label>具体说明<textarea value={content} onChange={(event) => setContent(event.target.value)} minLength={10} maxLength={3000} required rows={7} placeholder="请说明需要纠正或补充的内容，以及你建议的准确表述。" /></label>
            <label>公开来源链接 <em>建议填写</em><input type="url" value={sourceUrl} onChange={(event) => setSourceUrl(event.target.value)} maxLength={600} placeholder="https://…" /></label>
            <div className="feedback-two-columns">
              <label>署名 <em>选填</em><input value={submitterName} onChange={(event) => setSubmitterName(event.target.value)} maxLength={100} placeholder="姓名或昵称" /></label>
              <label>联系方式 <em>选填</em><input value={contact} onChange={(event) => setContact(event.target.value)} maxLength={200} placeholder="邮箱" /></label>
            </div>
            <label className="feedback-honeypot" aria-hidden="true">Website<input value={website} onChange={(event) => setWebsite(event.target.value)} tabIndex={-1} autoComplete="off" /></label>
            {error && <p className="feedback-error" role="alert">{error}</p>}
            <button className="feedback-submit" type="submit" disabled={submitting}>{submitting ? "正在提交…" : "提交审核"}<span>→</span></button>
            <p className="feedback-privacy">联系方式仅用于必要的事实核对，不会在网站公开。所有反馈默认进入待审核队列。</p>
          </form>
        )}
      </aside>}
    </>
  );
}
