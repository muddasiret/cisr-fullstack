import React from "react";
import { List, ListItemText, ListItemButton } from "@mui/material";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { routes } from "../constants";

function Sidebar({ onClose }) {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <List>
      {routes.map((route) => {
        const { title, path } = route;
        return (
          <ListItemButton
            selected={currentPath === path}
            component={Link}
            to={path}
            onClick={onClose}
            style={{ border: "1px solid #c4c2c2", margin: 5, borderRadius: 5 }}
          >
            <ListItemText primary={title} />
          </ListItemButton>
        );
      })}
    </List>
  );
}

export default Sidebar;
