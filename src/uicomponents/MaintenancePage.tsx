"use client";

import { useState } from "react";
import { AlertTriangle, ArrowUpRight, Lock, Wrench } from "lucide-react";

type Notice = {
  type: "idle" | "error" | "success";
  message: string;
};

export default function MaintenancePage() {
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notice, setNotice] = useState<Notice>({ type: "idle", message: "" });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!password.trim()) {
      setNotice({ type: "error", message: "יש להזין סיסמה." });
      return;
    }

    setIsSubmitting(true);
    setNotice({ type: "idle", message: "" });

    try {
      const response = await fetch("/api/maintenance/access", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const payload = (await response.json().catch(() => ({}))) as {
        error?: string;
      };

      if (!response.ok) {
        throw new Error(payload.error || "הכניסה לאתר נכשלה.");
      }

      setNotice({ type: "success", message: "אימות הצליח. מעביר לאתר..." });
      setPassword("");
      window.location.reload();
    } catch (error) {
      setNotice({
        type: "error",
        message: error instanceof Error ? error.message : "הכניסה לאתר נכשלה.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      dir="rtl"
      className="relative min-h-screen overflow-hidden bg-[#070709] px-4 py-12 text-white sm:px-6 lg:px-10"
    >
      <div className="bg-grid-pattern absolute inset-0 opacity-35" />
      <div className="absolute left-[-5rem] top-[15%] h-72 w-72 rounded-full bg-orange-300/15 blur-3xl" />
      <div className="absolute bottom-[-8rem] right-[12%] h-80 w-80 rounded-full bg-cyan-300/10 blur-3xl" />

      <div className="relative mx-auto max-w-3xl rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 shadow-[0_30px_120px_rgba(0,0,0,0.5)] backdrop-blur sm:p-8 lg:p-10">
        <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-orange-200/20 bg-orange-300/10">
          <Wrench className="h-6 w-6 text-orange-200" />
        </div>

        <div className="mt-5">
          <p className="text-xs uppercase tracking-[0.22em] text-zinc-400">
            Maintenance Mode
          </p>
          <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">
            האתר בשיפוצים כרגע
          </h1>
          <p className="mt-4 text-sm leading-7 text-zinc-300 sm:text-base">
            אנחנו מבצעים עדכונים ושיפורים. אפשר להיכנס לאתר בכל זאת באמצעות
            סיסמה.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-7 space-y-4">
          <label className="block text-sm text-zinc-300">
            סיסמה לכניסה בכל זאת
            <div className="mt-2 flex flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <Lock className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-black/35 py-3 pr-11 pl-4 text-white outline-none transition placeholder:text-zinc-500 focus:border-white/25"
                  placeholder="הזן סיסמה"
                  autoFocus
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-zinc-200 disabled:opacity-60 sm:min-w-[220px]"
              >
                {isSubmitting ? "מאמת..." : "מעבר לאתר בכל זאת"}
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
          </label>

          {notice.type !== "idle" && (
            <div
              className={[
                "rounded-2xl border px-4 py-3 text-sm",
                notice.type === "success"
                  ? "border-emerald-300/20 bg-emerald-300/10 text-emerald-100"
                  : "border-red-300/20 bg-red-300/10 text-red-100",
              ].join(" ")}
            >
              <div className="inline-flex items-center gap-2">
                {notice.type === "error" && <AlertTriangle className="h-4 w-4" />}
                {notice.message}
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

