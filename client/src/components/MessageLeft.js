import React from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import grey from "@material-ui/core/colors/grey";
import Avatar from "@material-ui/core/Avatar";
import Img from "../images/placeholder.jpg";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "flex-start",
    flexWrap: "wrap",
    margin: theme.spacing(2, 0, 1, 2),
  },
  text: {
    borderTopLeftRadius: "40px",
    borderTopRightRadius: "40px",
    borderBottomRightRadius: "40px",
    fontSize: "16px",
    backgroundColor: grey[200],
    display: "inline-block",

    height: "auto",
    whiteSpace: "wrap",
    padding: theme.spacing(1),
  },
  content: {
    maxWidth: "60%",
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
  },
  avatar: {
    marginRight: theme.spacing(3),
    marginTop: theme.spacing(2),
  },
}));

const MessageLeft = ({ children, name = "Vô danh", image = null }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Avatar src={image || Img} className={classes.avatar} />
      <div className={classes.content}>
        <div>{name}</div>
        <Paper className={classes.text} elevation={0}>
          {children}
        </Paper>
      </div>
    </div>
  );
};

export default MessageLeft;
