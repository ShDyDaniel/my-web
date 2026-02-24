"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Activity,
  AlertTriangle,
  BarChart3,
  Check,
  Lock,
  RefreshCw,
  TrendingDown,
  TrendingUp,
  Users,
<<<<<<< HEAD
  Wrench,
=======
>>>>>>> a195d84 (Initial upload or update)
} from "lucide-react";
import type { DailyTrafficPoint, TrafficSummary } from "@/lib/traffic-analytics";

type Notice = {
  type: "idle" | "success" | "error";
  message: string;
};

type LoadState = "idle" | "loading" | "ready" | "error";

<<<<<<< HEAD
type MaintenanceState = {
  enabled: boolean;
  updatedAt: string;
};

=======
>>>>>>> a195d84 (Initial upload or update)
const ADMIN_PASSWORD = "12321";

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [loadState, setLoadState] = useState<LoadState>("idle");
<<<<<<< HEAD
  const [isMaintenanceUpdating, setIsMaintenanceUpdating] = useState(false);
  const [notice, setNotice] = useState<Notice>({ type: "idle", message: "" });
  const [summary, setSummary] = useState<TrafficSummary | null>(null);
  const [maintenanceState, setMaintenanceState] = useState<MaintenanceState | null>(
    null,
  );
=======
  const [notice, setNotice] = useState<Notice>({ type: "idle", message: "" });
  const [summary, setSummary] = useState<TrafficSummary | null>(null);
>>>>>>> a195d84 (Initial upload or update)

  const loadTraffic = async (pwd: string) => {
    setLoadState("loading");
    setNotice({ type: "idle", message: "" });

    try {
<<<<<<< HEAD
      const [trafficResponse, maintenanceResponse] = await Promise.all([
        fetch("/api/admin/traffic", {
          method: "GET",
          headers: {
            "x-admin-password": pwd,
          },
          cache: "no-store",
        }),
        fetch("/api/admin/maintenance", {
          method: "GET",
          headers: {
            "x-admin-password": pwd,
          },
          cache: "no-store",
        }),
      ]);

      const [trafficPayload, maintenancePayload] = (await Promise.all([
        trafficResponse.json().catch(() => ({})),
        maintenanceResponse.json().catch(() => ({})),
      ])) as [TrafficSummary | { error?: string }, MaintenanceState | { error?: string }];

      if (!trafficResponse.ok) {
        const message =
          typeof (trafficPayload as { error?: string })?.error === "string"
            ? (trafficPayload as { error?: string }).error!
=======
      const response = await fetch("/api/admin/traffic", {
        method: "GET",
        headers: {
          "x-admin-password": pwd,
        },
        cache: "no-store",
      });

      const payload = (await response.json()) as
        | TrafficSummary
        | { error?: string };

      if (!response.ok) {
        const message =
          typeof (payload as { error?: string })?.error === "string"
            ? (payload as { error?: string }).error!
>>>>>>> a195d84 (Initial upload or update)
            : "טעינת נתוני טראפיק נכשלה";

        throw new Error(message);
      }

<<<<<<< HEAD
      if (!maintenanceResponse.ok) {
        const message =
          typeof (maintenancePayload as { error?: string })?.error === "string"
            ? (maintenancePayload as { error?: string }).error!
            : "טעינת מצב שיפוצים נכשלה";

        throw new Error(message);
      }

      setSummary(trafficPayload as TrafficSummary);
      setMaintenanceState(maintenancePayload as MaintenanceState);
      setLoadState("ready");
      setNotice({
        type: "success",
        message: "נתוני הטראפיק ומצב האתר נטענו בהצלחה.",
      });
=======
      setSummary(payload as TrafficSummary);
      setLoadState("ready");
      setNotice({ type: "success", message: "נתוני הטראפיק נטענו בהצלחה." });
>>>>>>> a195d84 (Initial upload or update)
      return true;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "טעינת נתוני טראפיק נכשלה";
      setLoadState("error");
      setNotice({ type: "error", message });
      return false;
    }
  };

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password !== ADMIN_PASSWORD) {
      setNotice({ type: "error", message: "סיסמה שגויה." });
      return;
    }

    const ok = await loadTraffic(password);
    if (!ok) {
      return;
    }

    setAdminPassword(password);
    setPassword("");
    setIsAuthenticated(true);
  };

  const handleRefresh = async () => {
    if (!adminPassword) {
      return;
    }

    await loadTraffic(adminPassword);
  };

