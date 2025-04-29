export const getPublicIdFromUrl = (url: string): string => {
  const parts = url.split("/");
  const fileName = parts[parts.length - 1]; // e.g., "xipits6bdscmtn9g2rxj.jpg"
  return fileName ? fileName.split(".")[0] || "" : ""; // e.g., "xipits6bdscmtn9g2rxj"
};