import { useAuthDetails } from '@/hooks/useAuthDetails';
import {
  useFormSubmission,
  UseFormSubmissionReturn,
} from '@/hooks/useFormSubmission';
import { Market } from '@repo/types';
import { generateSlug } from '@repo/utils';

type UseMarketFormProps = {
  updateData?: Partial<Market>;
  onSuccess?: () => void;
  redirectPath?: string;
};

type MarketFormData = Omit<Market, 'id'>;

export const useMarketForm = ({
  updateData = {},
  onSuccess,
  redirectPath = '/dashboard/markets',
}: UseMarketFormProps): UseFormSubmissionReturn<MarketFormData, Market> => {
  const marketId = updateData?.id ?? '';

  const { userId } = useAuthDetails();

  return useFormSubmission<MarketFormData, Market>({
    defaultValues: {
      title: updateData.title || '',
      email: updateData.email || '',
      phone: updateData.phone || '',
      website: updateData.website || '',
      address: updateData.address || '',
      description: updateData.description || '',
      categoryIds: updateData.categoryIds || [],
      isActive: updateData.isActive ?? true,
      coverImageUrl: updateData.coverImageUrl ?? '',
      logoUrl: updateData.logoUrl ?? '',
      slug: updateData.slug || '',
      ownerId: updateData.ownerId || userId,
    },
    endpoint: marketId ? `/markets/${marketId}` : '/markets',
    method: marketId ? 'PATCH' : 'POST',
    redirectPath,
    transformData: (data) => ({
      ...data,
      slug: generateSlug(data.title),
    }),

    validate: (data) => {
      if (!data.title) {
        return 'Title is required';
      }
      if (!data.email) {
        return 'Email is required';
      }
      if (!data.phone) {
        return 'Phone number is required';
      }
      if (!data.categoryIds || data.categoryIds.length === 0) {
        return 'At least one category is required';
      }
      return null;
    },
    resourceName: 'Market',
    onSuccess,
  });
};
