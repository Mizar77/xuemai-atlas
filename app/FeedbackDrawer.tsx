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
  const [mode, setMode] = useState<"submit" | "status">("submit");
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
  const [statusReference, setStatusReference] = useState("");
  const [statusLoading, setStatusLoading] = useState(false);
  const [statusResult, setStatusResult] = useState<{ reference: string; status: "pending" | "reviewing" | "accepted" | "declined"; createdAt: string } | null>(null);

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
    setMode("submit");
  }

  async function lookupStatus(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatusLoading(true);
    setStatusResult(null);
    setError("");
    try {
      const response = await fetch(`${feedbackApiUrl()}?reference=${encodeURIComponent(statusReference.trim())}`);
      const payload = await response.json() as { error?: string; reference?: string; status?: "pending" | "reviewing" | "accepted" | "declined"; createdAt?: string };
      if (!response.ok || !payload.reference || !payload.status || !payload.createdAt) throw new Error(payload.error || "未找到该反馈编号。");
      setStatusResult({ reference: payload.reference, status: payload.status, createdAt: payload.createdAt });
    } catch (lookupError) {
      setError(lookupError instanceof Error ? lookupError.message : "暂时无法查询，请稍后再试。");
    } finally {
      setStatusLoading(false);
    }
  }

  return (
    <>
      <button className="feedback-trigger" onClick={() => {
        if (!content && !reference) setSubject(defaultSubject);
        setOpen(true);
      }} aria-label="提交纠错或补充信息">
        <span>＋</span><b>纠错 / 补充</b>
      </button>
      {open && <div className="feedback-overlay" onClick={() => setOpen(false)} aria-hidden="true" />}
      {open && <aside className="feedback-drawer open" role="dialog" aria-modal="true" aria-label="纠错与信息补充">
        <header>
          <div><small>CONTRIBUTE</small><h2>纠错与信息补充</h2></div>
          <button onClick={() => setOpen(false)} aria-label="关闭反馈面板">×</button>
        </header>

        <div className="feedback-tabs" role="tablist" aria-label="反馈功能">
          <button className={mode === "submit" ? "active" : ""} onClick={() => { setMode("submit"); setError(""); }} role="tab" aria-selected={mode === "submit"}>提交纠错</button>
          <button className={mode === "status" ? "active" : ""} onClick={() => { setMode("status"); setError(""); }} role="tab" aria-selected={mode === "status"}>查询进度</button>
        </div>

        {mode === "status" ? (
          <form className="feedback-status-form" onSubmit={lookupStatus}>
            <p className="feedback-intro">输入提交后获得的参考编号，查看审核进度。查询结果只显示状态和提交时间，不公开反馈正文或联系方式。</p>
            <label>反馈参考编号<input value={statusReference} onChange={(event) => setStatusReference(event.target.value)} required pattern="fb_[A-Za-z0-9]{12}" placeholder="fb_123456789abc" autoComplete="off" /></label>
            {error && <p className="feedback-error" role="alert">{error}</p>}
            <button className="feedback-submit" type="submit" disabled={statusLoading}>{statusLoading ? "正在查询…" : "查询处理状态"}<span>→</span></button>
            {statusResult && <div className={`feedback-status-result status-${statusResult.status}`} role="status"><small>{statusResult.reference}</small><strong>{{ pending: "待审核", reviewing: "核验中", accepted: "已采纳", declined: "未采纳" }[statusResult.status]}</strong><span>提交时间：{new Date(statusResult.createdAt).toLocaleString("zh-CN")}</span></div>}
          </form>
        ) : reference ? (
          <div className="feedback-success" role="status">
            <span>✓</span>
            <h3>已收到，谢谢你的补充。</h3>
            <p>提交内容将经过来源核验后再更新到图谱，不会直接公开显示。</p>
            <small>参考编号：{reference}</small>
            <button onClick={() => { setStatusReference(reference); setMode("status"); }}>查询处理状态</button>
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
