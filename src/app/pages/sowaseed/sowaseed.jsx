import { Suspense, lazy, useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInterceptor";
import { Button, Image, List, Modal, Typography } from "antd";
const { Title } = Typography;

const SowaseedForm = lazy(() => import("./SowaseedForm"));

const Sowaseed = () => {
  const [sowaseed, setSowaseed] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [formValues, setFormValues] = useState({});

  const showModal = (item) => {
    setFormValues({ ...item });
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsUpdating(false);
    setIsModalOpen(false);
  };

  function showDeleteModal(sowaseed) {
    setIsDeleteModalOpen(sowaseed);
  }

  function deleteSowaseed() {
    setIsDeleting(true);
    axiosInstance
      .post("/api/sowaseed-delete", isDeleteModalOpen)
      .then((response) => {
        setSowaseed(response.data.allSowaseed);
        setIsDeleteModalOpen(false);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  function fetchSowaseed() {
    axiosInstance
      .get("/api/sowaseed")
      .then((response) => {
        setSowaseed(response.data.allSowaseed);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  useEffect(() => {
    fetchSowaseed();
  }, []);

  return (
    <>
      {!!isDeleteModalOpen && (
        <Modal
          title={"Are you sure you want to delete?"}
          open={!!isDeleteModalOpen}
          onOk={deleteSowaseed}
          onCancel={() => setIsDeleteModalOpen(false)}
          okText={"Confirm"}
          okButtonProps={{
            loading: isUpdating,
          }}
        >
          Confirm delete of sowaseed "
          <i>
            <b>{isDeleteModalOpen.title}</b>
          </i>
          ""
        </Modal>
      )}
      {isModalOpen && (
        <Modal
          width={600}
          style={{ height: "90vh" }}
          title="Edit Sowaseed"
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
              <SowaseedForm
                defaultValues={formValues}
                setSowaseed={setSowaseed}
                handleCancel={handleCancel}
                setIsUpdating={setIsUpdating}
                isUpdating={isUpdating}
                sowaseedLength={sowaseed.length}
              />
            </Suspense>
          </div>
        </Modal>
      )}
      <div>
        <div className="flex items-center justify-between mb-5">
          <Title className="m-0" level={3}>
            Sowaseed
          </Title>
          <Button onClick={() => showModal({})} type="primary">
            Add Day event
          </Button>
        </div>
        <List>
          {sowaseed?.map((item) => {
            return (
              <List.Item
                className="bg-[#d9d9d957] !pr-3 !pl-2 rounded-lg mb-3"
                key={item.id}
              >
                <List.Item.Meta
                  avatar={
                    <Image className=" rounded" width={60} src={item.image} />
                  }
                  title={<a href="https://ant.design">{item.title}</a>}
                  description={
                    <div
                      dangerouslySetInnerHTML={{ __html: item.description }}
                    />
                  }
                />
                <div className="flex">
                  <Button
                    onClick={() => showModal(item)}
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

export default Sowaseed;
