import { t } from "i18next";
import * as Yup from "yup";

const MAX_NAME_LENGTH = 35;
const MAX_EMAIL_LENGTH = 255;
const MIN_PASSWORD_LENGTH = 8;

export const INITIAL_SIGNUP_FORM_VALUES = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};
export const INITIAL_LOGIN_FORM_VALUES = {
  email: "",
  password: "",
};

export const SIGNUP_FORM_VALIDATION_SCHEMA = Yup.object({
  name: Yup.string()
    .required(t("messages.nameRequired"))
    .max(
      MAX_NAME_LENGTH,
      t("messages.nameExceedCharacters", { MAX_NAME_LENGTH })
    ),

  email: Yup.string()
    .email(t("messages.enterValidEmail"))
    .required(t("messages.emailRequired"))
    .max(
      MAX_NAME_LENGTH,
      t("messages.emailExceedCharacters", { MAX_EMAIL_LENGTH })
    ),

  password: Yup.string()
    .required(t("messages.passwordRequired"))
    .min(
      MIN_PASSWORD_LENGTH,
      t("messages.passwordMinCharactersNotMet", { MIN_PASSWORD_LENGTH })
    ),

  confirmPassword: Yup.string()
    .required(t("messages.confirmPasswordRequired"))
    .min(
      MIN_PASSWORD_LENGTH,
      t("messages.passwordMinCharactersNotMet", { MIN_PASSWORD_LENGTH })
    ),
});

export const LOGIN_FORM_VALIDATION_SCHEMA = Yup.object({
  email: Yup.string()
    .email(t("messages.enterValidEmail"))
    .required(t("messages.emailRequired"))
    .max(
      MAX_NAME_LENGTH,
      t("messages.emailExceedCharacters", { MAX_EMAIL_LENGTH })
    ),

  password: Yup.string()
    .required(t("messages.passwordRequired"))
    .min(
      MIN_PASSWORD_LENGTH,
      t("messages.passwordMinCharactersNotMet", { MIN_PASSWORD_LENGTH })
    ),
});

export const DEFAULT_ORGANIZATION_ID = 2;
