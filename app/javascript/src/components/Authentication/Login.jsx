import React from "react";

import { setAuthHeaders } from "apis/axios";
import { useCreateSession } from "hooks/reactQuery/useSessionApi";
import { Form as NeetoForm } from "neetoformik";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import routes from "src/routes";
import { setToLocalStorage } from "utils/storage";

import {
  INITIAL_LOGIN_FORM_VALUES,
  LOGIN_FORM_VALIDATION_SCHEMA,
} from "./constants";
import LoginForm from "./Form/Login";

import { AppHeading } from "../commons";

const Login = () => {
  const { mutate: loginUser } = useCreateSession();

  const history = useHistory();

  const { t } = useTranslation();

  const handleFormSubmit = values => {
    loginUser(values, {
      onSuccess: result => {
        setToLocalStorage(result);
        setAuthHeaders();
        history.push(routes.root);
      },
    });
  };

  return (
    <div className="flex h-full w-full flex-col  p-10">
      <AppHeading title={t("titles.login")} />
      <div className="flex h-full w-full items-center justify-center">
        <NeetoForm
          className="flex h-full w-full items-center justify-center p-10"
          formProps={{ noValidate: true }}
          formikProps={{
            initialValues: INITIAL_LOGIN_FORM_VALUES,
            validationSchema: LOGIN_FORM_VALIDATION_SCHEMA,
            onSubmit: handleFormSubmit,
          }}
        >
          <LoginForm />
        </NeetoForm>
      </div>
    </div>
  );
};

export default Login;
