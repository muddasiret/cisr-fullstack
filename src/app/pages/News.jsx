import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInterceptor";
import { Avatar, Button, List, Modal, Typography } from "antd";
import NewsForm from "./NewsForm";
const { Title } = Typography;

const News = () => {
  const [news, setNews] = useState(null);
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

  function showDeleteModal(news) {
    setIsDeleteModalOpen(news);
  }

  function deleteNews() {
    setIsDeleting(true);
    axiosInstance
      .post("/api/news-delete", isDeleteModalOpen)
      .then((response) => {
        setNews(response.data.allNews);
        setIsDeleteModalOpen(false);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  function fetchNews() {
    axiosInstance
      .get("/api/news")
      .then((response) => {
        setNews(response.data.allNews);
        setNews(response.data.allNews);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <>
      {!!isDeleteModalOpen && (
        <Modal
          title={"Are you sure you want to delete?"}
          open={!!isDeleteModalOpen}
          onOk={deleteNews}
          onCancel={() => setIsDeleteModalOpen(false)}
          okText={"Confirm"}
          okButtonProps={{
            loading: isUpdating,
          }}
        >
          Confirm delete of news "
          <i>
            <b>{isDeleteModalOpen.title}</b>
          </i>
          ""
        </Modal>
      )}
      {isModalOpen && (
        <Modal
          title="Edit News"
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
            <NewsForm
              defaultValues={formValues}
              setNews={setNews}
              handleCancel={handleCancel}
              setIsUpdating={setIsUpdating}
              isUpdating={isUpdating}
              newsLength={news.length}
            />
          </div>
        </Modal>
      )}
      <div>
        <div className="flex items-center justify-between mb-5">
          <Title className="m-0" level={3}>
            News
          </Title>
          <Button onClick={() => showModal({})} type="primary">
            Add News
          </Button>
        </div>
        <List>
          {news?.map((item) => {
            let subtitleFormatted =
              item?.description?.length > 60
                ? item?.description?.slice(0, 60) + "...."
                : item?.description;
            return (
              <List.Item key={item.id}>
                <List.Item.Meta
                  avatar={<Avatar src={item.image} />}
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

export default News;
