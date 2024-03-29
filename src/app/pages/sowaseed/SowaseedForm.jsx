import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import axiosInstance from "../../utils/axiosInterceptor";
import FileUpload from "../../components/FileUpload";
import QuillEditor from "../../components/QuillEditor";

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const SowaseedForm = ({
  defaultValues = {},
  setSowaseed,
  handleCancel,
  setIsUpdating,
  isUpdating,
  sowaseedLength = 0,
}) => {
  const [editedValues, setEditedValues] = useState(defaultValues);
  const [itemId, setItemId] = useState(
    defaultValues.id ? defaultValues.id : sowaseedLength + 1
  );

  const [form] = Form.useForm();

  async function submitForm() {
    setIsUpdating(true);
    let res;
    if (Object.keys(defaultValues).length !== 0) {
      res = await axiosInstance.put("/api/sowaseed-update", {
        ...defaultValues,
        ...editedValues,
      });
    } else {
      res = await axiosInstance.post("/api/sowaseed-update", {
        ...defaultValues,
        ...editedValues,
      });
    }
    if (res?.data) {
      setSowaseed(res.data.allSowaseed);
      handleCancel();
    }
  }

  const afterFileUpload = (type = "image", url) => {
    setEditedValues({ ...editedValues, [type]: url });
    form.setFieldValue(type, url);
  };

  function onDescChange(content) {
    setEditedValues({ ...editedValues, description: content });
    form.setFieldValue("description", content);
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
              label="Name*"
              name={"name"}
              rules={[
                {
                  required: true,
                  message: "Name is required!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item label="Day" name={"day"}>
              <Input />
            </Form.Item>
            <Form.Item label="Description" name="description">
              <QuillEditor
                handleChange={onDescChange}
                value={editedValues.description}
              />
            </Form.Item>
            <Form.Item
              label="Image"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              name={"image"}
            >
              <FileUpload
                name="image"
                prefix="sowaseed"
                length={sowaseedLength}
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
export default React.memo(SowaseedForm);