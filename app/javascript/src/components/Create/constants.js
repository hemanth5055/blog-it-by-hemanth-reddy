import * as Yup from "yup";

export const VALIDATION_SCHEMA = Yup.object({
  title: Yup.string(),
  description: Yup.string(),
});
