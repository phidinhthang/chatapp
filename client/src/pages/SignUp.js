import React from "react";
import { Link as RouterLink } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../actions/signup";
import ErrorMessage from "./ErrorMessage";

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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.signup);
  const classes = useStyles();
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(6, "Tên phải bao gồm ít nhất 6 kí tự")
      .required("Tên không được bỏ trống"),
    email: Yup.string()
      .email("Email không hợp lệ")
      .required("Email không được bỏ trống"),
    password: Yup.string()
      .min(6, "Mật khẩu phải bao gồm ít nhất 6 kí tự")
      .required("Mật khẩu không được bỏ trống"),
    confirmPassword: Yup.string()
      .required("Xác nhận mật khẩu không được bỏ trống")
      .oneOf([Yup.ref("password")], "Xác nhận mật khẩu không đúng"),
  });
  const onSubmit = (values, {}) => {
    console.log(values);
    dispatch(
      signup({
        name: values.name,
        email: values.email,
        password: values.password,
      })
    );
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Đăng kí
        </Typography>
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(props) => (
            <Form className={classes.form}>
              <ErrorMessage errorText={error} />
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Field name="name">
                    {({ field, form: { touched, errors } }) => (
                      <TextField
                        variant="outlined"
                        error={Boolean(touched.name && errors.name)}
                        helperText={
                          errors.name && touched.name && String(errors.name)
                        }
                        fullWidth
                        label="Tên tài khoản"
                        {...field}
                      />
                    )}
                  </Field>
                </Grid>
                <Grid item xs={12}>
                  <Field name="email">
                    {({ field, form: { touched, errors } }) => (
                      <TextField
                        variant="outlined"
                        error={Boolean(touched.email && errors.email)}
                        helperText={
                          errors.email && touched.email && String(errors.email)
                        }
                        fullWidth
                        label="Email"
                        {...field}
                      />
                    )}
                  </Field>
                </Grid>
                <Grid item xs={12}>
                  <Field name="password">
                    {({ field, form: { touched, errors } }) => (
                      <TextField
                        variant="outlined"
                        error={Boolean(touched.password && errors.password)}
                        helperText={
                          errors.password &&
                          touched.password &&
                          String(errors.password)
                        }
                        fullWidth
                        label="Mật khẩu"
                        {...field}
                      />
                    )}
                  </Field>
                </Grid>
                <Grid item xs={12}>
                  <Field name="confirmPassword">
                    {({ field, form: { touched, errors } }) => (
                      <TextField
                        variant="outlined"
                        error={Boolean(
                          touched.confirmPassword && errors.confirmPassword
                        )}
                        helperText={
                          errors.confirmPassword &&
                          touched.confirmPassword &&
                          String(errors.confirmPassword)
                        }
                        fullWidth
                        label="Xác nhận mật khẩu"
                        {...field}
                      />
                    )}
                  </Field>
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Đăng kí
              </Button>
              <Grid container justify="flex-end">
                <Grid item>
                  <Link component={RouterLink} to="/login" variant="body2">
                    Đã có tài khoản ? Đăng nhập
                  </Link>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </div>
      <Box mt={3}>
        <Copyright />
      </Box>
    </Container>
  );
}
