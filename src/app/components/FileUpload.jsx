import React, { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Button, message, Upload } from "antd";
import useFileUpload from "../hooks/useFileUpload";

const FileUpload = ({ prefix = "news", onChange = () => {} }) => {
  const [isUploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const [uploadImageUrl, setUploadImageUrl] = useState();

  const onSuccess = (fileLink) => {
    console.log(fileLink);
  };

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const { uploadFile, uploadProgress, uploading } = useFileUpload(
    onSuccess,
    prefix
  );

  console.log({ uploading, uploadProgress });

  const [file, setFile] = useState(null);

  // useEffect(() => {
  //   uploadFile(file);
  //   // Do NOT put uploadFile function as dependency here
  //   // eslint-disable-next-line
  // }, [file]);

  const handleChange = (info) => {
    console.log(info.file);
    const fileNameArray = info.file.name.split(".");
    console.log(
      fileNameArray,
      fileNameArray.slice(0, -1).join(""),
      fileNameArray[fileNameArray.length - 1]
    );

    setFile(info.file);

    getBase64(info.file, (url) => {
      console.log(info.file.name.split("."), info.file, url);
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
  };

  const handleUpload = () => {
    setUploading(true);
    // You can use any AJAX library you like
    uploadFile(file);
  };

  const props = {
    onRemove: () => {
      setFile(null);
    },
    beforeUpload: (file) => {
      console.log(file);
      setFile(file);
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
      >
        {imageUrl && (
          <img
            src={imageUrl}
            alt="avatar"
            style={{
              width: "100%",
            }}
          />
        )}
        <Button icon={<UploadOutlined />}>Select File</Button>
      </Upload>
      <Button
        type="primary"
        onClick={handleUpload}
        disabled={!file}
        loading={uploading}
        style={{
          marginTop: 16,
        }}
      >
        {uploading
          ? "Uploading"
          : uploadImageUrl
          ? "Change Image"
          : "Start Upload"}
      </Button>
    </>
  );
};
export default FileUpload;
