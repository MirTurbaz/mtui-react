export const capitalize = (str: string | null): string | null =>
  str?.toLowerCase().replace(/^./, (c) => c.toUpperCase()) ?? null;
