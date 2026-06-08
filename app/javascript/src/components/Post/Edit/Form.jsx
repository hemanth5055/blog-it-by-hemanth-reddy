import React from "react";

import { useFetchCategories } from "hooks/reactQuery/useCategoriesApi";
import { Input, Textarea, Select } from "neetoformik";
import { useTranslation } from "react-i18next";

export const Form = () => {
  const { data: { categories = [] } = {} } = useFetchCategories();
  const { t } = useTranslation();

  const categoryOptions = categories.map(k => ({
    label: k.name,
    value: k.id,
  }));

  return (
    <div className="flex h-full w-full flex-col gap-48 rounded-xl border-2 border-[#262626] p-10">
      <div className="flex w-full flex-col gap-5 ">
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
        <Textarea
          required
          className="text-white"
          id="description"
          label={t("labels.description")}
          name="description"
          placeholder={t("placeholders.enterDescription")}
          size="large"
        />
      </div>
    </div>
  );
};
