import { useCallback, useState } from "react";
import { getSignedUrl, uploadFileToSignedUrl } from "../utils/fileUpload";

function getKeyAndContentType(file, prefix = "documents", id, name) {
  const fileNameArray = file.name.split(".");
  const extension = fileNameArray[fileNameArray.length - 1];
  // to generate unique key everytime
  let key = prefix + `-${name}-${id}.${extension}`;

  let content_type = file.type;

  return { key, content_type };
}

export default function useFileUpload(onSuccess, prefix) {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(null);

  const uploadFile = useCallback((file, id, name) => {
    if (file) {
      const { key, content_type } = getKeyAndContentType(
        file,
        prefix,
        id,
        name
      );

      getSignedUrl({ key, content_type }).then((response) => {
        const signedUrl = response.data?.signedUrl;
        const fileLink = response.data?.fileLink;

        if (signedUrl) {
          setUploading(true);
          uploadFileToSignedUrl(
            signedUrl,
            file,
            content_type,
            (progress) => {
              setUploadProgress((progress.loaded / progress.total) * 100);
            },
            () => {
              onSuccess(fileLink);
              setUploading(false);
            }
          ).finally(() => {
            setUploadProgress(0);
          });
        }
      });
    }
    // eslint-disable-next-line
  }, []);

  return {
    uploading,
    uploadProgress,
    uploadFile,
  };
}
