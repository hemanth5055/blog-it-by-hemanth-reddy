import * as Yup from "yup";

const MAX_TITLE_LENGTH = 125;
const MAX_DESC_LENGTH = 10_000;

export const INTIAL_FORM_VALUES = { title: "", description: "" };

export const VALIDATION_SCHEMA = Yup.object({
  title: Yup.string()
    .required("Title is required")
    .max(
      MAX_TITLE_LENGTH,
      `Title cannot exceed ${MAX_TITLE_LENGTH} characters`
    ),

  description: Yup.string()
    .required("Description is required")
    .max(
      MAX_DESC_LENGTH,
      `Description cannot exceed ${MAX_DESC_LENGTH} characters`
    ),
});
