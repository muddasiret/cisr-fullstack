import { Box, Modal, Typography } from "@mui/material";
import { useState } from "react";
import EditForm from "./EditForm";

const NewsCard = ({ newsDetails }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "white",
    boxShadow: 24,
    p: 4,
  };

  let imgSrc = "/images/newsdummy.jpeg";
  const { title, id, image, section, subtitle } = newsDetails;
  if (image) {
    imgSrc = image;
  }
  let subtitleFormatted =
    subtitle.length > 60 ? subtitle.slice(0, 60) + "...." : subtitle;

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <EditForm />
        </Box>
      </Modal>
      <div onClick={handleOpen} href={`/news/${id}`}>
        <div className="mt-5 text-left rounded-md bg-white cursor-pointer shadow-lg group card-zoom hover:shadow-2xl">
          <p className="text-left text-md uppercase text-darkred px-4 pt-4 font-bold ">
            {section}
          </p>
          <img src={imgSrc} className="p-4 h-52 newscardimg" />
          <h2 className="text-left roboto-text text-md uppercase text-lightdark px-4 pb-2 leading-6">
            {title}
          </h2>
          <p className="text-left px-4 mb-5 text-xs text-slate-600">
            {subtitleFormatted}
          </p>
        </div>
      </div>
    </>
  );
};

export default NewsCard;
