"use client";

import FormHeader from "@/components/backOffice/FormHeader";
import ImageInput from "@/components/FormInputs/ImageInput";
import SubmitButton from "@/components/FormInputs/SubmitButton";
import TextareaInput from "@/components/FormInputs/TextareaInput";
import TextInput from "@/components/FormInputs/TextInput";
import { FileRoutes } from "@/config";
import { makePostRequest } from "@/lib/apiRequest";
import { category } from "@/types";
import { generateSlug } from "@/utils/generateSlug";
import { useState } from "react";
import { useForm } from "react-hook-form";

const NewCategoryPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<category>({});
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: category) => {
    setLoading(true);
    const slug = generateSlug(data?.title);
    data.slug = slug;
    data.imageUrl = imageUrl ?? undefined;

    makePostRequest({
      setLoading,
      endpoint: "api/categories",
      data,
      resourceName: "Category",
      reset,
    });
  };

  return (
    <div>
      <FormHeader title="New Category" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-4xl p-4 bg-white border border-slate-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-slate-700 dark:border-slate-700 mx-auto my-3 "
      >
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          <TextInput
            label="Category Title"
            name="title"
            register={register}
            errors={errors}
          />

          <TextareaInput
            label="Category Description"
            name="description"
            register={register}
            errors={errors}
          />

          <ImageInput
            label="Category Image"
            setImageUrl={setImageUrl}
            imageUrl={imageUrl}
            endpoint={FileRoutes.categoryImageUploader}
          />
        </div>

        <SubmitButton
          isLoading={loading}
          buttonTitle="Create Category"
          loadingButtonTitle="Creating Category please wait..."
        />
      </form>
    </div>
  );
};

export default NewCategoryPage;

