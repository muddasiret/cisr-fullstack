import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import axiosInstance from "../../utils/axiosInterceptor";
import FileUpload from "../../components/FileUpload";

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const GalleryForm = ({
  defaultValues = {},
  setGallery,
  handleCancel,
  setIsUpdating,
  isUpdating,
  galleryLength = 0,
}) => {
  const [editedValues, setEditedValues] = useState(defaultValues);
  const [imageFile, setImageFile] = useState(null);
  const [itemId, setItemId] = useState(
    defaultValues.id ? defaultValues.id : galleryLength + 1
  );

  const [form] = Form.useForm();

  async function submitForm() {
    setIsUpdating(true);
    let res;
    if (Object.keys(defaultValues).length !== 0) {
      res = await axiosInstance.put("/api/gallery-update", {
        ...defaultValues,
        ...editedValues,
      });
    } else {
      res = await axiosInstance.post("/api/gallery-update", {
        ...defaultValues,
        ...editedValues,
      });
    }
    if (res?.data) {
      setGallery(res.data.allGallery);
      handleCancel();
    }
  }

  const afterFileUpload = (type = "image", url) => {
    setEditedValues({ ...editedValues, [type]: url });
    form.setFieldValue(type, url);
  };

  return (
    <>
      <Form
        className="form-popup"
        form={form}
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 22,
        }}
        layout="vertical"
        style={{
          maxWidth: 600,
          display: "flex",
          flexDirection: "column",
        }}
        onFieldsChange={(_, allFields) => {
          setEditedValues(form.getFieldsValue());
        }}
        initialValues={defaultValues}
        onFinish={() => {
          submitForm();
        }}
      >
        <div className="relative">
          <div className="mb-4">
            <Form.Item
              label="Title*"
              name={"title"}
              rules={[
                {
                  required: true,
                  message: "Title is required!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item label="Subtitle" name={"subtitle"}>
              <Input />
            </Form.Item>
            <Form.Item
              label="Image"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              name={"image"}
            >
              <FileUpload
                name="image"
                prefix="gallery"
                length={galleryLength}
                setImageFile={setImageFile}
                itemId={itemId}
                afterUpload={afterFileUpload}
                fileUrl={editedValues.image}
              />
            </Form.Item>
          </div>
          <div className="sticky bottom-0 pb-2 right-0 w-full flex justify-end bg-white">
            <Button
              htmlType="submit"
              type="primary"
              className="mr-2"
              loading={isUpdating}
            >
              Update
            </Button>
            <Button onClick={handleCancel}>Cancel</Button>
          </div>
        </div>
      </Form>
    </>
  );
};
export default React.memo(GalleryForm);
