import React, { useState } from "react";

import dayjs from "dayjs";
import { useDeletePost, useUpdatePost } from "hooks/reactQuery/usePostsApi";
import { MenuHorizontal, Delete } from "neetoicons";
import {
  Typography,
  Dropdown,
  Table as NeetoTable,
  Button,
  Alert,
} from "neetoui";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import routes from "src/routes";
import queryClient from "utils/queryClient";

import AppliedFilterTags from "./AppliedFilterTags";
import { BULK_STATUS_OPTIONS } from "./constants";
import ColumnFilter from "./Filters/ColumnFilter";
import RowFilter from "./Filters/RowFilter";

import { QUERY_KEYS } from "../../constants/query";
import {
  useBulkDeletePost,
  useBulkUpdatePosts,
} from "../../hooks/reactQuery/usePostsApi";
import { useColumnFilterStore } from "../../stores/useColumnFilterStore";

const Table = ({ posts }) => {
  const { t } = useTranslation();
  const [showAlert, setShowAlert] = useState(false);
  const [selectedPostIds, setSelectedPostIds] = useState([]);

  const { selectedFilters: selectedColumnFilters } = useColumnFilterStore();
  const { mutate: updatePost } = useUpdatePost();
  const { mutate: deletePost } = useDeletePost();
  const { mutate: bulkDeletePosts } = useBulkDeletePost();
  const { mutate: bulkUpdatePosts } = useBulkUpdatePosts();

  const resetBulkSelection = () => {
    setSelectedPostIds([]);
    setShowAlert(false);
  };

  const handleTogglePublish = (slug, showActionPublish) => {
    updatePost(
      { slug, payload: {}, isPostBeingPublished: showActionPublish },
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
        },
      }
    );
  };

  const handleDeletePost = slug => {
    deletePost(slug, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.POSTS, QUERY_KEYS.USER],
          refetchType: "active",
        });

        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.POSTS],
          refetchType: "active",
        });
      },
    });
  };

  const handleBulkDelete = () => {
    bulkDeletePosts(selectedPostIds, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.POSTS, QUERY_KEYS.USER],
          refetchType: "active",
        });

        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.POSTS],
          refetchType: "active",
        });
        resetBulkSelection();
      },
    });
  };

  const handleBulkUpdate = status => {
    bulkUpdatePosts(
      { ids: selectedPostIds, status },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEYS.POSTS, QUERY_KEYS.USER],
            refetchType: "active",
          });

          queryClient.invalidateQueries({
            queryKey: [QUERY_KEYS.POSTS],
            refetchType: "active",
          });
          resetBulkSelection();
        },
      }
    );
  };

  const columns = [
    {
      title: t("labels.title"),
      dataIndex: "title",
      key: "title",
      render: (_, post) => (
        <Link to={routes.show.replace(":slug", post.slug)}>
          <Typography className="neeto-ui-text-primary-500" weight="medium">
            {post.title}
          </Typography>
        </Link>
      ),
    },
    {
      title: t("labels.category"),
      dataIndex: "category",
      key: "category",
      render: category => (
        <Typography className="text-gray-400" style="body1" weight="medium">
          {category}
        </Typography>
      ),
    },
    {
      title: t("labels.lastPublishedAt"),
      dataIndex: "lastPublishedAt",
      key: "lastPublishedAt",
      render: lastPublishedAt => (
        <Typography className="text-gray-400" style="body1" weight="medium">
          {dayjs(lastPublishedAt).format("MMM D, YYYY - hh:mm:ss A")}
        </Typography>
      ),
    },
    {
      title: t("labels.status"),
      dataIndex: "status",
      key: "status",
      render: status => (
        <Typography className="text-gray-400" style="body1" weight="medium">
          {status ? status.charAt(0).toUpperCase() + status.slice(1) : ""}
        </Typography>
      ),
    },
    {
      dataIndex: "action",
      key: "action",
      render: (_, post) => {
        const isPublished = post.status === "published";

        return (
          <div className="flex items-center justify-between">
            <Dropdown
              buttonStyle="text"
              className="p-2"
              icon={MenuHorizontal}
              strategy="fixed"
            >
              <Dropdown.Menu>
                <Dropdown.MenuItem
                  className="text-md cursor-pointer rounded-md p-2"
                  onClick={() => handleTogglePublish(post.slug, !isPublished)}
                >
                  <Typography style="body1" weight="medium">
                    {isPublished ? t("labels.unpublish") : t("labels.publish")}
                  </Typography>
                </Dropdown.MenuItem>
                <Dropdown.Divider />
                <Dropdown.MenuItem
                  className="cursor-pointer rounded-md p-2"
                  onClick={() => handleDeletePost(post.slug)}
                >
                  <Typography style="body1" weight="medium">
                    {t("labels.delete")}
                  </Typography>
                </Dropdown.MenuItem>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        );
      },
    },
  ];

  const finalColumns = columns.filter(
    column => column.key === "action" || selectedColumnFilters[column.key]
  );

  const rowData = posts.map(post => ({
    ...post,
    key: post.slug,
    category: post.categories.map(c => c.name).join(", "),
  }));

  const hasSelection = selectedPostIds.length > 0;

  return (
    <>
      <div className="flex w-full flex-col gap-4">
        <div className="flex w-full items-center justify-between py-2">
          <div className="flex w-full">
            {hasSelection ? (
              <div className="flex items-center gap-3">
                <Typography weight="semibold">
                  {t("messages.article", {
                    count: selectedPostIds.length,
                    total: posts.length,
                  })}
                </Typography>
                <Button
                  className="font-medium text-white"
                  icon={Delete}
                  iconPosition="right"
                  label={t("labels.delete")}
                  size="small"
                  style="danger"
                  onClick={() => setShowAlert(true)}
                />
                <Dropdown
                  buttonStyle="secondary"
                  className="flex w-full flex-col gap-2 p-2"
                  label={t("label.changeStatus")}
                >
                  {BULK_STATUS_OPTIONS.map(status => (
                    <Button
                      className="flex w-full hover:bg-gray-800"
                      key={status}
                      style="text"
                      onClick={() => handleBulkUpdate(status)}
                    >
                      {t(`labels.${status}`)}
                    </Button>
                  ))}
                </Dropdown>
              </div>
            ) : (
              <div className="flex w-full justify-between">
                <div className="flex items-center gap-2">
                  <Typography weight="semibold">
                    {t("messages.result", { count: posts.length })}
                  </Typography>
                  <AppliedFilterTags />
                </div>
                <div className="flex items-center gap-2">
                  <ColumnFilter />
                  <RowFilter />
                </div>
              </div>
            )}
          </div>
        </div>
        <NeetoTable
          rowSelection
          columnData={finalColumns}
          rowData={rowData}
          selectedRowKeys={selectedPostIds}
          onRowSelect={ids => setSelectedPostIds(ids)}
        />
      </div>
      <Alert
        isOpen={showAlert}
        message={t("messages.deleteSelectedPostsWarning")}
        submitButtonLabel={t("labels.delete")}
        title={t("titles.confirmBulkDelete")}
        onClose={() => setShowAlert(false)}
        onSubmit={handleBulkDelete}
      />
    </>
  );
};

export default Table;
