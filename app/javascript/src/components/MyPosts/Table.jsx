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
import ColumnFilter from "./ColumnFilter";
import RowFilter from "./RowFilter";

import { QUERY_KEYS } from "../../constants/query";
import { useBulkDeletePost } from "../../hooks/reactQuery/usePostsApi";
import { useColumnFilterStore } from "../../stores/useColumnFilterStore";

const Table = ({ posts }) => {
  const { t } = useTranslation();
  const [showAlert, setShowAlert] = useState(false);

  const { mutate: bulkDeletePosts } = useBulkDeletePost();

  const [selectedPostIds, setSelectedPostIds] = useState([]);
  const { selectedFilters: selectedColumnFilters } = useColumnFilterStore();

  const { mutate: updatePost } = useUpdatePost();
  const { mutate: deletePost } = useDeletePost();

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
      title: t("labels.lastUpdatedAt"),
      dataIndex: "lastUpdatedAt",
      key: "lastUpdatedAt",
      render: lastUpdatedAt => (
        <Typography className="text-gray-400" style="body1" weight="medium">
          {dayjs(lastUpdatedAt).format("MMM D, YYYY - hh:mm:ss A")}
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
                  className="text-md cursor-pointer  rounded-md p-2"
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

  const handleBulkDelete = () => {
    bulkDeletePosts(selectedPostIds, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.POSTS, QUERY_KEYS.USER],
          refetchType: "active",
        });
        setShowAlert(false);
      },
    });
  };

  const finalColumns = columns.filter(
    column => column.key === "action" || selectedColumnFilters[column.key]
  );

  const rowData = posts.map(post => ({
    ...post,
    key: post.slug,
    category: post.categories.map(c => c.name).join(", "),
  }));

  return (
    <>
      <div className="flex w-full flex-col gap-4">
        <div className="flex w-full items-center justify-between py-2">
          <div className="flex items-center gap-2 ">
            {selectedPostIds.length === 0 ? (
              <>
                <Typography weight="semibold">
                  {t("messages.result", { count: posts.length })}
                </Typography>
                <AppliedFilterTags />
              </>
            ) : (
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
              </div>
            )}
          </div>
          <div className="flex gap-3">
            <ColumnFilter />
            <RowFilter />
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
