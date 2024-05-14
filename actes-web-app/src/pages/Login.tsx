import { FormikHelpers, useFormik } from "formik";
import React, { ReactNode } from "react";
import { Admin } from "../data/interfaces.ts";
import { loginSchema } from "../data/validations.tsx";
import Button from "../components/common/Button.tsx";
import TextField from "../components/common/TextField.tsx";
import { MdOutlineEmail, MdLockOutline } from "react-icons/md";
import { login, useTypedDispatch, useTypedSelector } from "../store/index.ts";
import { Navigate, useNavigate } from 'react-router-dom';
import { useSnackbar } from 'react-simple-snackbar'

const Login = () => {

  const navigate = useNavigate()
  const dispatch = useTypedDispatch()
  const [openSnackbar] = useSnackbar()

  const snackBarContent: ReactNode = (
    <div className="underline decoration-red-700">
      Identifiants non valides
    </div>
  )
  
  const handleSubmitForm = async (values: Partial<Admin>, actions: FormikHelpers<Partial<Admin>>) => {
    const validValues = values as Required<Admin>
    try {
      await dispatch(login(validValues)).unwrap()
      navigate('/dashboard');
    } catch (error) {
      openSnackbar(snackBarContent, 2500)
    }
    
  }

  const { values, errors, touched, isSubmitting, handleBlur, handleChange, handleSubmit, setTouched } = useFormik<Partial<Admin>>({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: loginSchema,
    onSubmit: handleSubmitForm
  })

  return (  
    <div className="w-4/5 md:w-3/5 bg-white p-8 m-4 flex flex-col items-center gap-2">
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col gap-2 items-center"
      >

        <TextField
          id="email"
          value={values.email || ''}
          onChange={handleChange}
          onBlur={handleBlur}
          touched={touched}
          errors={errors}
          label="e-mail"
          placeholder="Saisir votre e-mail"
          info="Veuillez renseigner votre e-mail."
          labelIcon={MdOutlineEmail}
        />

        <TextField
          id="password"
          value={values.password || ''}
          onChange={handleChange}
          onBlur={handleBlur}
          touched={touched}
          errors={errors}
          label="Mot de passe"
          placeholder="Saisir votre mot de passe"
          labelIcon={MdLockOutline}
          hideable
        />

      </form>

      <Button
        className="justify-center py-2 bg-green-900 w-full rounded text-white"
        disabled={isSubmitting}
        type="submit"
        onClick={handleSubmit}
      >
        Se connecter
      </Button>
    </div>
  );
}

const LoginWrapper = () => {

  const token = useTypedSelector((state) => state.auth.token)

  // if online redirect to dashboard
  if (token) {
    return <Navigate to="/dashboard" />;
  }

  // If not authenticated, render the login page
  return <Login />;
}

export default LoginWrapper;