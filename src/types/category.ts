export type category = {
  id?: string;
  title: string;
  slug?: string;
  description: string;
  imageUrl?: string;
  marketIds?: string;
  status?: "active" | "inactive";
};

export function isCategoryArray(obj: unknown): obj is category[] {
  return Array.isArray(obj) && obj.every(isCategory);
}

export function isCategory(obj: unknown): obj is category {
  if (typeof obj !== "object" || obj === null) return false;
  const categoryObj = obj as category;
  
  return (
    typeof categoryObj.title === "string" &&
    typeof categoryObj.description === "string" &&
    (categoryObj.imageUrl === undefined || typeof categoryObj.imageUrl === "string")
  );
}

