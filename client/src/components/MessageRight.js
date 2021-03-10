import React from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import blue from "@material-ui/core/colors/blue";
import Avatar from "@material-ui/core/Avatar";
import Img from "../images/placeholder.jpg";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "flex-start",
    flexWrap: "wrap",
    justifyContent: "flex-end",
    margin: theme.spacing(2, 0, 1, 2),
  },
  text: {
    borderTopLeftRadius: "40px",
    borderTopRightRadius: "40px",
    borderBottomLeftRadius: "40px",
    fontSize: "16px",
    backgroundColor: blue[500],
    color: "white",
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
    alignItems: "flex-end",
  },
  avatar: {
    marginLeft: theme.spacing(2),
    marginTop: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
}));

const MessageRight = ({ children, name = "Vô danh", image = null }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <div>{name}</div>
        <Paper className={classes.text} elevation={0}>
          {children}
        </Paper>
      </div>
      <Avatar src={image || Img} className={classes.avatar} />
    </div>
  );
};

export default MessageRight;