<<<<<<< HEAD
  const handleSetMaintenance = async (nextEnabled: boolean) => {
    if (!adminPassword) {
      return;
    }

    const promptText = nextEnabled
      ? "כדי להעביר את האתר למצב שיפוצים, הזן שוב את הסיסמה:"
      : "כדי להחזיר את האתר לפעילות, הזן שוב את הסיסמה:";

    const confirmPassword = window.prompt(promptText, "") ?? "";

    if (!confirmPassword) {
      setNotice({ type: "error", message: "הפעולה בוטלה (לא הוזנה סיסמה)." });
      return;
    }

    setIsMaintenanceUpdating(true);
    setNotice({ type: "idle", message: "" });

    try {
      const response = await fetch("/api/admin/maintenance", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-admin-password": adminPassword,
        },
        body: JSON.stringify({
          enabled: nextEnabled,
          confirmPassword,
        }),
      });

      const payload = (await response.json().catch(() => ({}))) as
        | MaintenanceState
        | { error?: string };

      if (!response.ok) {
        throw new Error(
          typeof (payload as { error?: string })?.error === "string"
            ? (payload as { error?: string }).error!
            : "עדכון מצב שיפוצים נכשל.",
        );
      }

      setMaintenanceState(payload as MaintenanceState);
      setNotice({
        type: "success",
        message: nextEnabled
          ? "האתר הועבר למצב שיפוצים."
          : "האתר חזר לפעילות רגילה.",
      });
    } catch (error) {
      setNotice({
        type: "error",
        message:
          error instanceof Error ? error.message : "עדכון מצב שיפוצים נכשל.",
      });
    } finally {
      setIsMaintenanceUpdating(false);
    }
  };

