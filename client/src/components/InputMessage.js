import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import SendIcon from "@material-ui/icons/Send";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    height: "10%",
    margin: theme.spacing(1, 2),
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

const InputMessage = ({ handleChange, handleSubmit, value }) => {
  const classes = useStyles();

  return (
    <Paper
      component="form"
      onSubmit={handleSubmit}
      className={classes.root}
      elevation={3}
    >
      <InputBase
        className={classes.input}
        placeholder="Nhập nội dung chat"
        value={value}
        onChange={handleChange}
      />
      <Divider className={classes.divider} orientation="vertical" />
      <IconButton
        color="primary"
        className={classes.iconButton}
        aria-label="directions"
        type={"submit"}
      >
        <SendIcon />
      </IconButton>
    </Paper>
  );
};

export default InputMessage;
