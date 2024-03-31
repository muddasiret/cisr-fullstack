import React, { useState } from "react";
import { Button, Form, Input, Select, Space } from "antd";
import axiosInstance from "../../utils/axiosInterceptor";
import FileUpload from "../../components/FileUpload";
import QuillEditor from "../../components/QuillEditor";
import { useHistory } from "react-router-dom";

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const ProjectForm = ({
  defaultValues = {},
  setProject,
  handleCancel,
  setIsUpdating,
  isUpdating,
  projectLength = 0,
  team,
}) => {
  const history = useHistory();
  const [editedValues, setEditedValues] = useState(defaultValues);
  const [itemId, setItemId] = useState(
    defaultValues.id ? defaultValues.id : projectLength + 1
  );
  const options = team?.map(({ name, image, id, designation }) => {
    return { label: name, image, value: id, designation };
  });

  const [form] = Form.useForm();

  async function submitForm() {
    setIsUpdating(true);
    let res;
    const teamAdded = team.filter(({ id }) => {
      return editedValues.team.includes(id);
    });

    if (Object.keys(defaultValues).length !== 0) {
      res = await axiosInstance.put("/api/projects-update", {
        ...defaultValues,
        ...editedValues,
        team: teamAdded,
      });
    } else {
      res = await axiosInstance.post("/api/projects-update", {
        ...defaultValues,
        ...editedValues,
        team: teamAdded,
      });
    }
    if (res?.data) {
      setProject(res.data.allProjects);
      handleCancel();
    }
  }

  const afterFileUpload = (type = "image", url) => {
    setEditedValues({ ...editedValues, [type]: url });
    form.setFieldValue(type, url);
  };

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
          span: 22,
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
        initialValues={{
          ...defaultValues,
          team: defaultValues?.team?.map(({ id }) => id),
        }}
        onFinish={() => {
          submitForm();
        }}
      >
        <div className="relative">
          <div className="mb-4">
            <Form.Item
              label="Name*"
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
            <Form.Item label="Short description" name={"short_description"}>
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
                prefix="project"
                length={projectLength}
                itemId={itemId}
                afterUpload={afterFileUpload}
                fileUrl={editedValues.image}
              />
            </Form.Item>
            <Form.Item label="Description" name="body">
              <QuillEditor
                handleChange={onDescChange}
                value={editedValues.body}
              />
            </Form.Item>
            <Form.Item
              label={`Team (if not in list, Add by clicking "Add Team" button)`}
              name="team"
            >
              <Select
                mode="multiple"
                style={{
                  width: "100%",
                }}
                placeholder="select team members"
                optionLabelProp="label"
                options={options}
                optionRender={(option) => (
                  <Space className="flex">
                    <img src={option.image} />
                    <div>{option.label}</div>
                    <div>{option.designation}</div>
                  </Space>
                )}
              />
            </Form.Item>
            <Button
              danger
              onClick={() => {
                history.push("/team");
              }}
            >
              Add New Team members
            </Button>
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
export default React.memo(ProjectForm);
