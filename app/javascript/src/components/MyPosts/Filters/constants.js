import { t } from "i18next";
import * as Yup from "yup";

import { STATUS_OPTIONS } from "./Form/constants";

export const ROW_FILTER_FORM_VALIDATION_SCHEMA = Yup.object({
  title: Yup.string(),

  categories: Yup.array(),

  status: Yup.object({
    label: Yup.string(),
    value: Yup.string().oneOf(
      STATUS_OPTIONS.map(option => option.value),
      t("messages.statusMustBeBothOrDraftOrPublished")
    ),
  }),
});
