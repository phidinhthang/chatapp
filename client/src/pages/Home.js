import React, { useEffect, useState, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import socketIOClient from "socket.io-client";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { CssBaseline } from "@material-ui/core";
import InputMessage from "../components/InputMessage";
import MessageContainer from "../components/MessageContainer";
import MessageLeft from "../components/MessageLeft";
import MessageRight from "../components/MessageRight";
import FriendPane from "../components/FriendPane";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    margin: theme.spacing(2),
    maxWidth: "100%",
    height: "85vh",
  },
  container: {
    height: "100%",
    "& > *": {
      height: "100%",
    },
    padding: "0",
  },
  relative: {
    position: "relative",
  },
  panes: {
    width: "100%",
    maxWidth: 360,
    padding: "0",
    backgroundColor: theme.palette.background.paper,
  },
}));

const socket = socketIOClient();

const Home = (props) => {
  const classes = useStyles();
  const { userId } = useSelector((state) => state.login);
  const [user, setUser] = useState({
    name: "",
    _id: null,
  });
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState({ name: "", text: "" });
  const messagesRef = useRef(messages);
  const messageRef = useRef(message);
  const messageContainerRef = useRef(null);
  useEffect(() => {
    axios({
      url: "/user",
      headers: {
        "x-token": userId,
      },
      method: "post",
    })
      .then((response) => {
        return response.data.user;
      })
      .then((userResponse) => {
        console.log(userResponse);
        setUser((user) => ({
          ...user,
          name: userResponse.name,
          _id: userResponse._id,
        }));
        console.log(user);
      });
  }, []);
  useEffect(() => {
    messageContainerRef.current.scrollTo(
      0,
      messageContainerRef.current.scrollHeight
    );
  }, [messages]);
  useEffect(() => {
    socket.on("receive-message", (data) => {
      setMessages((messages) => [...messages, data]);
    });
    socket.on("users", (users) => {
      console.log(users, "Tat ca users");
      setUsers(users);
    });
    return () => socket.emit("offline", user);
  }, []);
  useEffect(() => {
    if (user._id) {
      socket.emit("online", user);
    }
    console.log(user, "djfksdjkf");
  }, [user]);
  const handleChange = (e) => {
    setMessage({ name: user.name, text: e.target.value });
    console.log(message);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setMessages((messages) => [...messages, message]);
    socket.emit("send-message", message);
    setMessage((message) => ({ ...message, text: "" }));
    console.log(messages);
  };
  console.log(messages);
  return (
    <div>
      <CssBaseline />
      <Paper className={classes.root}>
        <Container>
          <Grid container className={classes.container}>
            <Grid item xs={3}>
              {users.map((userItem, idx) =>
                userItem.user._id != user._id ? (
                  <FriendPane key={idx} name={userItem.user.name} />
                ) : null
              )}
            </Grid>
            <Grid item xs={6} className={classes.relative}>
              <MessageContainer ref={messageContainerRef}>
                {messages.map((message, idx) =>
                  message.name == user.name ? (
                    <MessageRight name={"Bạn"} key={idx}>
                      {message.text}
                    </MessageRight>
                  ) : (
                    <MessageLeft name={message.name} key={idx}>
                      {message.text}
                    </MessageLeft>
                  )
                )}
              </MessageContainer>
              <InputMessage
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                value={message.text}
              />
            </Grid>
            <Grid item xs={3}></Grid>
          </Grid>
        </Container>
      </Paper>
    </div>
  );
};

export default Home;
