import React from "react";

import { Typography, Button } from "neetoui";
import { Input } from "neetoui/formik";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import routes from "../../../routes";

const SignupForm = () => {
  const { t } = useTranslation();

  return (
    <div className="flex h-fit w-[40%] flex-col gap-7 rounded-xl border-2 border-[#262626]  p-10">
      <div className="flex flex-col gap-5">
        <Input
          required
          id="name"
          label={t("labels.name")}
          name="name"
          size="large"
        />
        <Input
          required
          id="email"
          label={t("labels.email")}
          name="email"
          size="large"
        />
        <Input
          required
          id="password"
          label={t("labels.password")}
          name="password"
          size="large"
          type="password"
        />
        <Input
          required
          id="confirmPassword"
          label={t("labels.confirmPassword")}
          name="confirmPassword"
          size="large"
          type="password"
        />
      </div>
      <div className="flex w-full items-center justify-center gap-2">
        <Button label={t("labels.create")} style="primary" type="submit" />
        <Button label={t("labels.reset")} style="secondary" type="reset" />
      </div>
      <div className="flex w-full items-center justify-center gap-2">
        <Typography weight="medium">
          {t("messages.alreadyHaveAnAccount")}
          <Link
            className="neeto-ui-text-primary-500 font-semibold underline"
            to={routes.login}
          >
            {t("messages.login")}
          </Link>
        </Typography>
      </div>
    </div>
  );
};

export default SignupForm;
