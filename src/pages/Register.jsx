import React from "react";

import blokPng from "../assets/blok.png";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { AuthContext } from "../context/AuthContextProvider";
import loadingGif from "../assets/loading.gif";
import googlePng from "../assets/google.png";
import {
  Avatar,
  Box,
  Button,
  CssBaseline,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { useContext } from "react";
import { createUser, signInWithGoogle } from "../utils/firebaseConfig";

const styles = {
  root: {
    "& .MuiPaper-root": {
      borderRadius: "10px",
      boxShadow: "10px 10px 5px 0px rgba(0,0,0,0.75);",
      height: "fit-content",
      marginTop: 10,
      maxWidth: "500px",
    },
  },
  image: {
    backgroundImage: "url(https://picsum.photos/1600/900)",
    backgroundRepeat: "no-repeat",
    backgroundColor: grey[50],
    backgroundSize: "cover",
    backgroundPosition: "center",
    width: "100%",
    paddingTop: "40px",
  },
  paper: {
    padding: 4,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    width: 200,
    height: 200,
    backgroundColor: "#046582",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: 1,
  },
  submit: {
    marginTop: 3,
    backgroundColor: "#046582",
    color: "white",
    fontWeight: "bold",
  },
  header: {
    fontFamily: "Girassol",
    textAlign: "center",
    color: "#046582",
  },
  loadingGif: {
    width: 75,
  },
  loadingContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },
  bottomLink: {
    display: "flex",
    justifyContent: "space-evenly",
  },
  googleImg: {
    width: 75,
    marginLeft: 10,
  },
  googleBtn: {
    backgroundColor: "white",
    color: "#046582",
    fontWeight: "bold",
    marginTop: 3,
    "&:hover": {
      backgroundColor: "white",
    },
  },
};

const Register = () => {
  const navigate = useNavigate();
  const { loading, setCurrentUser } = useContext(AuthContext);

  const validationSchema = yup.object({
    email: yup
      .string("Enter your email")
      .email("Email is invalid.")
      .min(2, "email should be of minimum 2 characters length.")
      .required("email is required"),
    password: yup
      .string("Enter your password")
      .required("Password is required"),
  });

  const handleGoogleProvider = () => {
    signInWithGoogle();
    navigate("/");
  };

  return (
    <Grid container component="main" sx={styles.root}>
      <CssBaseline />
      <Grid container justifyContent="center" sx={styles.image}>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box sx={styles.paper}>
            <Avatar sx={styles.avatar}>
              <img src={blokPng} style={{ width: 200 }} alt="candela" />
            </Avatar>
            <Typography sx={styles.header} component="h1" variant="h5">
              ── Register ──
            </Typography>

            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={validationSchema}
              onSubmit={(values, actions) => {
                console.log(values.email, values.password);
                const displayName = values.email.split("@")[0];
                createUser(
                  values.email,
                  values.password,
                  navigate,
                  displayName
                );
                setCurrentUser([values.email, displayName]);
                actions.resetForm();
                actions.setSubmitting(false);
              }}
            >
              {({
                values,
                isSubmitting,
                handleChange,
                handleBlur,
                touched,
                errors,
              }) => (
                <Form sx={styles.form}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    autoComplete="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoFocus
                    value={values.email}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.password && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
                  />
                  {loading ? (
                    <div sx={styles.loadingContainer}>
                      <img
                        src={loadingGif}
                        alt="Loading"
                        sx={styles.loadingGif}
                      />
                    </div>
                  ) : (
                    <>
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={styles.submit}
                      >
                        Register
                      </Button>
                      <Button
                        fullWidth
                        variant="contained"
                        onClick={handleGoogleProvider}
                        sx={styles.googleBtn}
                      >
                        With{" "}
                        <img
                          src={googlePng}
                          alt="google"
                          style={styles.googleImg}
                        />
                      </Button>
                    </>
                  )}
                </Form>
              )}
            </Formik>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Register;
