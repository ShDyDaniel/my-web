import "server-only";

import { readdirSync } from "node:fs";
import path from "node:path";

import { DEFAULT_SITE_CONTENT, type WorkItem } from "@/lib/site-content";

const IMAGE_SYSTEM_PUBLIC_ROOT = "/assets/image-system";
const IMAGE_SYSTEM_FS_ROOT = path.join(process.cwd(), "public", "assets", "image-system");
const CATEGORY_ONE_PUBLIC_ROOT = "/assets/category-1";
const CATEGORY_ONE_FS_ROOT = path.join(process.cwd(), "public", "assets", "category-1");
const ALLOWED_IMAGE_EXTENSIONS = new Set([
  ".jpg",
  ".jpeg",
  ".jfif",
  ".png",
  ".webp",
  ".avif",
  ".gif",
  ".svg",
  ".bmp",
  ".ico",
  ".tif",
  ".tiff",
  ".heic",
  ".heif",
]);

function isImageFile(filename: string) {
  return ALLOWED_IMAGE_EXTENSIONS.has(path.extname(filename).toLowerCase());
}

function listImageFilesInFolder(folderFsPath: string) {
  try {
    return readdirSync(folderFsPath, { withFileTypes: true })
      .filter((entry) => entry.isFile() && isImageFile(entry.name))
      .map((entry) => entry.name)
      .sort(compareCategoryImageNames);
  } catch {
    return [];
  }
}

function compareCategoryImageNames(a: string, b: string) {
  const aBase = path.parse(a).name;
  const bBase = path.parse(b).name;
  const aNum = Number(aBase);
  const bNum = Number(bBase);
  const aIsNum = Number.isFinite(aNum);
  const bIsNum = Number.isFinite(bNum);

  if (aIsNum && bIsNum) {
    return aNum - bNum;
  }

  if (aIsNum) {
    return -1;
  }

  if (bIsNum) {
    return 1;
  }

  return a.localeCompare(b, "he");
}

export function getCategoryWorkItems(categoryName: string): WorkItem[] {
  const categoryFsPath = path.join(IMAGE_SYSTEM_FS_ROOT, categoryName);
  const publicPath = `${IMAGE_SYSTEM_PUBLIC_ROOT}/${categoryName}`;

  return getWorkItemsFromFolder(categoryFsPath, publicPath);
}

export function getImageSystemRootWorkItems(): WorkItem[] {
  return getWorkItemsFromFolder(IMAGE_SYSTEM_FS_ROOT, IMAGE_SYSTEM_PUBLIC_ROOT);
}

export function getCategoryOneHeroImages() {
  const files = listImageFilesInFolder(CATEGORY_ONE_FS_ROOT);
  const byBaseName = new Map(files.map((filename) => [path.parse(filename).name, filename]));
  const toUrl = (baseName: string) => {
    const filename = byBaseName.get(baseName);
    return filename
      ? `${CATEGORY_ONE_PUBLIC_ROOT}/${encodeURIComponent(filename)}`
      : undefined;
  };

  return {
    center: toUrl("1"),
    right: toUrl("2"),
    left: toUrl("3"),
  };
}

function getWorkItemsFromFolder(folderFsPath: string, publicPath: string): WorkItem[] {
  try {
    const files = listImageFilesInFolder(folderFsPath);

    if (files.length === 0) {
      return [];
    }

    const templates = DEFAULT_SITE_CONTENT.work.items;

    return files.map((filename, index) => {
      const template = templates[index] ?? templates[templates.length - 1];

      return {
        ...template,
        image: `${publicPath}/${encodeURIComponent(filename)}`,
      };
    });
  } catch {
    return [];
  }
}

export function getCategoryOneWorkItems() {
  return getWorkItemsFromFolder(CATEGORY_ONE_FS_ROOT, CATEGORY_ONE_PUBLIC_ROOT).filter(
    (item) => {
      const filename = item.image.split("/").pop() ?? "";
      const decoded = decodeURIComponent(filename);
      return ["1", "2", "3"].includes(path.parse(decoded).name);
    },
  );
}
