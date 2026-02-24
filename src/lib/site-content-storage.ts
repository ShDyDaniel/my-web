import { DEFAULT_SITE_CONTENT, type SiteContent } from "@/lib/site-content";

export const SITE_CONTENT_STORAGE_KEY = "ds-productions:site-content";

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function mergeWithDefaults<T>(defaults: T, override: unknown): T {
  if (Array.isArray(defaults)) {
    if (!Array.isArray(override)) {
      return defaults;
    }

    if (defaults.length === 0) {
      return override as T;
    }

    const template = defaults[0];
    return override.map((item, index) =>
      mergeWithDefaults((defaults as unknown[])[index] ?? template, item),
    ) as T;
  }

  if (typeof defaults === "string") {
    return (typeof override === "string" ? override : defaults) as T;
  }

  if (typeof defaults === "number") {
    return (typeof override === "number" ? override : defaults) as T;
  }

  if (typeof defaults === "boolean") {
    return (typeof override === "boolean" ? override : defaults) as T;
  }

  if (isPlainObject(defaults)) {
    if (!isPlainObject(override)) {
      return defaults;
    }

    const result: Record<string, unknown> = {};

    for (const key of Object.keys(defaults)) {
      result[key] = mergeWithDefaults(
        (defaults as Record<string, unknown>)[key],
        override[key],
      );
    }

    return result as T;
  }

  return defaults;
}

export function resolveSiteContent(input: unknown): SiteContent {
  return mergeWithDefaults(DEFAULT_SITE_CONTENT, input);
}

export function loadSiteContent(): SiteContent {
  if (typeof window === "undefined") {
    return DEFAULT_SITE_CONTENT;
  }

  const raw = window.localStorage.getItem(SITE_CONTENT_STORAGE_KEY);

  if (!raw) {
    return DEFAULT_SITE_CONTENT;
  }

  try {
    return resolveSiteContent(JSON.parse(raw));
  } catch {
    return DEFAULT_SITE_CONTENT;
  }
}

export function saveSiteContent(content: unknown): SiteContent {
  const resolved = resolveSiteContent(content);

  if (typeof window !== "undefined") {
    window.localStorage.setItem(
      SITE_CONTENT_STORAGE_KEY,
      JSON.stringify(resolved),
    );
  }

  return resolved;
}

export function clearSiteContent() {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem(SITE_CONTENT_STORAGE_KEY);
  }
}

export function serializeSiteContent(content: unknown): string {
  return JSON.stringify(resolveSiteContent(content), null, 2);
}

export function parseSiteContentJson(json: string): SiteContent {
  return resolveSiteContent(JSON.parse(json));
}
