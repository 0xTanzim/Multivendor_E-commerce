import {
  useFormSubmission,
  UseFormSubmissionReturn,
} from '@/hooks/useFormSubmission';
import { Banner } from '@repo/types';

type UseBannerFormProps = {
  updateData?: Partial<Banner>;
  onSuccess?: () => void;
  redirectPath?: string;
};

type BannerFormData = Omit<Banner, 'id'>;

export const useBannerForm = ({
  updateData = {},
  onSuccess,
  redirectPath = '/dashboard/banners',
}: UseBannerFormProps): UseFormSubmissionReturn<BannerFormData, Banner> => {
  const bannerId = updateData?.id ?? '';

  return useFormSubmission<BannerFormData, Banner>({
    defaultValues: {
      title: updateData.title || '',
      link: updateData.link || '',
      imageUrl: updateData.imageUrl || '',
      isActive: updateData.isActive ?? true,
    },
    endpoint: bannerId ? `/banners/${bannerId}` : '/banners',
    method: bannerId ? 'PATCH' : 'POST',
    redirectPath,

    validate: (data) => {
      if (!data.title) {
        return 'Title is required';
      }
      if (!data.link) {
        return 'Link is required';
      }
      if (!data.imageUrl) {
        return 'Banner image is required';
      }
      return null;
    },
    resourceName: 'Banner',
    onSuccess,
  });
};
