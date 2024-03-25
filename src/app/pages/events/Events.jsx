import { Suspense, lazy, useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInterceptor";
import { Avatar, Button, Image, List, Modal, Typography } from "antd";
const { Title } = Typography;

const EventsForm = lazy(() => import("./EventsForm"));

const Events = () => {
  const [events, setEvents] = useState(null);
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

  function showDeleteModal(events) {
    setIsDeleteModalOpen(events);
  }

  function deleteEvents() {
    setIsDeleting(true);
    axiosInstance
      .post("/api/events-delete", isDeleteModalOpen)
      .then((response) => {
        setEvents(response.data.allEvents);
        setIsDeleteModalOpen(false);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  function fetchEvents() {
    axiosInstance
      .get("/api/events")
      .then((response) => {
        setEvents(response.data.allEvents);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <>
      {!!isDeleteModalOpen && (
        <Modal
          title={"Are you sure you want to delete?"}
          open={!!isDeleteModalOpen}
          onOk={deleteEvents}
          onCancel={() => setIsDeleteModalOpen(false)}
          okText={"Confirm"}
          okButtonProps={{
            loading: isUpdating,
          }}
        >
          Confirm delete of events "
          <i>
            <b>{isDeleteModalOpen.title}</b>
          </i>
          ""
        </Modal>
      )}
      {isModalOpen && (
        <Modal
          title="Edit Events"
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
              <EventsForm
                defaultValues={formValues}
                setEvents={setEvents}
                handleCancel={handleCancel}
                setIsUpdating={setIsUpdating}
                isUpdating={isUpdating}
                newsLength={events.length}
              />
            </Suspense>
          </div>
        </Modal>
      )}
      <div>
        <div className="flex items-center justify-between mb-5">
          <Title className="m-0" level={3}>
            Events
          </Title>
          <Button onClick={() => showModal({})} type="primary">
            Add Events
          </Button>
        </div>
        <List>
          {events?.map((item) => {
            let subtitleFormatted =
              item?.description?.length > 60
                ? item?.description?.slice(0, 60) + "...."
                : item?.description;
            return (
              <List.Item key={item.id}>
                <List.Item.Meta
                  avatar={<Image width={60} src={item.image} />}
                  title={<a href="https://ant.design">{item.title}</a>}
                  description={subtitleFormatted}
                />
                <div className="event-datetime">
                  <div>Date: {item.date}</div>
                  <div>Time: {item.time}</div>
                  <div>Location: {item.location}</div>
                </div>

                <div className="flex pl-4">
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

export default Events;