=======
>>>>>>> a195d84 (Initial upload or update)
  if (!isAuthenticated) {
    return (
      <div
        dir="rtl"
        className="min-h-screen bg-[#070709] px-4 py-12 text-white sm:px-6"
      >
        <div className="mx-auto max-w-xl rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-2xl backdrop-blur sm:p-8">
          <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04]">
            <Lock className="h-5 w-5 text-orange-200" />
          </div>

          <h1 className="text-2xl font-semibold">Dashboard טראפיק (נסתר)</h1>
          <p className="mt-3 text-sm leading-7 text-zinc-300">
            הדף הזה מציג נתוני כניסות ותנועה כללית באתר בלבד. תידרש סיסמה בכל
            כניסה או רענון.
          </p>

          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <label className="block text-sm text-zinc-300">
              סיסמה
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition placeholder:text-zinc-500 focus:border-white/25"
                placeholder="הכנס סיסמה"
                autoFocus
              />
            </label>

            {notice.type === "error" && (
              <p className="text-sm text-red-300">{notice.message}</p>
            )}

            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-zinc-200 disabled:opacity-60"
              disabled={loadState === "loading"}
            >
              {loadState === "loading" ? "טוען..." : "כניסה לדשבורד"}
              <Lock className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    );
  }

  const last7Views = summary?.last7Days.reduce((sum, day) => sum + day.views, 0) ?? 0;
  const last7Uniques =
    summary?.last7Days.reduce((sum, day) => sum + day.uniques, 0) ?? 0;
  const prev7Views =
    summary?.previous7Days.reduce((sum, day) => sum + day.views, 0) ?? 0;
  const prev7Uniques =
    summary?.previous7Days.reduce((sum, day) => sum + day.uniques, 0) ?? 0;

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[#070709] px-4 py-6 text-white sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl space-y-5">
        <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 shadow-2xl backdrop-blur sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-400">
                DS PRODUCTIONS TRAFFIC
              </p>
              <h1 className="mt-2 text-2xl font-semibold sm:text-3xl">
                תנועת האתר ונתוני כניסות
              </h1>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-zinc-300">
                כאן תוכל לראות כמה אנשים נכנסו היום, מגמת תנועה, והשוואה לימים
                קודמים. זה דשבורד מידע בלבד בלי יכולות עריכה.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Link
                href="/"
                className="rounded-full border border-white/15 bg-white/[0.03] px-4 py-2 text-sm transition hover:bg-white/[0.06]"
              >
                פתיחת האתר
              </Link>
              <button
                type="button"
                onClick={handleRefresh}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-4 py-2 text-sm transition hover:bg-white/[0.06] disabled:opacity-60"
                disabled={loadState === "loading"}
              >
                רענון נתונים
                <RefreshCw className="h-4 w-4" />
              </button>
            </div>
          </div>
        </section>

<<<<<<< HEAD
        <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 shadow-2xl backdrop-blur sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="inline-flex items-center gap-2 text-sm font-semibold text-white">
                <Wrench className="h-4 w-4 text-orange-200" />
                מצב שיפוצים (כיבוי זמני של האתר)
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span
                  className={[
                    "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs",
                    maintenanceState?.enabled
                      ? "border-orange-300/30 bg-orange-300/10 text-orange-100"
                      : "border-emerald-300/30 bg-emerald-300/10 text-emerald-100",
                  ].join(" ")}
                >
                  <span
                    className={[
                      "h-2 w-2 rounded-full",
                      maintenanceState?.enabled ? "bg-orange-300" : "bg-emerald-300",
                    ].join(" ")}
                  />
                  {maintenanceState?.enabled ? "האתר בשיפוצים" : "האתר פעיל"}
                </span>
                {maintenanceState?.updatedAt && (
                  <span className="text-xs text-zinc-500">
                    עודכן: {formatDateTime(maintenanceState.updatedAt)}
                  </span>
                )}
              </div>
              <p className="mt-3 text-sm leading-7 text-zinc-300">
                כשמצב שיפוצים פעיל, המבקרים יראו מסך תחזוקה. אפשר להיכנס לאתר
                בכל זאת רק עם סיסמה.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => handleSetMaintenance(true)}
                disabled={
                  isMaintenanceUpdating || loadState === "loading" || maintenanceState?.enabled
                }
                className="inline-flex items-center gap-2 rounded-full border border-orange-300/25 bg-orange-300/10 px-4 py-2 text-sm text-orange-100 transition hover:bg-orange-300/15 disabled:cursor-not-allowed disabled:opacity-50"
              >
                הפעל מצב שיפוצים
                <Wrench className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => handleSetMaintenance(false)}
                disabled={
                  isMaintenanceUpdating || loadState === "loading" || !maintenanceState?.enabled
                }
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-4 py-2 text-sm text-white transition hover:bg-white/[0.06] disabled:cursor-not-allowed disabled:opacity-50"
              >
                החזר אתר לפעילות
                <Check className="h-4 w-4" />
              </button>
            </div>
          </div>

          <p className="mt-4 text-xs text-zinc-500">
            אבטחה: גם בדף ה־admin וגם בעת הדלקה/כיבוי של מצב שיפוצים נדרשת
            סיסמה `12321`.
          </p>
        </section>

