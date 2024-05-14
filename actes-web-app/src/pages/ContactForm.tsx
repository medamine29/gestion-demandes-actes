import React, { ReactNode } from "react";
import { Contact } from "../data/interfaces.ts";
import { FormikHelpers, useFormik } from "formik"
import TextField from "../components/common/TextField.tsx"
import { contactFormSchema } from "../data/validations.tsx";
import Button from "../components/common/Button.tsx"
import { CgProfile } from "react-icons/cg";
import { MdOutlineEmail } from "react-icons/md";
import { FaPhone } from "react-icons/fa";
import { twMerge } from "tailwind-merge";
import classNames from "classnames";
import { useSendMessageMutation } from "../store/index.ts";


const ContactForm = () => {

  const [sendMessage] = useSendMessageMutation();

  const handleSubmitForm = async (values: Partial<Contact>, actions: FormikHelpers<Partial<Contact>>) => {
    const validValues = values as Required<Contact>
    await sendMessage(validValues)
  }

  const { values, errors, touched, isSubmitting, handleBlur, handleChange, handleSubmit } = useFormik<Partial<Contact>>({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      content: ''
    },
    validationSchema: contactFormSchema,
    onSubmit: handleSubmitForm
  })

  const inputContainerClasses = twMerge(
    classNames('w-full relative flex flex-col p-2 bg-gray-100 gap-1 h-32 rounded col-span-1 md:col-span-2 row-span-1 md:row-span-2', {
      'border border-red-700 mb-8': errors.content && touched.content
    })
  )
  const errorMessageClasses = classNames('text-sm text-red-700')

  return (  
    <div className="flex flex-col items-center gap-2 w-4/5 md:w-3/5 bg-white p-8">
      <form
        onSubmit={handleSubmit}
        className="w-full grid grid-cols-1 md:grid-cols-2 gap-2 items-center p-2 items-stretch"
      >

        <TextField
          id="lastName"
          value={values.lastName || ''}
          onChange={handleChange}
          onBlur={handleBlur}
          touched={touched}
          errors={errors}
          label="Nom"
          placeholder="Saisir votre nom"
          info="Veuillez renseigner votre nom."
          labelIcon={CgProfile}
        />

        <TextField
          id="firstName"
          value={values.firstName || ''}
          onChange={handleChange}
          onBlur={handleBlur}
          touched={touched}
          errors={errors}
          label="Prénom(s)"
          placeholder="Saisir votre prénom(s)"
          info="Veuillez renseigner votre prénom."
          labelIcon={CgProfile}
        />

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
          id="phone"
          value={values.phone || ''}
          onChange={handleChange}
          onBlur={handleBlur}
          touched={touched}
          errors={errors}
          label="Téléphone"
          placeholder="Saisir votre numéro de téléphone"
          info="Veuillez renseigner votre numéero de téléphone."
          labelIcon={FaPhone}
        />

        <div className={inputContainerClasses}>
          <div className="flex flex-col gap-2">
            <div className="font-semibold">
              Message
            </div>
            <textarea
              id="content"
              value={values.content}
              onChange={handleChange}
              className="h-20 rounded bg-white/60 p-2"
              placeholder="comment nous pouvons vous aider ?"
            />
          </div>

          { errors.content && touched.content && <div className={errorMessageClasses}> { errors.content as ReactNode } </div> }
        </div>

      </form>

      <Button
        className="justify-center py-2 px-8 bg-green-900 w-full rounded text-white"
        disabled={isSubmitting}
        type="submit"
        onClick={handleSubmit}
      >
        Envoyer
      </Button>
    </div>
  );
}
 
export default ContactForm;