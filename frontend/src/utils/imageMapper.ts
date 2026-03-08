const imageMap: Record<string, string> = {
  'Big Island': '/assets/generated/island-big-island.dim_600x400.png',
  'Maui': '/assets/generated/island-maui.dim_600x400.png',
  'Oahu': '/assets/generated/island-oahu.dim_600x400.png',
  'Kauai': '/assets/generated/island-kauai.dim_600x400.png',
  'Molokai': '/assets/generated/island-molokai.dim_600x400.png',
  'Lanai': '/assets/generated/island-lanai.dim_600x400.png',
};

export function getIslandImage(islandName: string): string {
  return imageMap[islandName] ?? '/assets/generated/hawaii-hero.dim_1440x600.png';
}

export function getIslandSlug(islandName: string): string {
  return encodeURIComponent(islandName);
}
