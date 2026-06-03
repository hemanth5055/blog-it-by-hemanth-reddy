import React from "react";

import { Form as NeetoForm } from "neetoui/formik";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

import { INTIAL_FORM_VALUES, VALIDATION_SCHEMA } from "./constants";
import { Form } from "./Form";

import { QUERY_KEYS } from "../../constants/query";
import { useFetchCategories } from "../../hooks/reactQuery/useCategoriesApi";
import { useCreatePost } from "../../hooks/reactQuery/usePostsApi";
import queryClient from "../../utils/queryClient";
import AppHeading from "../commons/AppHeading";

export const Create = () => {
  const history = useHistory();

  const { mutate: createPost, isLoading } = useCreatePost();
  const { data: { data: { categories = [] } = {} } = {} } =
    useFetchCategories();

  const { t } = useTranslation();

  const handleFormSubmit = async values => {
    let { categories } = values;
    categories = categories.map(category => category.value);
    createPost(
      { ...values, category_ids: categories, organization_id: 2, user_id: 2 },
      {
        onSuccess: () => {
          history.push("/");
          queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.POSTS] });
        },
      }
    );
  };

  return (
    <div className="flex h-full w-full flex-col ">
      <div className="flex w-full items-center justify-between pb-4">
        <AppHeading title={t("titles.newBlogPost")} />
      </div>
      <div className="h-full w-full">
        <NeetoForm
          className="h-full w-full"
          formProps={{ noValidate: true }}
          formikProps={{
            initialValues: INTIAL_FORM_VALUES,
            validationSchema: VALIDATION_SCHEMA,
            onSubmit: handleFormSubmit,
          }}
        >
          <Form categories={categories} isLoading={isLoading} />
        </NeetoForm>
      </div>
    </div>
  );
};
