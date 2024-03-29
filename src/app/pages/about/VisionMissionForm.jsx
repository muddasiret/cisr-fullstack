import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import axiosInstance from "../../utils/axiosInterceptor";
import QuillEditor from "../../components/QuillEditor";

const VisionMissionForm = ({
  defaultValues = {},
  setAbout,
  handleCancel,
  setIsUpdating,
  isUpdating,
}) => {
  const [editedValues, setEditedValues] = useState(defaultValues);
  const [form] = Form.useForm();

  async function submitForm() {
    setIsUpdating(true);
    let res;
    console.log(editedValues.body.length);
    if (Object.keys(defaultValues).length !== 0) {
      res = await axiosInstance.put("/api/visionmission-update", {
        ...defaultValues,
        ...editedValues,
      });
    } else {
      res = await axiosInstance.post("/api/visionmission-update", {
        ...defaultValues,
        ...editedValues,
      });
    }
    if (res?.data) {
      setAbout(res.data);
      handleCancel();
    }
  }

  function onDescChange(content) {
    setEditedValues({ ...editedValues, body: content });
    form.setFieldValue("body", content);
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
            <Form.Item label="body" name="body">
              <QuillEditor
                handleChange={onDescChange}
                value={editedValues.body}
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
export default React.memo(VisionMissionForm);
