import React, { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
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
  const [imageUrl, setImageUrl] = useState(fileUrl);
  const [file, setFile] = useState(null);

  const onSuccess = (fileLink) => {
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

  // useEffect(() => {
  //   uploadFile(file);
  //   // Do NOT put uploadFile function as dependency here
  //   // eslint-disable-next-line
  // }, [file]);

  const handleChange = (info) => {
    setFile(info.file);
    setImageFile(info.file);

    getBase64(info.file, (url) => {
      setLoading(false);
      setImageUrl(url);
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
        {imageUrl && (
          <img
            src={imageUrl}
            alt="avatar"
            style={{
              width: "100%",
              display: name === "image" ? "unset" : "none",
            }}
          />
        )}
        <Button icon={<UploadOutlined />}>
          {imageUrl ? "Change" : "Select"} File
        </Button>
      </Upload>
    </>
  );
};
export default FileUpload;
