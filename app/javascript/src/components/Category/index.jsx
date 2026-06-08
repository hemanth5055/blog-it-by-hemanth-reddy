import React, { useState } from "react";

import {
  useCreateCategory,
  useFetchCategories,
} from "hooks/reactQuery/useCategoriesApi";
import { Button, Input, Modal, Pane, Typography } from "neetoui";
import { useTranslation } from "react-i18next";
import { QUERY_KEYS } from "src/constants/query";
import queryClient from "utils/queryClient";

import Item from "./Item";

const CategorySidebar = ({ showCategories, setShowCategories }) => {
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [name, setName] = useState("");

  const { t } = useTranslation();

  const { data: { categories = [] } = {} } = useFetchCategories();

  const { mutate: createCategory, isLoading: isSubmitting } =
    useCreateCategory();

  const handleCategorySubmit = () => {
    createCategory(
      { name },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEYS.CATEGORIES],
            refetchType: "active",
          });
          setShowAddCategoryModal(false);
          setName("");
        },
      }
    );
  };

  return (
    <>
      <Pane isOpen={showCategories} onClose={() => setShowCategories(false)}>
        <Pane.Header>
          <Typography style="h2" weight="semibold">
            {t("titles.categories")}
          </Typography>
        </Pane.Header>
        <Pane.Body className="flex flex-col gap-3">
          {categories.map(category => (
            <Item id={category.id} key={category.id} name={category.name} />
          ))}
        </Pane.Body>
        <Pane.Footer className="flex w-full items-center justify-center">
          <Button
            className="text-medium flex w-full items-center justify-center"
            label={t("labels.addNewCategory")}
            size="large"
            style="primary"
            onClick={() => setShowAddCategoryModal(true)}
          />
        </Pane.Footer>
      </Pane>
      <Modal
        isOpen={showAddCategoryModal}
        onClose={() => setShowAddCategoryModal(false)}
      >
        <Modal.Header>
          <Typography style="h3" weight="semibold">
            {t("titles.newCategory")}
          </Typography>
        </Modal.Header>
        <Modal.Body className="flex w-full flex-col gap-8 pt-2">
          <Input
            required
            label={t("labels.categoryName")}
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <div className="flex items-center justify-end gap-3">
            <Button
              label={t("labels.add")}
              loading={isSubmitting}
              style="primary"
              onClick={handleCategorySubmit}
            />
            <Button
              disabled={isSubmitting}
              label={t("labels.cancel")}
              style="secondary"
              onClick={() => setShowAddCategoryModal(false)}
            />
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CategorySidebar;
