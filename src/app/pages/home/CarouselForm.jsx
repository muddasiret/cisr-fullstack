import { Form, Input } from "antd";
import FileUpload from "../../components/FileUpload";

const CarouselForm = () => {
  function carouselUpload(index) {}
  const [form] = Form.useForm();

  return (
    <div>
      <Form
        className="form-popup flex !flex-row !max-w-full"
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
          //   setEditedValues(form.getFieldsValue());
        }}
        // initialValues={defaultValues}
        onFinish={() => {
          //   submitForm();
        }}
      >
        <div className=" flex-1">
          <Form.Item label="Image-1" valuePropName="fileList" name={"image"}>
            <FileUpload
              name="image"
              prefix="carousel"
              itemId={0}
              afterUpload={() => carouselUpload(0)}
              fileUrl={"editedValues.image"}
            />
          </Form.Item>
          <Form.Item label="Title-1" name={"title-0"}>
            <Input />
          </Form.Item>
          <Form.Item label="Subtitle-1" name={"subtitle-0"}>
            <Input />
          </Form.Item>
        </div>
        <div className=" flex-1">
          <Form.Item label="Image-1" valuePropName="fileList" name={"image-1"}>
            <FileUpload
              name="image"
              prefix="carousel"
              itemId={0}
              afterUpload={() => carouselUpload(0)}
              fileUrl={"editedValues.image"}
            />
          </Form.Item>
          <Form.Item label="Title-2" name={"title-1"}>
            <Input />
          </Form.Item>
          <Form.Item label="Subtitle-2" name={"subtitle-1"}>
            <Input />
          </Form.Item>
        </div>
        <div className=" flex-1 ">
          <Form.Item label="Image-3" valuePropName="fileList" name={"image-2"}>
            <FileUpload
              name="image"
              prefix="carousel"
              itemId={2}
              afterUpload={() => carouselUpload(2)}
              fileUrl={"editedValues.image"}
            />
          </Form.Item>
          <Form.Item label="Title-3" name={"title-2"}>
            <Input />
          </Form.Item>
          <Form.Item label="Subtitle-3" name={"subtitle-2"}>
            <Input />
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};
export default CarouselForm;
