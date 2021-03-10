import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Img from "../images/placeholder.jpg";

const FriendPane = ({ name }) => {
  return (
    <ListItem button>
      <ListItemAvatar>
        <Avatar src={Img}></Avatar>
      </ListItemAvatar>
      <ListItemText primary={name ? name : "Vo danh"} secondary="Online" />
    </ListItem>
  );
};

export default FriendPane;
