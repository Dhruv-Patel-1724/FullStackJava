import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  TextField,
  Button,
  Snackbar, //
  Alert, //
  Grid,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../Redux/Auth/auth.action";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");

  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    //
    // Handle form submission here
    try {
      const response = await dispatch(
        loginUser({ data: values, navigate })
      ).unwrap();
      if (!response.success) {
        setErrorMessage("Invalid username or password");
      }
    } catch (error) {
      setErrorMessage("");
    }
    setSubmitting(false);
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="space-y-5">
          <div className="space-y-5">
            <div>
              <Field
                as={TextField}
                name="email"
                placeholder="Email"
                type="email"
                variant="outlined"
                fullWidth
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500"
              />
            </div>
            <div>
              <Field
                as={TextField}
                name="password"
                placeholder="Password"
                type="password"
                variant="outlined"
                fullWidth
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500"
              />
            </div>
          </div>
          <Button
            sx={{ padding: ".8rem 0rem" }}
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
          >
            Login
          </Button>
        </Form>
      </Formik>
      <div className="flex items-center space-x-1 mt-5 justify-center">
        <p>if you don't have account ?</p>
        <Button onClick={() => navigate("/register")} size="small">
          Register
        </Button>
      </div>
      <div className="flex justify-center mt-5">
        <Button
          onClick={() => navigate("/reset-password-req")}
          fullWidth
          variant="outlined"
          sx={{ padding: ".8rem 0rem" }}
        >
          Forgot Password ?
        </Button>
      </div>
      <Snackbar //
        open={!!errorMessage}
        autoHideDuration={4000}
        onClose={() => setErrorMessage("")}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity="error" onClose={() => setErrorMessage("")}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </>
  );
}

export default LoginForm;
