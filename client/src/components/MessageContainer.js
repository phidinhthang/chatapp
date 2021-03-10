import React from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "450px",
    overflowX: "hidden",
    margin: theme.spacing(2),
    marginTop: theme.spacing(1),
    paddingTop: theme.spacing(3),
    "&::-webkit-scrollbar": {
      width: "5px",
    },

    /* Track */
    "&::-webkit-scrollbar-track": {
      background: "#f1f1f1",
    },

    /* Handle */
    "&::-webkit-scrollbar-thumb": {
      background: "#888",
    },

    /* Handle on hover */
    "&::-webkit-scrollbar-thumb:hover": {
      background: "#555",
    },
  },
}));

const MessageContainer = React.forwardRef(({ children }, ref) => {
  const classes = useStyles();
  return (
    <Paper className={classes.root} ref={ref}>
      {children}
    </Paper>
  );
});

export default MessageContainer;
