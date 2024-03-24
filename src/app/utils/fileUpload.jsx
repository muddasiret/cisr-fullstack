import axiosInstance from "./axiosInterceptor";

export async function getSignedUrl({ key, content_type }) {
  const response = await axiosInstance.post("/s3/signed_url", {
    key,
    content_type,
  });

  return response.data;
}

export async function uploadFileToSignedUrl(
  signedUrl,
  file,
  contentType,
  onProgress,
  onComplete
) {
  axiosInstance
    .put(signedUrl, file, {
      onUploadProgress: onProgress,
      headers: {
        "Content-Type": contentType,
      },
    })
    .then((response) => {
      onComplete(response);
    })
    .catch((err) => {
      console.error(err.response);
    });
}
