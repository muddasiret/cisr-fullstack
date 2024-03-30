import React, { useState } from "react";
import { Button, Form, Input, Upload, message } from "antd";
import axiosInstance from "../../utils/axiosInterceptor";
import FileUpload from "../../components/FileUpload";
import QuillEditor from "../../components/QuillEditor";
const { TextArea } = Input;

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const EventsForm = ({
  defaultValues = {},
  setEvents,
  handleCancel,
  setIsUpdating,
  isUpdating,
  eventsLength = 0,
}) => {
  const [editedValues, setEditedValues] = useState(defaultValues);
  const [itemId, setItemId] = useState(
    defaultValues.id ? defaultValues.id : eventsLength + 1
  );

  const [form] = Form.useForm();

  async function submitForm() {
    setIsUpdating(true);
    let res;
    try {
      if (Object.keys(defaultValues).length !== 0) {
        res = await axiosInstance.put("/api/events-update", {
          ...defaultValues,
          ...editedValues,
        });
      } else {
        res = await axiosInstance.post("/api/events-update", {
          ...defaultValues,
          ...editedValues,
        });
      }
      if (res?.data) {
        setEvents(res.data.allEvents);
        handleCancel();
      }
    } catch (err) {
      console.log(err);
      message.error("Error creating event! Enter unique title.");
      setIsUpdating(false);
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
            <Form.Item label="Location" name={"location"}>
              <Input />
            </Form.Item>
            <Form.Item label="Date" name="date">
              <Input />
            </Form.Item>
            <Form.Item label="Time" name="time">
              <Input />
            </Form.Item>
            <Form.Item label="Youtube" name="youtube_link">
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
                prefix="events"
                length={eventsLength}
                itemId={itemId}
                afterUpload={afterFileUpload}
                fileUrl={editedValues.image}
              />
            </Form.Item>
          </div>
          <div className="sticky bottom-0 right-0 w-full flex justify-end bg-white">
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
export default React.memo(EventsForm);
