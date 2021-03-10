import React from "react";
import { Link as RouteLink } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import ErrorMessage from "./ErrorMessage";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/login";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.login);
  const onSubmit = (values, {}) => {
    console.log(values);
    dispatch(login({ email: values.email, password: values.password }));
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email không hợp lệ")
      .required("Email không được bỏ trống"),
    password: Yup.string().required("Mật khẩu không được bỏ trống"),
  });
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Đăng nhập
        </Typography>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(props) => (
            <Form>
              <ErrorMessage errorText={error} />
              <Field name="email">
                {({
                  field, // { name, value, onChange, onBlur }
                  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                }) => (
                  <TextField
                    error={Boolean(errors.email && touched.email)}
                    type="text"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    label="Email"
                    helperText={
                      errors.email && touched.email && String(errors.email)
                    }
                    {...field}
                  />
                )}
              </Field>
              <Field name="password">
                {({
                  field, // { name, value, onChange, onBlur }
                  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                }) => (
                  <TextField
                    type="password"
                    variant="outlined"
                    error={Boolean(errors.password && touched.password)}
                    helperText={
                      errors.password &&
                      touched.password &&
                      String(errors.password)
                    }
                    margin="normal"
                    fullWidth
                    label="Mật khẩu"
                    {...field}
                  />
                )}
              </Field>
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Ghi nhớ"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Đăng nhập
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Quên mật khẩu ?
                  </Link>
                </Grid>
                <Grid item>
                  <Link component={RouteLink} to="/signup" variant="body2">
                    {"Chưa có tài khoản ? Đăng kí"}
                  </Link>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
