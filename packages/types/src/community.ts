export type CreateTraining = {
  title: string;
  expertId: string;
  categoryId: string;
  slug?: string;
  description: string;
  image?: string;
  content?: string;
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};

export type Training = {
  id?: string;
  title: string;
  expertId: string;
  categoryId: string;
  slug?: string;
  description: string;
  image?: string;
  content?: string;
  isActive?: boolean;
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
    'categoryId' in trainingObj &&
    typeof trainingObj.categoryId === 'number' &&
    'description' in trainingObj &&
    typeof trainingObj.description === 'string' &&
    (trainingObj.slug === undefined ||
      typeof trainingObj.slug === 'string') &&
    (trainingObj.image === undefined ||
      typeof trainingObj.image === 'string') &&
    (trainingObj.content === undefined ||
      typeof trainingObj.content === 'string') &&
    (trainingObj.isActive === undefined ||
      typeof trainingObj.isActive === 'boolean')
  );
}

