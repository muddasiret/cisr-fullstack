import { Suspense, lazy, useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInterceptor";
import { Avatar, Button, Image, List, Modal, Typography } from "antd";
const { Title } = Typography;

const BottomcardsForm = lazy(() => import("./BottomCardsForm"));

const Bottomcards = () => {
  const [Bottomcards, setBottomcards] = useState(null);
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

  function showDeleteModal(Bottomcards) {
    setIsDeleteModalOpen(Bottomcards);
  }

  function deleteBottomcards() {
    setIsDeleting(true);
    axiosInstance
      .post("/api/bottomcards-delete", isDeleteModalOpen)
      .then((response) => {
        setBottomcards(response.data.allBottomcards);
        setIsDeleteModalOpen(false);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  function fetchBottomcards() {
    axiosInstance
      .get("/api/bottomcards")
      .then((response) => {
        setBottomcards(response.data.allBottomcards);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  useEffect(() => {
    fetchBottomcards();
  }, []);

  return (
    <>
      {!!isDeleteModalOpen && (
        <Modal
          title={"Are you sure you want to delete?"}
          open={!!isDeleteModalOpen}
          onOk={deleteBottomcards}
          onCancel={() => setIsDeleteModalOpen(false)}
          okText={"Confirm"}
          okButtonProps={{
            loading: isUpdating,
          }}
        >
          Confirm delete of Bottomcard "
          <i>
            <b>{isDeleteModalOpen.title}</b>
          </i>
          ""
        </Modal>
      )}
      {isModalOpen && (
        <Modal
          title="Edit Bottomcards"
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
              <BottomcardsForm
                defaultValues={formValues}
                setBottomcards={setBottomcards}
                handleCancel={handleCancel}
                setIsUpdating={setIsUpdating}
                isUpdating={isUpdating}
                BottomcardsLength={Bottomcards.length}
              />
            </Suspense>
          </div>
        </Modal>
      )}
      <div>
        <div className="flex items-center justify-between mb-0">
          <Title className="m-0" level={5}>
            Bottomcards
          </Title>
          <Button onClick={() => showModal({})} type="primary">
            Add bottomcard
          </Button>
        </div>
        <List className="mt-4">
          {Bottomcards?.map((item) => {
            let subtitleFormatted =
              item?.subtitle?.length > 60
                ? item?.subtitle?.slice(0, 60) + "...."
                : item?.subtitle;
            return (
              <List.Item
                className="bg-[#d9d9d957] !pr-3 !pl-2 rounded-lg"
                key={item.id}
              >
                <List.Item.Meta
                  avatar={
                    <Image
                      className=" rounded !h-12 object-contain"
                      width={60}
                      src={
                        item.image
                          ? item.image
                          : "https://png.pngtree.com/png-vector/20190820/ourmid/pngtree-no-image-vector-illustration-isolated-png-image_1694547.jpg"
                      }
                    />
                  }
                  title={<a href="https://ant.design">{item.title}</a>}
                  description={subtitleFormatted}
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

export default Bottomcards;
