import { t } from "i18next";
import * as Yup from "yup";

const MAX_TITLE_LENGTH = 125;
const MAX_DESC_LENGTH = 10_000;

export const INTIAL_FORM_VALUES = {
  title: "",
  description: "",
  categories: [],
};

export const VALIDATION_SCHEMA = Yup.object({
  title: Yup.string()
    .required(t("messages.titleRequired"))
    .max(
      MAX_TITLE_LENGTH,
      t("messages.titleExceedCharacters", { MAX_TITLE_LENGTH })
    ),

  description: Yup.string()
    .required(t("messages.descriptionRequired"))
    .max(
      MAX_DESC_LENGTH,
      t("messages.descriptionExceedCharacters", { MAX_DESC_LENGTH })
    ),

  categories: Yup.array()
    .min(1, t("messages.atLeastOneCategory"))
    .required(t("messages.categoryRequired")),
});
