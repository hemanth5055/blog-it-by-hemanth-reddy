import React from "react";

import { Form as NeetoForm } from "neetoformik";
import { ActionDropdown } from "neetoui";
import { useTranslation } from "react-i18next";
import { useColumnFilterStore } from "stores/useColumnFilterStore";

import ColumnFilterForm from "./Form/ColumnForm";

const ColumnFilter = () => {
  const { t } = useTranslation();
  const { selectedFilters } = useColumnFilterStore();

  return (
    <ActionDropdown buttonStyle="secondary" label={t("labels.columns")}>
      <ActionDropdown.Menu className="p-2">
        <NeetoForm
          formProps={{ noValidate: true }}
          formikProps={{
            initialValues: selectedFilters,
          }}
        >
          <ColumnFilterForm />
        </NeetoForm>
      </ActionDropdown.Menu>
    </ActionDropdown>
  );
};

export default ColumnFilter;
