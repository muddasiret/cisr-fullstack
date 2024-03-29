import { Suspense, lazy, useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInterceptor";
import { Avatar, Button, Image, List, Modal, Typography } from "antd";
const { Title } = Typography;

const PaperForm = lazy(() => import("./PaperForm"));

const Paper = () => {
  const [paper, setPaper] = useState(null);
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

  function showDeleteModal(paper) {
    setIsDeleteModalOpen(paper);
  }

  function deletePaper() {
    setIsDeleting(true);
    axiosInstance
      .post("/api/paper-delete", isDeleteModalOpen)
      .then((response) => {
        setPaper(response.data.allPaper);
        setIsDeleteModalOpen(false);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  function fetchPaper() {
    axiosInstance
      .get("/api/paper")
      .then((response) => {
        setPaper(response.data.allPaper);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  useEffect(() => {
    fetchPaper();
  }, []);

  return (
    <>
      {!!isDeleteModalOpen && (
        <Modal
          title={"Are you sure you want to delete?"}
          open={!!isDeleteModalOpen}
          onOk={deletePaper}
          onCancel={() => setIsDeleteModalOpen(false)}
          okText={"Confirm"}
          okButtonProps={{
            loading: isUpdating,
          }}
        >
          Confirm delete of paper "
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
          title="Edit Paper"
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
              <PaperForm
                defaultValues={formValues}
                setPaper={setPaper}
                handleCancel={handleCancel}
                setIsUpdating={setIsUpdating}
                isUpdating={isUpdating}
                paperLength={paper.length}
              />
            </Suspense>
          </div>
        </Modal>
      )}
      <div>
        <div className="flex items-center justify-between mb-5">
          <Title className="m-0" level={3}>
            Paper
          </Title>
          <Button onClick={() => showModal({})} type="primary">
            Add Paper
          </Button>
        </div>
        <List>
          {paper?.map((item) => {
            return (
              <List.Item
                className="bg-[#d9d9d957] !pr-3 !pl-2 rounded-lg mb-3"
                key={item.id}
              >
                <List.Item.Meta
                  avatar={
                    <Image className=" rounded" width={60} src={item.image} />
                  }
                  title={
                    <a target="_blank" href={item.pdf}>
                      {item.title}
                    </a>
                  }
                  description={item.author}
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

export default Paper;
