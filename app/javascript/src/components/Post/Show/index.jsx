import React, { useState } from "react";

import PageLoader from "commons/PageLoader";
import dayjs from "dayjs";
import { useShowPost } from "hooks/reactQuery/usePostsApi";
import { Download, Edit } from "neetoicons";
import { Tag, Typography, Avatar, Button, Modal } from "neetoui";
import { useTranslation } from "react-i18next";
import { useParams, useHistory } from "react-router-dom";
import { getEditUrl } from "utils/url";

import DownloadPost from "./DownloadPost";

import NotFound from "../commons/NotFound";

const Show = () => {
  const { slug } = useParams();
  const { t } = useTranslation();
  const history = useHistory();

  const { isLoading, data: { post = null } = {} } = useShowPost(slug);
  const [showDownloadModal, setShowDownloadModal] = useState(false);

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

  return (
    <>
      <div className="flex h-full w-full flex-col gap-3 p-10">
        <div className="flex w-full items-center justify-between pr-5">
          <div className="flex w-full gap-2">
            {post?.categories?.map(category => (
              <Tag key={category.id} label={category.name} style="secondary" />
            ))}
          </div>
          <div className="flex gap-3">
            {post?.isOwner && (
              <Button
                icon={Edit}
                label={t("labels.edit")}
                style="secondary"
                onClick={() => {
                  history.push(getEditUrl(slug));
                }}
              />
            )}
            <Button
              icon={Download}
              style="secondary"
              onClick={() => setShowDownloadModal(true)}
            />
          </div>
        </div>
        <div className="flex w-full items-center gap-5">
          <Typography className="text-gray-200" style="h1" weight="medium">
            {post?.title}
          </Typography>
          {post.status === "draft" && (
            <Tag style="danger">{t("messages.draft")}</Tag>
          )}
        </div>
        <div className="flex w-full items-center gap-2 pb-2">
          <div>
            <Avatar user={{ name: "Hello" }} />
          </div>
          <div className="flex flex-col">
            <Typography className="text-gray-400" style="body2" weight="medium">
              {post.user.name}
            </Typography>
            <Typography className="text-gray-400" style="body2" weight="medium">
              {dayjs(post.updatedAt).format("MMM D, YYYY")}
            </Typography>
          </div>
        </div>
        <div className="h-full w-full overflow-y-scroll whitespace-pre-line">
          <Typography
            className="whitespace-pre-line leading-7 text-gray-300"
            style="body1"
            weight="medium"
          >
            {post?.description}
          </Typography>
        </div>
      </div>
      <Modal
        className="pb-4"
        isOpen={showDownloadModal}
        onClose={() => setShowDownloadModal(false)}
      >
        <DownloadPost slug={slug} />
      </Modal>
    </>
  );
};

export default Show;
