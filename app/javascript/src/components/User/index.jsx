import React from "react";

import { MenuHorizontal } from "@bigbinary/neeto-icons";
import dayjs from "dayjs";
import { Table, Typography, Dropdown, NoData } from "neetoui";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

import { QUERY_KEYS } from "../../constants/query";
import {
  useDeletePost,
  useFetchUserPosts,
  useUpdatePost,
} from "../../hooks/reactQuery/usePostsApi";
import routes from "../../routes";
import queryClient from "../../utils/queryClient";
import { AppHeading } from "../commons";

const User = () => {
  const { t } = useTranslation();

  const { isLoading, data: { posts = [] } = {} } = useFetchUserPosts();
  const { mutate: updatePost } = useUpdatePost();
  const { mutate: deletePost } = useDeletePost();

  const handleTogglePublish = (slug, showActionPublish) => {
    updatePost(
      { slug, payload: {}, isPostBeingPublished: showActionPublish },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEYS.POSTS, QUERY_KEYS.USER],
          });

          queryClient.invalidateQueries({
            queryKey: [QUERY_KEYS.POSTS],
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
        });

        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.POSTS],
        });
      },
    });
  };

  const rowData = posts.map(post => ({
    ...post,
    category: post.categories.map(c => c.name).join(", "),
  }));

  if (!posts) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <NoData
          title={t("titles.pageNotFound")}
          primaryButtonProps={{
            label: t("labels.goToHome"),
            to: routes.root,
            weight: "medium",
          }}
        />
      </div>
    );
  }

  const columns = [
    {
      title: "Title",
      dataIndex: "titleAndSlug",
      key: "titleAndSlug",
      render: (_, record) => (
        <Link to={routes.show.replace(":slug", record.slug)}>
          <Typography className="neeto-ui-text-primary-500" weight="medium">
            {record.title}
          </Typography>
        </Link>
      ),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: category => (
        <Typography className="text-gray-400" style="body1" weight="medium">
          {category}
        </Typography>
      ),
    },
    {
      title: "Updated at",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: updatedAt => (
        <Typography className="text-gray-400" style="body1" weight="medium">
          {dayjs(updatedAt).format("MMM D, YYYY - hh:mm:ss")}
        </Typography>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: status => (
        <Typography className="text-gray-400" style="body1" weight="medium">
          {status ? status.charAt(0).toUpperCase() + status.slice(1) : ""}
        </Typography>
      ),
    },
    {
      key: "action",
      render: (_, record) => {
        const isPublished = record.status === "published";

        return (
          <Dropdown
            buttonStyle="text"
            className="p-2"
            icon={MenuHorizontal}
            strategy="fixed"
          >
            <Dropdown.Menu>
              <Dropdown.MenuItem
                className="text-md cursor-pointer  rounded-md p-2"
                onClick={() => handleTogglePublish(record.slug, !isPublished)}
              >
                <Typography style="body1" weight="medium">
                  {isPublished ? "Unpublish" : "Publish"}
                </Typography>
              </Dropdown.MenuItem>
              <Dropdown.Divider />
              <Dropdown.MenuItem
                className="cursor-pointer rounded-md p-2"
                onClick={() => handleDeletePost(record.slug)}
              >
                <Typography style="body1" weight="medium">
                  Delete
                </Typography>
              </Dropdown.MenuItem>
            </Dropdown.Menu>
          </Dropdown>
        );
      },
    },
  ];

  return (
    <div className="flex h-full w-full flex-col gap-5 p-7">
      <div className="flex w-full flex-col gap-4 pb-4">
        <AppHeading title={t("titles.myBlogPosts")} />
        <Typography weight="semibold">{posts?.length} articles</Typography>
      </div>
      <div className="h-full w-full">
        <Table columnData={columns} loading={isLoading} rowData={rowData} />
      </div>
    </div>
  );
};

export default User;
