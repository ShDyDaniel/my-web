import { appendFile, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

export type TrafficEvent = {
  ts: number;
  date: string; // YYYY-MM-DD (UTC)
  path: string;
  clientId: string;
  userAgent?: string;
  ipHashHint?: string;
};

type TrafficStore = {
  version: 1;
  events: TrafficEvent[];
};

export type DailyTrafficPoint = {
  date: string;
  views: number;
  uniques: number;
};

export type TrafficSummary = {
  generatedAt: string;
  today: DailyTrafficPoint;
  yesterday: DailyTrafficPoint;
  last7Days: DailyTrafficPoint[];
  previous7Days: DailyTrafficPoint[];
  totals: {
    views: number;
    uniques: number;
  };
  trends: {
    viewsVsYesterdayPct: number | null;
    uniquesVsYesterdayPct: number | null;
    views7DayVsPrev7DayPct: number | null;
    uniques7DayVsPrev7DayPct: number | null;
  };
  topPaths: Array<{
    path: string;
    views: number;
    uniques: number;
  }>;
};

const TRAFFIC_DIR = path.join(process.cwd(), "data");
const TRAFFIC_FILE = path.join(TRAFFIC_DIR, "traffic-analytics.json");
const TRAFFIC_EVENTS_FILE = path.join(TRAFFIC_DIR, "traffic-events.ndjson");

function emptyStore(): TrafficStore {
  return {
    version: 1,
    events: [],
  };
}

async function readStore(): Promise<TrafficStore> {
  try {
    const raw = await readFile(TRAFFIC_FILE, "utf8");
    const parsed = JSON.parse(raw) as Partial<TrafficStore>;

    if (!parsed || !Array.isArray(parsed.events)) {
      return emptyStore();
    }

    return {
      version: 1,
      events: parsed.events
        .filter((event): event is TrafficEvent => {
          return (
            !!event &&
            typeof event.ts === "number" &&
            typeof event.date === "string" &&
            typeof event.path === "string" &&
            typeof event.clientId === "string"
          );
        }),
    };
  } catch {
    return emptyStore();
  }
}

async function writeStore(store: TrafficStore) {
  await mkdir(TRAFFIC_DIR, { recursive: true });
  await writeFile(TRAFFIC_FILE, JSON.stringify(store, null, 2), "utf8");
}

async function appendEventLog(event: TrafficEvent) {
  await mkdir(TRAFFIC_DIR, { recursive: true });
  await appendFile(TRAFFIC_EVENTS_FILE, `${JSON.stringify(event)}\n`, "utf8");
}

function utcDateString(date: Date) {
  return date.toISOString().slice(0, 10);
}

function addDays(dateString: string, offsetDays: number) {
  const date = new Date(`${dateString}T00:00:00.000Z`);
  date.setUTCDate(date.getUTCDate() + offsetDays);
  return utcDateString(date);
}

function pctChange(current: number, previous: number): number | null {
  if (previous === 0) {
    return current === 0 ? 0 : null;
  }

  return Number((((current - previous) / previous) * 100).toFixed(1));
}

function pointForDate(date: string, events: TrafficEvent[]): DailyTrafficPoint {
  const dayEvents = events.filter((event) => event.date === date);
  const uniques = new Set(dayEvents.map((event) => event.clientId)).size;

  return {
    date,
    views: dayEvents.length,
    uniques,
  };
}

function buildRange(endDate: string, days: number, events: TrafficEvent[]) {
  const points: DailyTrafficPoint[] = [];

  for (let i = days - 1; i >= 0; i -= 1) {
    points.push(pointForDate(addDays(endDate, -i), events));
  }

  return points;
}

export async function trackTrafficEvent(
  event: Omit<TrafficEvent, "ts" | "date"> & { ts?: number },
) {
  const store = await readStore();
  const ts = event.ts ?? Date.now();
  const date = utcDateString(new Date(ts));

  const recordedEvent: TrafficEvent = {
    ...event,
    ts,
    date,
    path: event.path || "/",
  };

  store.events.push(recordedEvent);

  await writeStore(store);
  await appendEventLog(recordedEvent);
}

export async function getTrafficSummary(now = new Date()): Promise<TrafficSummary> {
  const store = await readStore();
  const events = store.events.slice().sort((a, b) => a.ts - b.ts);
  const todayDate = utcDateString(now);
  const yesterdayDate = addDays(todayDate, -1);

  const today = pointForDate(todayDate, events);
  const yesterday = pointForDate(yesterdayDate, events);
  const last7Days = buildRange(todayDate, 7, events);
  const previous7Days = buildRange(addDays(todayDate, -7), 7, events);

  const totalUniques = new Set(events.map((event) => event.clientId)).size;

  const pathBuckets = new Map<
    string,
    { views: number; uniqueClientIds: Set<string> }
  >();

  for (const event of events) {
    const bucket = pathBuckets.get(event.path) ?? {
      views: 0,
      uniqueClientIds: new Set<string>(),
    };

    bucket.views += 1;
    bucket.uniqueClientIds.add(event.clientId);
    pathBuckets.set(event.path, bucket);
  }

  const topPaths = Array.from(pathBuckets.entries())
    .map(([eventPath, bucket]) => ({
      path: eventPath,
      views: bucket.views,
      uniques: bucket.uniqueClientIds.size,
    }))
    .sort((a, b) => b.views - a.views)
    .slice(0, 5);

  const last7Views = last7Days.reduce((sum, day) => sum + day.views, 0);
  const prev7Views = previous7Days.reduce((sum, day) => sum + day.views, 0);
  const last7Uniques = last7Days.reduce((sum, day) => sum + day.uniques, 0);
  const prev7Uniques = previous7Days.reduce((sum, day) => sum + day.uniques, 0);

  return {
    generatedAt: new Date().toISOString(),
    today,
    yesterday,
    last7Days,
    previous7Days,
    totals: {
      views: events.length,
      uniques: totalUniques,
    },
    trends: {
      viewsVsYesterdayPct: pctChange(today.views, yesterday.views),
      uniquesVsYesterdayPct: pctChange(today.uniques, yesterday.uniques),
      views7DayVsPrev7DayPct: pctChange(last7Views, prev7Views),
      uniques7DayVsPrev7DayPct: pctChange(last7Uniques, prev7Uniques),
    },
    topPaths,
  };
}
