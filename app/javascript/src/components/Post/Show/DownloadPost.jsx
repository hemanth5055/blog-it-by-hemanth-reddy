import React, { useEffect, useState } from "react";

import postsApi from "apis/posts";
import createConsumer from "channels/consumer";
import { subscribeToPostDownloadChannel } from "channels/downloadPostChannel";
import { ProgressBar } from "commons";
import FileSaver from "file-saver";
import { Modal, Typography, Button } from "neetoui";

const DownloadPost = ({ slug }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");

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
  }, []);

  useEffect(() => {
    if (progress === 100) {
      setIsLoading(false);
      setMessage("Pdf is ready to be downloaded");
    }
  }, [progress]);

  return (
    <>
      <Modal.Header>
        <Typography style="h3" weight="medium">
          Downloading Post
        </Typography>
      </Modal.Header>
      <Modal.Body className="flex w-full flex-col gap-4 py-4">
        <ProgressBar progress={progress} />
        <Typography style="body2" weight="medium">
          {message}
        </Typography>
        <div className="flex w-full justify-end">
          <Button disabled={isLoading} onClick={downloadPdf}>
            Download
          </Button>
        </div>
      </Modal.Body>
    </>
  );
};

export default DownloadPost;