=======
>>>>>>> a195d84 (Initial upload or update)
        {notice.type !== "idle" && (
          <section
            className={[
              "rounded-2xl border px-4 py-3 text-sm shadow-2xl backdrop-blur",
              notice.type === "success"
                ? "border-emerald-300/20 bg-emerald-300/10 text-emerald-100"
                : "border-red-300/20 bg-red-300/10 text-red-100",
            ].join(" ")}
          >
            <div className="inline-flex items-center gap-2">
              {notice.type === "success" ? (
                <Check className="h-4 w-4" />
              ) : (
                <AlertTriangle className="h-4 w-4" />
              )}
              {notice.message}
            </div>
          </section>
        )}

        {summary && (
          <>
            <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <MetricCard
                title="כניסות היום"
                value={summary.today.views}
                subtitle={`אתמול: ${summary.yesterday.views}`}
                trend={summary.trends.viewsVsYesterdayPct}
                icon={Activity}
              />
              <MetricCard
                title="מבקרים ייחודיים היום"
                value={summary.today.uniques}
                subtitle={`אתמול: ${summary.yesterday.uniques}`}
                trend={summary.trends.uniquesVsYesterdayPct}
                icon={Users}
              />
              <MetricCard
                title={'סה"כ כניסות (7 ימים)'}
                value={last7Views}
                subtitle={`7 ימים קודמים: ${prev7Views}`}
                trend={summary.trends.views7DayVsPrev7DayPct}
                icon={BarChart3}
              />
              <MetricCard
                title={'סה"כ יוניקים (7 ימים)'}
                value={last7Uniques}
                subtitle={`7 ימים קודמים: ${prev7Uniques}`}
                trend={summary.trends.uniques7DayVsPrev7DayPct}
                icon={Users}
              />
            </section>

            <section className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 shadow-2xl backdrop-blur">
                <div className="mb-5 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-white">
                      תזוזה כללית (7 ימים אחרונים)
                    </p>
                    <p className="mt-1 text-xs text-zinc-500">
                      צפיות ויוניקים לפי יום
                    </p>
                  </div>
                  <div className="text-xs text-zinc-500">
                    עודכן: {formatDateTime(summary.generatedAt)}
                  </div>
                </div>

                <TrafficBars points={summary.last7Days} />
              </div>

              <div className="space-y-5">
                <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 shadow-2xl backdrop-blur">
                  <p className="text-sm font-semibold text-white">סיכום כולל</p>
                  <div className="mt-4 grid gap-3">
                    <StatRow
                      label="סה״כ כניסות שנמדדו"
                      value={summary.totals.views.toLocaleString("he-IL")}
                    />
                    <StatRow
                      label="סה״כ מבקרים ייחודיים"
                      value={summary.totals.uniques.toLocaleString("he-IL")}
                    />
                    <StatRow
                      label="היום"
                      value={`${summary.today.views} צפיות / ${summary.today.uniques} יוניקים`}
                    />
                    <StatRow
                      label="אתמול"
                      value={`${summary.yesterday.views} צפיות / ${summary.yesterday.uniques} יוניקים`}
                    />
                  </div>
                </div>

                <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 shadow-2xl backdrop-blur">
                  <p className="text-sm font-semibold text-white">עמודים מובילים</p>
                  <div className="mt-4 space-y-3">
                    {summary.topPaths.length === 0 && (
                      <p className="text-sm text-zinc-500">אין עדיין נתונים.</p>
                    )}
                    {summary.topPaths.map((item) => (
                      <div
                        key={item.path}
                        className="rounded-2xl border border-white/10 bg-black/25 px-4 py-3"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <code className="truncate text-xs text-zinc-200">
                            {item.path}
                          </code>
                          <span className="text-xs text-zinc-500">
                            {item.views} צפיות
                          </span>
                        </div>
                        <p className="mt-1 text-xs text-zinc-500">
                          {item.uniques} יוניקים
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-3xl border border-orange-200/15 bg-orange-300/5 p-5 shadow-2xl backdrop-blur">
                  <p className="inline-flex items-center gap-2 text-sm font-semibold text-orange-100">
                    <AlertTriangle className="h-4 w-4" />
                    הערה חשובה
                  </p>
                  <p className="mt-2 text-sm leading-7 text-orange-50/90">
                    זה מנגנון analytics בסיסי ששומר נתונים בקובץ מקומי בשרת.
                    בסביבות ללא דיסק קבוע (למשל חלק מה־serverless) הנתונים לא
                    בהכרח יישמרו לאורך זמן.
                  </p>
                </div>
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
}

function MetricCard({
  title,
  value,
  subtitle,
  trend,
  icon: Icon,
}: {
  title: string;
  value: number;
  subtitle: string;
  trend: number | null;
  icon: typeof Activity;
}) {
  const trendTone =
    trend === null ? "text-zinc-400" : trend >= 0 ? "text-emerald-200" : "text-red-200";

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 shadow-2xl backdrop-blur">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-zinc-400">{title}</p>
          <p className="mt-2 text-3xl font-semibold text-white">
            {value.toLocaleString("he-IL")}
          </p>
          <p className="mt-2 text-xs text-zinc-500">{subtitle}</p>
        </div>
        <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
          <Icon className="h-4 w-4 text-orange-200" />
        </div>
      </div>

      <div className={`mt-4 inline-flex items-center gap-2 text-xs ${trendTone}`}>
        {trend === null ? (
          <AlertTriangle className="h-3.5 w-3.5" />
        ) : trend >= 0 ? (
          <TrendingUp className="h-3.5 w-3.5" />
        ) : (
          <TrendingDown className="h-3.5 w-3.5" />
        )}
        {formatTrend(trend)}
      </div>
    </div>
  );
}

function TrafficBars({ points }: { points: DailyTrafficPoint[] }) {
  const maxValue = Math.max(1, ...points.map((point) => Math.max(point.views, point.uniques)));

  return (
    <div className="space-y-3">
      {points.map((point) => (
        <div
          key={point.date}
          className="rounded-2xl border border-white/10 bg-black/25 px-4 py-3"
        >
          <div className="mb-2 flex items-center justify-between gap-2 text-xs">
            <span className="text-zinc-300">{formatDayLabel(point.date)}</span>
            <span className="text-zinc-500">
              {point.views} צפיות | {point.uniques} יוניקים
            </span>
          </div>

          <div className="space-y-2">
            <BarRow
              label="צפיות"
              value={point.views}
              maxValue={maxValue}
              className="from-orange-300 to-orange-500"
            />
            <BarRow
              label="יוניקים"
              value={point.uniques}
              maxValue={maxValue}
              className="from-cyan-300 to-cyan-500"
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function BarRow({
  label,
  value,
  maxValue,
  className,
}: {
  label: string;
  value: number;
  maxValue: number;
  className: string;
}) {
  const width = Math.max(3, (value / maxValue) * 100);

  return (
    <div className="grid grid-cols-[3.2rem_1fr_2.4rem] items-center gap-2 text-[11px]">
      <span className="text-zinc-500">{label}</span>
      <div className="h-2 overflow-hidden rounded-full bg-white/5">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${className}`}
          style={{ width: `${width}%` }}
        />
      </div>
      <span className="text-left text-zinc-400">{value}</span>
    </div>
  );
}

function StatRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-black/25 px-4 py-3">
      <span className="text-sm text-zinc-400">{label}</span>
      <span className="text-sm font-medium text-white">{value}</span>
    </div>
  );
}

function formatTrend(value: number | null) {
  if (value === null) {
    return "אין מספיק נתונים להשוואה";
  }

  if (value === 0) {
    return "ללא שינוי";
  }

  const prefix = value > 0 ? "+" : "";
  return `${prefix}${value}%`;
}

function formatDayLabel(dateString: string) {
  return new Date(`${dateString}T00:00:00.000Z`).toLocaleDateString("he-IL", {
    weekday: "short",
    day: "2-digit",
    month: "2-digit",
  });
}

function formatDateTime(value: string) {
  return new Date(value).toLocaleString("he-IL", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
