import React, { useState } from "react";

import { Form as NeetoForm } from "neetoformik";
import { Filter } from "neetoicons";
import { Pane, Button, Typography } from "neetoui";
import { useTranslation } from "react-i18next";
import { useRowFilterStore } from "stores/useRowFilterStore";

import RowFilterForm from "./Form/RowForm";

const RowFilter = () => {
  const [showPane, setShowPane] = useState(false);
  const { t } = useTranslation();
  const { updateSelectedFilters, selectedFilters } = useRowFilterStore();
  const handleFormSubmit = values => {
    const title = values.title ?? "";

    updateSelectedFilters({
      status: values.status,
      categories: values.categories,
      title,
    });
    setShowPane(false);
  };

  return (
    <>
      <Button
        icon={Filter}
        style="secondary"
        onClick={() => setShowPane(true)}
      />
      <Pane isOpen={showPane} onClose={() => setShowPane(false)}>
        <Pane.Header>
          <Typography style="h2" weight="semibold">
            {t("labels.filters")}
          </Typography>
        </Pane.Header>
        <Pane.Body className="w-full">
          <NeetoForm
            className="h-full w-full"
            formProps={{ noValidate: true }}
            formikProps={{
              initialValues: selectedFilters,
              // validationSchema: LOGIN_FORM_VALIDATION_SCHEMA,
              onSubmit: handleFormSubmit,
            }}
          >
            <RowFilterForm setShowPane={setShowPane} />
          </NeetoForm>
        </Pane.Body>
      </Pane>
    </>
  );
};

export default RowFilter;
