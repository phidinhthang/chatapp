import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import red from "@material-ui/core/colors/red";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    color: red[500],
    marginBottom: theme.spacing(2),
  },
}));

const ErrorMessage = (props) => {
  const classes = useStyles();
  return (
    <Typography className={classes.root} component={"p"} variant={"body2"}>
      {props.errorText ? props.errorText : ""}
    </Typography>
  );
};

export default ErrorMessage;
