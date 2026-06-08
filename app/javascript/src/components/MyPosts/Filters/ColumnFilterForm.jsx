import React from "react";

import { Checkbox } from "neetoformik";
import { useTranslation } from "react-i18next";

import { useColumnFilterStore } from "../../../stores/useColumnFilterStore";
import { FILTER_FIELDS } from "../constants";

const ColumnFilterForm = () => {
  const { t } = useTranslation();
  const { selectedFilters, updateSelectedFilters } = useColumnFilterStore();

  const handleChange = name => event => {
    updateSelectedFilters({ [name]: event.target.checked });
  };

  return (
    <div className="flex flex-col gap-2">
      {FILTER_FIELDS.map(({ name, labelKey, disabled = false }) => (
        <Checkbox
          checked={selectedFilters[name]}
          className="rounded-md p-3 hover:bg-gray-800"
          disabled={disabled}
          key={name}
          label={t(labelKey)}
          name={name}
          onChange={disabled ? undefined : handleChange(name)}
        />
      ))}
    </div>
  );
};

export default ColumnFilterForm;
