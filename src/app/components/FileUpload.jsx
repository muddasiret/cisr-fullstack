import React, { useState } from "react";
import { FileOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, message, Upload } from "antd";
import useFileUpload from "../hooks/useFileUpload";

const FileUpload = ({
  prefix = "news",
  name,
  setImageFile,
  itemId,
  afterUpload = () => {},
  fileUrl = null,
  accept = "image/png, image/jpeg, image/jpg, image/webp",
}) => {
  const [isUploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fileURL, setFileURL] = useState(fileUrl);
  const [file, setFile] = useState(null);

  const onSuccess = (fileLink) => {
    if (name !== "image") {
      setFileURL(fileLink);
    }
    afterUpload(name, fileLink);
  };

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const { uploadFile, uploadProgress, uploading } = useFileUpload(
    onSuccess,
    prefix,
    itemId
  );

  const handleChange = (info) => {
    setFile(info.file);
    setImageFile(info.file);

    getBase64(info.file, (url) => {
      setLoading(false);
      setFileURL(url);
    });
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
    }
    handleUpload();
  };

  const handleUpload = () => {
    setUploading(true);
    // You can use any AJAX library you like
    uploadFile(file, itemId, name);
  };

  const props = {
    onRemove: () => {
      setFile(null);
    },
    beforeUpload: (file) => {
      setFile(file);
      setImageFile(file);
      return false;
    },
    file,
  };

  return (
    <>
      <Upload
        {...props}
        maxCount={1}
        onChange={handleChange}
        className="upload-file"
        accept={accept}
      >
        {fileURL && name === "image" ? (
          <img
            src={fileURL}
            alt="avatar"
            style={{
              width: "100%",
            }}
          />
        ) : (
          fileURL && (
            <div className="flex mb-2">
              <FileOutlined />
              <div>
                <a className="pdf-link" href={fileURL} target="_blank">
                  {fileURL}
                </a>{" "}
              </div>
            </div>
          )
        )}
        <Button
          disabled={uploading}
          loading={uploading}
          icon={<UploadOutlined />}
        >
          {!uploading
            ? fileURL
              ? "Change File"
              : "Select File"
            : "Uploading....Pls wait"}
        </Button>
      </Upload>
    </>
  );
};
export default FileUpload;
