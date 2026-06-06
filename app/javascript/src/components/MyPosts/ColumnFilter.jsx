import React from "react";

import { Form as NeetoForm } from "neetoformik";
import { ActionDropdown } from "neetoui";
import { useTranslation } from "react-i18next";

import FilterForm from "./FilterForm";

import { useColumnFilterStore } from "../../stores/useColumnFilterStore";

const ColumnFilter = () => {
  const { t } = useTranslation();
  const { selectedFilters } = useColumnFilterStore();

  return (
    <ActionDropdown buttonStyle="secondary" label={t("labels.coulmns")}>
      <ActionDropdown.Menu className="p-2">
        <NeetoForm
          formProps={{ noValidate: true }}
          formikProps={{
            initialValues: selectedFilters,
            // validationSchema: LOGIN_FORM_VALIDATION_SCHEMA,
            // onSubmit: handleFormSubmit,
          }}
        >
          <FilterForm />
        </NeetoForm>
      </ActionDropdown.Menu>
    </ActionDropdown>
  );
};

export default ColumnFilter;
