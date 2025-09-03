export function generateHeadingId(text: string, index?: number): string {
  return (
    text
      .toLowerCase()
      .replace(/[^\w\s-]/g, "") // Remove special characters
      .replace(/\s+/g, "-") // Replace spaces with hyphens
      .trim() || `heading-${index || 0}`
  );
}