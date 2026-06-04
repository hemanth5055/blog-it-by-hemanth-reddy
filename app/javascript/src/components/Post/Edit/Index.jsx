import React, { useRef, useState } from "react";

import { useShowPost, useUpdatePost } from "hooks/reactQuery/usePostsApi";
import { Form as NeetoForm } from "neetoformik";
import { MenuHorizontal } from "neetoicons";
import { Button, ActionDropdown, Dropdown } from "neetoui";
import { useTranslation } from "react-i18next";
import { useParams, useHistory } from "react-router-dom";
import queryClient from "utils/queryClient";

import { VALIDATION_SCHEMA } from "./constants";
import { Form } from "./Form";

import { QUERY_KEYS } from "../../../constants/query";
import { useDeletePost } from "../../../hooks/reactQuery/usePostsApi";
import routes from "../../../routes";
import { AppHeading } from "../../commons";
import PageLoader from "../../commons/PageLoader";
import NotFound from "../commons/NotFound";

const Edit = () => {
  const [showActionPublish, setShowActionPublish] = useState(true);
  const { t } = useTranslation();
  const history = useHistory();

  const submitRef = useRef();

  const { slug } = useParams();

  const { isLoading, data: { post = null } = {} } = useShowPost(slug);
  const { mutate: updatePost } = useUpdatePost();
  const { mutate: deletePost } = useDeletePost();

  if (isLoading) {
    return <PageLoader />;
  }

  if (!post) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <NotFound />
      </div>
    );
  }

  const handleSubmit = () => {
    if (submitRef.current) {
      submitRef.current.click();
    }
  };

  const handleCancel = () => {
    history.push(routes.root);
  };

  const handleFormikSubmit = async values => {
    updatePost(
      { slug, payload: values, isPostBeingPublished: showActionPublish },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEYS.POSTS, QUERY_KEYS.USER],
            refetchType: "active",
          });

          queryClient.invalidateQueries({
            queryKey: [QUERY_KEYS.POST, slug],
            refetchType: "active",
          });

          queryClient.invalidateQueries({
            queryKey: [QUERY_KEYS.POSTS],
            refetchType: "active",
          });

          history.push(routes.root);
        },
      }
    );
  };

  const handleDelete = async () => {
    deletePost(slug, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.POSTS],
          refetchType: "active",
        });
        history.push(routes.root);
      },
    });
  };

  const { Menu, MenuItem } = ActionDropdown;
  const { MenuItem: MenuItemDropDown } = Dropdown;

  const formValues = {
    title: post.title,
    description: post.description,
    categories: post.categories.map(category => ({
      label: category.name,
      value: category.id,
    })),
  };

  return (
    <div className="flex h-full w-full flex-col p-7">
      <div className="flex w-full items-center justify-between pb-4">
        <AppHeading title={t("titles.editBlogPost")} />
        <div className="flex items-center gap-3">
          <Button
            label={t("labels.cancel")}
            style="secondary"
            onClick={handleCancel}
          />
          <ActionDropdown
            buttonStyle="primary"
            label={
              showActionPublish ? t("labels.publish") : t("labels.saveAsDraft")
            }
            onClick={handleSubmit}
          >
            <Menu className="p-4">
              <MenuItem
                className="cursor-pointer rounded-md p-2"
                onClick={() => setShowActionPublish(true)}
              >
                {t("labels.publish")}
              </MenuItem>
              <MenuItem
                className="cursor-pointer rounded-md p-2"
                onClick={() => setShowActionPublish(false)}
              >
                {t("labels.saveAsDraft")}
              </MenuItem>
            </Menu>
          </ActionDropdown>
          <Dropdown buttonStyle="text" className="p-2" icon={MenuHorizontal}>
            <MenuItemDropDown
              className="cursor-pointer rounded-md p-2"
              onClick={handleDelete}
            >
              {t("labels.delete")}
            </MenuItemDropDown>
          </Dropdown>
        </div>
      </div>
      <div className="h-full w-full">
        <NeetoForm
          className="h-full w-full"
          formProps={{ noValidate: true }}
          formikProps={{
            initialValues: formValues,
            validationSchema: VALIDATION_SCHEMA,
            onSubmit: handleFormikSubmit,
          }}
        >
          <Form isLoading={false} />
          <button ref={submitRef} style={{ display: "none" }} type="submit" />
        </NeetoForm>
      </div>
    </div>
  );
};

export default Edit;
