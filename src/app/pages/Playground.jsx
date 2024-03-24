import React, { useState } from "react";
import { getSignedUrl, uploadFileToSignedUrl } from "../utils/fileUpload";

const Playground = () => {
  const [fileLink, setFileLink] = useState("");
  const onFileSelect = (e) => {
    const file = e.target.files[0];

    const content_type = file.type;

    const key = `${file.name}2`;

    getSignedUrl({ key, content_type }).then((response) => {
      console.log(response);

      uploadFileToSignedUrl(
        response.data.signedUrl,
        file,
        content_type,
        null,
        () => {
          setFileLink(response.data.fileLink);
        }
      );
    });
  };
  return (
    <div>
      <h1>Playground</h1>

      <img src={fileLink} />

      <input type="file" accept="*" onChange={onFileSelect} />
    </div>
  );
};

export default Playground;
