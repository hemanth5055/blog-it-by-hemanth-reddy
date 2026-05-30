import * as Yup from "yup";

export const INTIAL_FORM_VALUES = { title: "", description: "" };
export const VALIDATION_SCHEMA = Yup.object({
  title: Yup.string(),
  description: Yup.string(),
});
