import { Suspense, lazy, useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInterceptor";
import { Button, Image, List, Modal, Typography } from "antd";
const { Title } = Typography;

const ProgrammesForm = lazy(() => import("./ProgrammesForm"));

const Programmes = () => {
  const [programmes, setProgrammes] = useState(null);
  const [faculty, setFaculty] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [formValues, setFormValues] = useState({ type: "Academic" });

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

  function showDeleteModal(programmes) {
    setIsDeleteModalOpen(programmes);
  }

  function deleteProgrammes() {
    setIsDeleting(true);
    axiosInstance
      .post("/api/programmes-delete", isDeleteModalOpen)
      .then((response) => {
        setProgrammes(response.data.allProgrammes);
        setIsDeleteModalOpen(false);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  function fetchProgrammes() {
    axiosInstance
      .get("/api/programmes")
      .then((response) => {
        setProgrammes(response.data.allProgrammes);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  useEffect(() => {
    function fetchFaculty() {
      axiosInstance
        .get("/api/faculty")
        .then((response) => {
          setFaculty(response.data.allFaculty);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
    fetchProgrammes();
    fetchFaculty();
  }, []);

  return (
    <>
      {!!isDeleteModalOpen && (
        <Modal
          title={"Are you sure you want to delete?"}
          open={!!isDeleteModalOpen}
          onOk={deleteProgrammes}
          onCancel={() => setIsDeleteModalOpen(false)}
          okText={"Confirm"}
          okButtonProps={{
            loading: isUpdating,
          }}
        >
          Confirm delete of programmes "
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
          title="Edit Programmes"
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
              <ProgrammesForm
                defaultValues={formValues}
                setProgrammes={setProgrammes}
                handleCancel={handleCancel}
                setIsUpdating={setIsUpdating}
                isUpdating={isUpdating}
                booksLength={programmes?.length}
                faculty={faculty}
              />
            </Suspense>
          </div>
        </Modal>
      )}
      <div>
        <div className="flex items-center justify-between mb-5">
          <Title className="m-0" level={3}>
            Programmes
          </Title>
          <Button
            onClick={() => showModal({ type: "Academic" })}
            type="primary"
          >
            Add Programmes
          </Button>
        </div>
        <List>
          {programmes?.map((item) => {
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
                    item.type && (
                      <span>
                        <b>type: </b>
                        {item.type}
                      </span>
                    )
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

export default Programmes;
