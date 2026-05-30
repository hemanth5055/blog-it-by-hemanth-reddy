import React from "react";

import { Form as NeetoForm } from "@bigbinary/neetoui/formik";

import { VALIDATION_SCHEMA } from "./constants";
import { Form } from "./Form";

import AppHeading from "../commons/AppHeading";

export const Create = () => (
  <div className="flex h-full w-full flex-col ">
    <div className="flex w-full items-center justify-between pb-4">
      <AppHeading title="New blog post" />
    </div>
    <div className="h-full w-full">
      <NeetoForm
        className="h-full w-full"
        formProps={{ noValidate: true }}
        formikProps={{
          initialValues: { title: "", description: "" },
          validationSchema: VALIDATION_SCHEMA,
        }}
      >
        <Form />
      </NeetoForm>
    </div>
  </div>
);
