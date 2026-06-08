import React from "react";

import { useFetchCategories } from "hooks/reactQuery/useCategoriesApi";
import { Input, Select } from "neetoformik";
import { Button } from "neetoui";
import { useTranslation } from "react-i18next";

import { useRowFilterStore } from "../../../stores/useRowFilterStore";
import { ROW_FILTER_INITIAL_VALUES, STATUS_OPTIONS } from "../constants";

const RowFilterForm = ({ setShowPane }) => {
  const { t } = useTranslation();
  const { data: { categories = [] } = {} } = useFetchCategories();
  const { updateSelectedFilters } = useRowFilterStore();

  const categoryOptions = categories.map(k => ({
    label: k.name,
    value: k.id,
  }));

  const handleReset = () => {
    updateSelectedFilters(ROW_FILTER_INITIAL_VALUES);
    setShowPane(false);
  };

  return (
    <div className="flex h-full w-full flex-col justify-between">
      <div className="flex w-full flex-col gap-4 ">
        <Input
          required
          id="title"
          label={t("labels.title")}
          name="title"
          placeholder={t("placeholders.enterTitle")}
          size="large"
        />
        <Select
          isMulti
          required
          label={t("labels.category")}
          name="categories"
          options={categoryOptions}
          size="large"
        />
        <Select
          required
          label={t("labels.status")}
          name="status"
          options={STATUS_OPTIONS}
          size="large"
        />
      </div>
      <div className="flex h-full w-full items-end justify-end gap-5">
        <Button
          label={t("labels.reset")}
          style="secondary"
          onClick={handleReset}
        />
        <Button label={t("labels.save")} style="primary" type="submit" />
      </div>
    </div>
  );
};

export default RowFilterForm;
