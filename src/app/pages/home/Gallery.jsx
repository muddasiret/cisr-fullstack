import { Suspense, lazy, useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInterceptor";
import { Avatar, Button, Image, List, Modal, Typography } from "antd";
const { Title } = Typography;

const GalleryForm = lazy(() => import("./GallleryForm"));

const Gallery = () => {
  const [Gallery, setGallery] = useState(null);
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

  function showDeleteModal(Gallery) {
    setIsDeleteModalOpen(Gallery);
  }

  function deleteGallery() {
    setIsDeleting(true);
    axiosInstance
      .post("/api/gallery-delete", isDeleteModalOpen)
      .then((response) => {
        setGallery(response.data.allGallery);
        setIsDeleteModalOpen(false);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  function fetchGallery() {
    axiosInstance
      .get("/api/gallery")
      .then((response) => {
        setGallery(response.data.allGallery);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  useEffect(() => {
    fetchGallery();
  }, []);

  return (
    <>
      {!!isDeleteModalOpen && (
        <Modal
          title={"Are you sure you want to delete?"}
          open={!!isDeleteModalOpen}
          onOk={deleteGallery}
          onCancel={() => setIsDeleteModalOpen(false)}
          okText={"Confirm"}
          okButtonProps={{
            loading: isUpdating,
          }}
        >
          Confirm delete of Gallery "
          <i>
            <b>{isDeleteModalOpen.title}</b>
          </i>
          ""
        </Modal>
      )}
      {isModalOpen && (
        <Modal
          title="Edit Gallery"
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
              <GalleryForm
                defaultValues={formValues}
                setGallery={setGallery}
                handleCancel={handleCancel}
                setIsUpdating={setIsUpdating}
                isUpdating={isUpdating}
                GalleryLength={Gallery.length}
              />
            </Suspense>
          </div>
        </Modal>
      )}
      <div>
        <div className="flex items-center justify-between mb-0">
          <Title className="m-0" level={5}>
            Image Gallery
          </Title>
          <Button onClick={() => showModal({})} type="primary">
            Add Images
          </Button>
        </div>
        <List className="mt-4">
          {Gallery?.map((item) => {
            let subtitleFormatted =
              item?.subtitle?.length > 60
                ? item?.subtitle?.slice(0, 60) + "...."
                : item?.subtitle;
            return (
              <List.Item
                className="bg-[#d9d9d957] !pr-3 !pl-2 rounded-lg mb-3"
                key={item.id}
              >
                <List.Item.Meta
                  avatar={
                    <Image
                      className=" rounded !h-12 object-contain"
                      width={60}
                      src={item.image}
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

export default Gallery;
