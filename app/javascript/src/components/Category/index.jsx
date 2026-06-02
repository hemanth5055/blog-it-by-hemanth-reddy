import React, { useState } from "react";

import { Button, Input, Modal, Pane, Typography } from "@bigbinary/neetoui";

import Item from "./Item";

import { QUERY_KEYS } from "../../constants/query";
import {
  useCreateCategory,
  useFetchCategories,
} from "../../hooks/reactQuery/useCategoriesApi";
import queryClient from "../../utils/queryClient";

const CategorySidebar = ({ showCategories, setShowCategories }) => {
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [name, setName] = useState("");

  const { data: { data: { categories = [] } = {} } = {} } =
    useFetchCategories();

  const { mutate: createCategory, isLoading: isSubmitting } =
    useCreateCategory();

  const handleCategorySubmit = () => {
    createCategory(
      { name },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CATEGORIES] });
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
            Categories
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
            label="Add new category"
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
            New category
          </Typography>
        </Modal.Header>
        <Modal.Body className="flex w-full flex-col gap-8 pt-2">
          <Input
            label="Category title"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <div className="flex items-center justify-end gap-3">
            <Button
              label="Add"
              loading={isSubmitting}
              style="primary"
              onClick={handleCategorySubmit}
            />
            <Button
              disabled={isSubmitting}
              label="Cancel"
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
