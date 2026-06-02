import React from "react";

import { Button } from "@bigbinary/neetoui";
import { Input, Textarea, Select } from "@bigbinary/neetoui/formik";
import { useTranslation } from "react-i18next";

export const Form = ({ isLoading, categories }) => {
  const { t } = useTranslation();

  const categoryOptions = categories.map(k => ({
    label: k.name,
    value: k.id,
  }));

  return (
    <div className="flex h-full w-full flex-col gap-48 rounded-xl border-2 border-[#262626] p-10">
      <div className="flex w-full flex-col gap-5 ">
        <Input
          id="title"
          label={t("labels.title")}
          name="title"
          placeholder={t("placeholders.enterTitle")}
          size="large"
        />
        <Select
          isMulti
          label="Category"
          name="category_ids"
          options={categoryOptions}
          size="large"
        />
        <Textarea
          className="text-white"
          id="description"
          label={t("labels.description")}
          name="description"
          placeholder={t("placeholders.enterDescription")}
          size="large"
        />
      </div>
      <div className="flex h-full w-full items-end justify-end gap-5">
        <Button
          disabled={isLoading}
          label={t("labels.reset")}
          style="secondary"
          type="reset"
        />
        <Button
          label={t("labels.submit")}
          loading={isLoading}
          style="primary"
          type="submit"
        />
      </div>
    </div>
  );
};
