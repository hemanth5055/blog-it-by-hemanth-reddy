import React, { useRef, useState } from "react";

import { Redirect } from "@bigbinary/neeto-icons";
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
  const isPreviewRef = useRef(false);

  const { slug } = useParams();

  const { isLoading, data: { post = null } = {} } = useShowPost(slug);
  const { mutate: updatePost } = useUpdatePost();
  const { mutate: deletePost } = useDeletePost();

  if (isLoading) return <PageLoader />;

  if (!post) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <NotFound />
      </div>
    );
  }

  if (!post.isOwner) {
    history.push(routes.show.replace(":slug", slug));

    return null;
  }

  const invalidatePostQueries = () => {
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
  };

  const triggerFormSubmit = () => submitRef.current?.click();

  const handlePreviewAndSave = () => {
    isPreviewRef.current = true;
    triggerFormSubmit();
  };

  const handleSave = () => {
    isPreviewRef.current = false;
    triggerFormSubmit();
  };

  const handleCancel = () => history.push(routes.show.replace(":slug", slug));

  const handleDelete = () => {
    deletePost(slug, {
      onSuccess: () => {
        invalidatePostQueries();
        history.push(routes.root);
      },
    });
  };

  const handleFormikSubmit = values => {
    const isPreview = isPreviewRef.current;

    updatePost(
      {
        slug,
        payload: values,
        isPostBeingPublished: isPreview ? false : showActionPublish,
        isQuiet: !!isPreview,
      },
      {
        onSuccess: () => {
          invalidatePostQueries();
          history.push(
            isPreview ? routes.show.replace(":slug", slug) : routes.root
          );
        },
      }
    );
  };

  const { Menu, MenuItem } = ActionDropdown;
  const { MenuItem: MenuItemDropDown } = Dropdown;

  const formValues = {
    title: post.title,
    description: post.description,
    categories: post.categories.map(({ name, id }) => ({
      label: name,
      value: id,
    })),
  };

  return (
    <div className="flex h-full w-full flex-col p-7">
      <div className="flex w-full items-center justify-between pb-4">
        <AppHeading title={t("titles.editBlogPost")} />
        <div className="flex items-center gap-3">
          <Button
            icon={Redirect}
            style="text"
            tooltipProps={{
              content: t("tooltips.preview"),
              position: "top",
              weight: "medium",
            }}
            onClick={handlePreviewAndSave}
          />
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
            onClick={handleSave}
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
          <button className="hidden" ref={submitRef} type="submit" />
        </NeetoForm>
      </div>
    </div>
  );
};

export default Edit;
