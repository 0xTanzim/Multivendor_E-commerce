export type CreateTraining = {
  title: string;
  categoryId?: string;
  slug: string;
  description: string;
  image?: string;
  content: string;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};

export type Training = {
  id?: string;
  title: string;
  categoryId?: string;
  slug: string;
  description: string;
  image?: string;
  content: string;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};

export function isTrainingArray(obj: unknown): obj is Training[] {
  return Array.isArray(obj) && obj.every(isTraining);
}

export function isTraining(obj: unknown): obj is Training {
  if (typeof obj !== 'object' || obj === null) return false;
  const trainingObj = obj as Training;
  return (
    'title' in trainingObj &&
    typeof trainingObj.title === 'string' &&
    'description' in trainingObj &&
    typeof trainingObj.description === 'string' &&
    'slug' in trainingObj &&
    'content' in trainingObj &&
    typeof trainingObj.content === 'string' &&
    'isActive' in trainingObj &&
    typeof trainingObj.isActive === 'boolean'
  );
}
