import React, { useEffect, useState } from "react";

import postsApi from "apis/posts";
import createConsumer from "channels/consumer";
import { subscribeToPostDownloadChannel } from "channels/downloadPostChannel";
import { ProgressBar } from "commons";
import FileSaver from "file-saver";
import { Modal, Typography } from "neetoui";
import { useTranslation } from "react-i18next";

const DownloadPost = ({ slug }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");
  const { t } = useTranslation();

  const consumer = createConsumer();

  const generatePdf = async () => {
    try {
      await postsApi.generatePdf(slug);
    } catch (error) {
      logger.error(error);
    }
  };

  const downloadPdf = async () => {
    setIsLoading(true);
    try {
      const data = await postsApi.download(slug);
      FileSaver.saveAs(data, `${slug}.pdf`);
    } catch (error) {
      logger.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    subscribeToPostDownloadChannel({
      consumer,
      setMessage,
      setProgress,
      generatePdf,
    });

    return () => {
      consumer.disconnect();
    };
    // Disabled because the use effect should only run on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (progress === 100) {
      setIsLoading(false);
      setTimeout(() => {
        downloadPdf();
      }, 1000);
    }
    // Disabled because downloadPdf is intentionally omitted to avoid re-running
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progress]);

  return (
    <>
      <Modal.Header>
        <Typography style="h3" weight="medium">
          {t("titles.downloadingPost")}
        </Typography>
      </Modal.Header>
      <Modal.Body className="flex w-full flex-col gap-4 py-4">
        <ProgressBar progress={progress} />
        <Typography style="body2" weight="medium">
          {isLoading ? message : t("messages.pdfIsReadyToDownload")}
        </Typography>
      </Modal.Body>
    </>
  );
};

export default DownloadPost;
