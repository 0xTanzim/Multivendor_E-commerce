'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import {
  DefaultValues,
  FieldValues,
  SubmitHandler,
  useForm,
  UseFormReturn,
} from 'react-hook-form';
import toast from 'react-hot-toast';
import { useRequestService } from './useRequestService';

type HttpMethod = 'POST' | 'PATCH';

interface FieldError {
  field: string;
  error: string;
}

export interface UseFormSubmissionParams<T extends FieldValues, U> {
  defaultValues: DefaultValues<T>;
  endpoint: string;
  method: HttpMethod;
  redirectPath?: string;
  transformData?: (data: T) => unknown;
  onSuccess?: (response: U) => void;
  validate?: (data: T) => string | null;
  resourceName?: string;
}

export interface UseFormSubmissionReturn<T extends FieldValues, U> {
  formMethods: UseFormReturn<T>;
  loading: boolean;
  error: string | null;
  fieldErrors: FieldError[];
  handleSubmit: SubmitHandler<T>;
  responseData: U | null;
  setFieldValue: UseFormReturn<T>['setValue'];
}

export function useFormSubmission<T extends FieldValues, U>({
  defaultValues,
  endpoint,
  method,
  redirectPath,
  transformData,
  onSuccess,
  validate,
  resourceName = '',
}: UseFormSubmissionParams<T, U>): UseFormSubmissionReturn<T, U> {
  const router = useRouter();
  const { request, loading, error, fieldErrors } = useRequestService<U>();
  const [responseData, setResponseData] = useState<U | null>(null);

  const formMethods = useForm<T>({ defaultValues });

  const handleSubmit: SubmitHandler<T> = async (data) => {
    try {
      if (validate) {
        const validationError = validate(data);
        if (validationError) {
          toast.error(validationError);
          return;
        }
      }

      const payload = transformData ? transformData(data) : data;
      const controller = new AbortController();
      const {
        response,
        error: requestError,
        fieldErrors: requestFieldErrors,
      } = await request({
        endpoint,
        method,
        data: payload,
        signal: controller.signal,
      });

      if (requestError) {
        if (requestFieldErrors.length > 0) {
          toast.error('Please fix the errors in the form');
        } else {
          toast.error(requestError);
        }
        return;
      }

      toast.success(
        `Form ${resourceName ? `${resourceName} ` : ''}${
          method === 'POST' ? 'submitted' : 'updated'
        } successfully`
      );

      if (response) {
        setResponseData(response);
        onSuccess?.(response);
      }

      formMethods.reset(defaultValues);

      if (redirectPath) {
        router.push(redirectPath);
      }
    } catch (err) {
      toast.error('An error occurred while submitting the form');
    }
  };

  return {
    formMethods,
    loading,
    error,
    fieldErrors,
    handleSubmit,
    responseData,
    setFieldValue: formMethods.setValue,
  };
}
