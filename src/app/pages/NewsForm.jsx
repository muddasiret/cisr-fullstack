import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Upload } from "antd";
import axiosInstance from "../utils/axiosInterceptor";
import FileUpload from "../components/FileUpload";
const { TextArea } = Input;

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  console.log(e);
  return e?.fileList;
};

const NewsForm = ({
  defaultValues = {},
  setNews,
  handleCancel,
  setIsUpdating,
  isUpdating,
  newsLength = 0,
}) => {
  const [editedValues, setEditedValues] = useState(defaultValues);
  const [imageFile, setImageFile] = useState(null);

  const [form] = Form.useForm();

  async function submitForm() {
    setIsUpdating(true);
    let res;
    if (Object.keys(defaultValues).length !== 0) {
      res = await axiosInstance.put("/api/news-update", {
        ...defaultValues,
        ...editedValues,
      });
    } else {
      res = await axiosInstance.post("/api/news-update", {
        ...defaultValues,
        ...editedValues,
      });
    }
    if (res?.data) {
      setNews(response.data.allNews);
      handleCancel();
    }
  }
  return (
    <>
      <Form
        className="form-popup"
        form={form}
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
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
            <Form.Item label="Section" name="section">
              <Input />
            </Form.Item>
            <Form.Item label="Description" name="description">
              <TextArea rows={4} />
            </Form.Item>
            <Form.Item
              label="Image"
              valuePropName="fileList"
              getValueFromEvent={normFile}
            >
              <FileUpload
                name="news-image"
                length={newsLength}
                imageFile={imageFile}
                setImageFile={setImageFile}
              />
            </Form.Item>
            <Form.Item label="Pdf Label" name="pdf_text">
              <Input />
            </Form.Item>

            <Form.Item
              label="Pdf"
              valuePropName="fileList"
              getValueFromEvent={normFile}
            >
              <FileUpload name="news-pdf" length={newsLength} />
            </Form.Item>
          </div>
          <div className="sticky bottom-2 right-0 w-full flex justify-end">
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
export default React.memo(NewsForm);
