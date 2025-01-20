export type category = {
  id?: string;
  title: string;
  slug?: string;
  description: string;
  imageUrl?: string;
};

export function isCategoryArray(obj: unknown): obj is category[] {
  return (obj as category[]).every((item) => isCategory(item));
}

export function isCategory(obj: unknown): obj is category {
  return (
    typeof obj === "object" &&
    obj !== null &&
    typeof (obj as category).title === "string" &&
    typeof (obj as category).description === "string" &&
    (obj as category).imageUrl === undefined ||
    typeof (obj as category).imageUrl === "string"
  )
}

