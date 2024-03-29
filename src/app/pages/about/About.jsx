import { Suspense, lazy, useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInterceptor";
import { Button, List, Modal, Typography } from "antd";
const { Title } = Typography;

const AboutForm = lazy(() => import("./AboutForm"));
const VisionMissionForm = lazy(() => import("./VisionMissionForm"));

const About = () => {
  const [about, setAbout] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [formValues, setFormValues] = useState({});
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const showModal = (item) => {
    setFormValues({ ...item });
    setIsModalOpen(true);
  };

  const showModal2 = (item) => {
    setFormValues({ ...item });
    setIsModalOpen2(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    setIsModalOpen2(false);
  };

  const handleCancel = () => {
    setIsUpdating(false);
    setIsModalOpen(false);
    setIsModalOpen2(false);
  };

  function fetchAbout() {
    axiosInstance
      .get("/api/about")
      .then((response) => {
        setAbout(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  useEffect(() => {
    fetchAbout();
  }, []);

  function deleteItem() {
    setIsDeleting(true);
    axiosInstance
      .post("/api/visionmission-delete", isDeleteModalOpen)
      .then((response) => {
        setAbout(response.data);
        setIsDeleteModalOpen(false);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  function showDeleteModal(news) {
    setIsDeleteModalOpen(news);
  }

  return (
    <>
      {!!isDeleteModalOpen && (
        <Modal
          title={"Are you sure you want to delete?"}
          open={!!isDeleteModalOpen}
          onOk={deleteItem}
          onCancel={() => setIsDeleteModalOpen(false)}
          okText={"Confirm"}
          okButtonProps={{
            loading: isUpdating,
          }}
        >
          Confirm delete of "
          <i>
            <b>{isDeleteModalOpen.title}</b>
          </i>
          ""
        </Modal>
      )}
      {isModalOpen2 && (
        <Modal
          width={600}
          style={{ height: "90vh" }}
          title="Edit Item"
          open={isModalOpen2}
          onOk={handleOk}
          onCancel={handleCancel}
          okText={null}
          cancelText={null}
          footer={null}
          okButtonProps={{
            loading: isDeleting,
          }}
        >
          <div className=" max-h-[70vh] overflow-y-auto">
            <Suspense fallback={<div>Loading...</div>}>
              <VisionMissionForm
                defaultValues={formValues}
                setAbout={setAbout}
                handleCancel={handleCancel}
                setIsUpdating={setIsUpdating}
                isUpdating={isUpdating}
              />
            </Suspense>
          </div>
        </Modal>
      )}

      {isModalOpen && (
        <Modal
          width={600}
          style={{ height: "90vh" }}
          title="Edit About"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          okText={null}
          cancelText={null}
          footer={null}
          okButtonProps={{
            loading: isDeleting,
          }}
        >
          <div className=" max-h-[70vh] overflow-y-auto">
            <Suspense fallback={<div>Loading...</div>}>
              <AboutForm
                defaultValues={formValues}
                setAbout={setAbout}
                handleCancel={handleCancel}
                setIsUpdating={setIsUpdating}
                isUpdating={isUpdating}
              />
            </Suspense>
          </div>
        </Modal>
      )}
      <div>
        <div className="flex items-center justify-between mb-5">
          <Title className="m-0" level={3}>
            About
          </Title>
          {about?.about?.length === 0 && (
            <Button onClick={() => showModal({})} type="primary">
              Add About
            </Button>
          )}
        </div>
        <List>
          {about?.about?.map((item) => {
            return (
              <List.Item
                className="bg-[#d9d9d957] !pr-3 !pl-2 rounded-lg mb-3"
                key={item.id}
              >
                <List.Item.Meta
                  title={item.title}
                  description={
                    <div dangerouslySetInnerHTML={{ __html: item.body }} />
                  }
                />
                <div className="flex">
                  <Button
                    onClick={() => showModal(item)}
                    className=" text-black mr-2"
                  >
                    Edit
                  </Button>
                </div>
              </List.Item>
            );
          })}
        </List>

        <Title className="mt-10" level={5}></Title>
        <div className="flex items-center justify-between mb-5">
          <Title className="mt-3 underline" level={5}>
            Vision,mission section
          </Title>
          <Button onClick={() => showModal2({})} type="primary">
            Add Item
          </Button>
        </div>
        <List>
          {about?.visionmission?.map((item) => {
            return (
              <List.Item
                className="bg-[#d9d9d957] !pr-3 !pl-2 rounded-lg mb-3"
                key={item.id}
              >
                <List.Item.Meta
                  title={item.title}
                  description={
                    <div dangerouslySetInnerHTML={{ __html: item.body }} />
                  }
                />
                <div className="flex">
                  <Button
                    onClick={() => showModal2(item)}
                    className=" text-black mr-2"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() =>
                      showDeleteModal({ id: item.id, title: item.title })
                    }
                    danger
                    type="primary"
                  >
                    Delete
                  </Button>
                </div>
              </List.Item>
            );
          })}
        </List>
      </div>
    </>
  );
};

export default About;
