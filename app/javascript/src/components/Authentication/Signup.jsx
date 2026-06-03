import React from "react";

import { notEquals } from "neetocist";
import { Form as NeetoForm } from "neetoui/formik";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

import {
  INITIAL_SIGNUP_FORM_VALUES,
  SIGNUP_FORM_VALIDATION_SCHEMA,
} from "./constants";
import SignupForm from "./Form/Signup";

import { useCreateUser } from "../../hooks/reactQuery/useUsersApi";
import routes from "../../routes";
import AppHeading from "../commons/AppHeading";
import Toastr from "../commons/Toastr";

const Signup = () => {
  const { mutate: createUser } = useCreateUser();
  const { t } = useTranslation();

  const history = useHistory();

  const handleFormSubmit = values => {
    const {
      name,
      email,
      password,
      confirmPassword: password_confirmation,
    } = values;

    if (notEquals(password, password_confirmation)) {
      Toastr.error(t("messages.passwordsNotMatch"));

      return;
    }

    const payload = {
      name,
      email,
      password,
      password_confirmation,
      organization_id: 2,
    };

    createUser(payload, {
      onSuccess: () => history.push(routes.login),
    });
  };

  return (
    <div className="flex h-full w-full flex-col p-10">
      <AppHeading title="Signup" />
      <div className="flex h-full w-full items-center justify-center">
        <NeetoForm
          className="flex h-full w-full items-center justify-center p-10"
          formProps={{ noValidate: true }}
          formikProps={{
            initialValues: INITIAL_SIGNUP_FORM_VALUES,
            validationSchema: SIGNUP_FORM_VALIDATION_SCHEMA,
            onSubmit: handleFormSubmit,
          }}
        >
          <SignupForm />
        </NeetoForm>
      </div>
    </div>
  );
};

export default Signup;
