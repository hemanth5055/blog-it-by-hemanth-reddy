import React from "react";

import { Form as NeetoForm } from "@bigbinary/neetoui/formik";
import { useHistory } from "react-router-dom";

import { INTIAL_FORM_VALUES, VALIDATION_SCHEMA } from "./constants";
import { Form } from "./Form";

import { useCreatePost } from "../../hooks/reactQuery/usePostsApi";
import AppHeading from "../commons/AppHeading";

export const Create = () => {
  const history = useHistory();
  const { mutate: createPost, isLoading } = useCreatePost();

  const handleFormSubmit = async values => {
    createPost(values, {
      onSuccess: () => {
        history.push("/");
      },
    });
  };

  return (
    <div className="flex h-full w-full flex-col ">
      <div className="flex w-full items-center justify-between pb-4">
        <AppHeading title="New blog post" />
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
          <Form isLoading={isLoading} />
        </NeetoForm>
      </div>
    </div>
  );
};
