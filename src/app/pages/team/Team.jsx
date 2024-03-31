import { Suspense, lazy, useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInterceptor";
import { Button, Image, List, Modal, Typography } from "antd";
const { Title } = Typography;

const TeamForm = lazy(() => import("./TeamForm"));

const Team = () => {
  const [team, setTeam] = useState(null);
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

  function showDeleteModal(team) {
    setIsDeleteModalOpen(team);
  }

  function deleteTeam() {
    setIsDeleting(true);
    axiosInstance
      .post("/api/team-delete", isDeleteModalOpen)
      .then((response) => {
        setTeam(response.data.allTeam);
        setIsDeleteModalOpen(false);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  function fetchTeam() {
    axiosInstance
      .get("/api/team")
      .then((response) => {
        setTeam(response.data.allTeam);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  useEffect(() => {
    fetchTeam();
  }, []);

  return (
    <>
      {!!isDeleteModalOpen && (
        <Modal
          title={"Are you sure you want to delete?"}
          open={!!isDeleteModalOpen}
          onOk={deleteTeam}
          onCancel={() => setIsDeleteModalOpen(false)}
          okText={"Confirm"}
          okButtonProps={{
            loading: isUpdating,
          }}
        >
          Confirm delete of team "
          <i>
            <b>{isDeleteModalOpen.name}</b>
          </i>
          ""
        </Modal>
      )}
      {isModalOpen && (
        <Modal
          width={600}
          style={{ height: "90vh" }}
          title="Edit Team"
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
              <TeamForm
                defaultValues={formValues}
                setTeam={setTeam}
                handleCancel={handleCancel}
                setIsUpdating={setIsUpdating}
                isUpdating={isUpdating}
                booksLength={team?.length}
              />
            </Suspense>
          </div>
        </Modal>
      )}
      <div>
        <div className="flex items-center justify-between mb-5">
          <Title className="m-0" level={3}>
            Team
          </Title>
          <Button onClick={() => showModal({})} type="primary">
            Add Team
          </Button>
        </div>
        <List>
          {team?.map((item) => {
            return (
              <List.Item
                className="bg-[#d9d9d957] !pr-3 !pl-2 rounded-lg mb-3"
                key={item.id}
              >
                <List.Item.Meta
                  avatar={
                    <Image className=" rounded" width={60} src={item.image} />
                  }
                  title={<a href="https://ant.design">{item.name}</a>}
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
                      showDeleteModal({ id: item.id, name: item.name })
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

export default Team;
