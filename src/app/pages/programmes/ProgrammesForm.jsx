import React, { useState } from "react";
import { Button, Form, Input, Select, Space, Divider, Tooltip } from "antd";
import axiosInstance from "../../utils/axiosInterceptor";
import FileUpload from "../../components/FileUpload";
import QuillEditor from "../../components/QuillEditor";
import { useHistory } from "react-router-dom";
import { DeleteOutlined } from "@ant-design/icons";

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const ProgrammesForm = ({
  defaultValues = {},
  setProgrammes,
  handleCancel,
  setIsUpdating,
  isUpdating,
  programmesLength = 0,
  faculty,
}) => {
  const history = useHistory();
  console.log(defaultValues);
  const [editedValues, setEditedValues] = useState(defaultValues);
  const [howtoapply, setHowtoapply] = useState(defaultValues.howtoapply || []);
  const [syllabus, setSyllabus] = useState(defaultValues.syllabus || []);
  const itemId = defaultValues.id ? defaultValues.id : programmesLength + 1;
  const options = faculty?.map(({ name, image, id, designation }) => {
    return { label: name, image, value: id, designation };
  });

  const [form] = Form.useForm();

  async function submitForm() {
    setIsUpdating(true);
    let res;
    const facultyAdded = faculty?.filter(({ id }) => {
      return editedValues?.faculty?.includes(id);
    });
    console.log({
      ...editedValues,
      howtoapply: howtoapply,
      syllabus: syllabus,
      faculty: facultyAdded,
    });
    console.log(defaultValues);
    if (Object.keys(defaultValues).length !== 1) {
      res = await axiosInstance.put("/api/programmes-update", {
        ...defaultValues,
        ...editedValues,
        faculty: facultyAdded,
        howtoapply: howtoapply,
        syllabus: syllabus,
      });
    } else {
      res = await axiosInstance.post("/api/programmes-update", {
        ...defaultValues,
        ...editedValues,
        faculty: facultyAdded,
        howtoapply: howtoapply,
        syllabus: syllabus,
      });
    }
    if (res?.data) {
      setProgrammes(res.data.allProgrammes);
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

  function onhowtoApplyChange(index, value) {
    let arr = [...howtoapply];
    arr[index] = value;
    setHowtoapply(arr);
  }
  function onSyllabusChange(index, value) {
    let arr = [...syllabus];
    arr[index] = value;
    setSyllabus(arr);
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
          faculty: defaultValues?.faculty?.map(({ id }) => id),
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
            <Form.Item label="Type" name={"type"}>
              <Select
                defaultValue="Academic"
                style={{
                  width: 150,
                }}
                options={[
                  {
                    value: "Academic",
                    label: "Academic",
                  },
                  {
                    value: "Semi-academic",
                    label: "Semi-academic",
                  },
                ]}
              />
            </Form.Item>
            <Form.Item label="Youtube Link" name={"youtube_link"}>
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
                prefix="programmes"
                length={programmesLength}
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
              label={`FACULTY (if not in list, Add by clicking "Add FACULTY" button)`}
              name="faculty"
            >
              <Select
                mode="multiple"
                style={{
                  width: "100%",
                }}
                placeholder="select faculty members"
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
                history.push("/faculties");
              }}
            >
              Add New FACULTY members
            </Button>
            <Divider />
            <div>
              <h3>How to apply</h3>
              {howtoapply?.map((item, index) => {
                return (
                  <>
                    <div
                      className=" rounded-lg"
                      style={{
                        padding: "5px 10px",
                        border: "1px solid #cfcdcd",
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="mr-2 mt-1 font-normal">
                          ITEM {index + 1}
                        </h3>
                        <Tooltip placement="top" title={"Delete item"} arrow>
                          <Button
                            size="small"
                            type="primary"
                            danger
                            className=" relative top-[-10px]"
                            onClick={() => {
                              let arr = [...howtoapply];
                              arr.splice(index, 1);
                              setHowtoapply(arr);
                            }}
                          >
                            <DeleteOutlined />
                            Remove
                          </Button>
                        </Tooltip>
                      </div>
                      <div className="mb-2" key={index}>
                        <label>Title</label>
                        <Input
                          className="mb-2"
                          value={item.title}
                          onChange={(e) =>
                            onhowtoApplyChange(index, {
                              ...item,
                              title: e.target.value,
                            })
                          }
                        />
                        <label>Desc</label>
                        <Input
                          value={item.desc}
                          onChange={(e) =>
                            onhowtoApplyChange(index, {
                              ...item,
                              desc: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                    {index < howtoapply.length - 1 && (
                      <Divider className="mb-0" />
                    )}
                  </>
                );
              })}
              <Button
                className="mt-2"
                type="dashed"
                onClick={() => {
                  setHowtoapply([...howtoapply, { title: "", desc: "" }]);
                }}
              >
                Add "how to apply" Items
              </Button>
              <Divider />
              <h3>Syllabus</h3>
              {console.log(syllabus)}
              {syllabus?.map((item, index) => {
                return (
                  <>
                    <div className="flex items-center">
                      <h3 className="mr-2 font-normal">ITEM {index + 1}</h3>
                      <Tooltip placement="top" title={"Delete item"} arrow>
                        <Button
                          size="small"
                          type="primary"
                          danger
                          onClick={() => {
                            let arr = [...syllabus];
                            arr.splice(index, 1);
                            setSyllabus(arr);
                          }}
                        >
                          <DeleteOutlined />
                        </Button>
                      </Tooltip>
                    </div>

                    <div className="mb-2" key={index}>
                      <label>Title</label>
                      <Input
                        className="mb-2"
                        value={item.title}
                        onChange={(e) =>
                          onSyllabusChange(index, {
                            ...item,
                            title: e.target.value,
                          })
                        }
                      />
                      <label>Desc</label>
                      <Input
                        value={item.desc}
                        onChange={(e) =>
                          onSyllabusChange(index, {
                            ...item,
                            desc: e.target.value,
                          })
                        }
                      />
                    </div>
                    {index < syllabus.length - 1 && (
                      <Divider className="mb-0" />
                    )}
                  </>
                );
              })}
              <Button
                onClick={() => {
                  setSyllabus([...syllabus, { title: "", desc: "" }]);
                }}
              >
                Add "syllabus" Items
              </Button>
            </div>
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
export default React.memo(ProgrammesForm);
