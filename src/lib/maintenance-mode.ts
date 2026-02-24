import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

export type MaintenanceModeState = {
  enabled: boolean;
  updatedAt: string;
};

const DATA_DIR = path.join(process.cwd(), "data");
const MAINTENANCE_FILE = path.join(DATA_DIR, "maintenance-mode.json");

function defaultState(): MaintenanceModeState {
  return {
    enabled: false,
    updatedAt: "",
  };
}

export async function getMaintenanceModeState(): Promise<MaintenanceModeState> {
  try {
    const raw = await readFile(MAINTENANCE_FILE, "utf8");
    const parsed = JSON.parse(raw) as Partial<MaintenanceModeState>;

    return {
      enabled: Boolean(parsed.enabled),
      updatedAt:
        typeof parsed.updatedAt === "string"
          ? parsed.updatedAt
          : defaultState().updatedAt,
    };
  } catch {
    return defaultState();
  }
}

export async function setMaintenanceModeState(
  enabled: boolean,
): Promise<MaintenanceModeState> {
  const nextState: MaintenanceModeState = {
    enabled,
    updatedAt: new Date().toISOString(),
  };

  await mkdir(DATA_DIR, { recursive: true });
  await writeFile(MAINTENANCE_FILE, JSON.stringify(nextState, null, 2), "utf8");

  return nextState;
}
