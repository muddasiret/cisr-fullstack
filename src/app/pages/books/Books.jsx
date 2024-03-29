import { Suspense, lazy, useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInterceptor";
import { Button, Image, List, Modal, Typography } from "antd";
const { Title } = Typography;

const BooksForm = lazy(() => import("./BooksForm"));

const Books = () => {
  const [books, setBooks] = useState(null);
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

  function showDeleteModal(books) {
    setIsDeleteModalOpen(books);
  }

  function deleteBooks() {
    setIsDeleting(true);
    axiosInstance
      .post("/api/books-delete", isDeleteModalOpen)
      .then((response) => {
        setBooks(response.data.allBooks);
        setIsDeleteModalOpen(false);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  function fetchBooks() {
    axiosInstance
      .get("/api/books")
      .then((response) => {
        setBooks(response.data.allBooks);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <>
      {!!isDeleteModalOpen && (
        <Modal
          title={"Are you sure you want to delete?"}
          open={!!isDeleteModalOpen}
          onOk={deleteBooks}
          onCancel={() => setIsDeleteModalOpen(false)}
          okText={"Confirm"}
          okButtonProps={{
            loading: isUpdating,
          }}
        >
          Confirm delete of books "
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
          title="Edit Books"
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
              <BooksForm
                defaultValues={formValues}
                setBooks={setBooks}
                handleCancel={handleCancel}
                setIsUpdating={setIsUpdating}
                isUpdating={isUpdating}
                booksLength={books.length}
              />
            </Suspense>
          </div>
        </Modal>
      )}
      <div>
        <div className="flex items-center justify-between mb-5">
          <Title className="m-0" level={3}>
            Books
          </Title>
          <Button onClick={() => showModal({})} type="primary">
            Add Books
          </Button>
        </div>
        <List>
          {books?.map((item) => {
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

export default Books;
