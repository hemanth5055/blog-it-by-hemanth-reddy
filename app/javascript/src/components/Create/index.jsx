import React from "react";

import { Form as NeetoForm } from "@bigbinary/neetoui/formik";
import Logger from "js-logger";
import { useHistory } from "react-router-dom";

import { INTIAL_FORM_VALUES, VALIDATION_SCHEMA } from "./constants";
import { Form } from "./Form";

import postsApi from "../../apis/posts";
import AppHeading from "../commons/AppHeading";

export const Create = () => {
  const history = useHistory();
  const handleFormSubmit = async values => {
    try {
      await postsApi.create(values);
      history.push("/");
    } catch (error) {
      Logger.error(error);
    }
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
          <Form />
        </NeetoForm>
      </div>
    </div>
  );
};
