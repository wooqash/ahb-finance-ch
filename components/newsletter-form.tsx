import { FormikProps, Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import { FormsData } from "types/forms-data";
import * as Yup from "yup";
import Button from "./button";

import { useRouter } from 'next/router';
import React, { useEffect } from "react";
import AriaLive from "./aria-live";

type NewsletterFormProps = {
  content: FormsData;
};

interface NewsletterFormValues {
  name: string;
  email: string;
}

const NewsletterForm: React.FC<NewsletterFormProps> = ({ content }) => {
  const {
    nameLabel,
    emailLabel,
    subscribeButtonLabel,
    requiredFieldErrorMsg,
    invalidEmailFormatErrorMsg,
    fieldTooShortErrorMsg,
    fieldTooLongErrorMsg,
    namePlaceholderMsg,
    emailPlaceholderMsg,
  } = content;
  
  const NewsletterSignupSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, fieldTooShortErrorMsg)
      .max(75, fieldTooLongErrorMsg)
      .required(requiredFieldErrorMsg),
    email: Yup.string()
      .email(invalidEmailFormatErrorMsg)
      .required(requiredFieldErrorMsg),
  });

  return (
    <div>
      <Formik
        initialValues={{ name: "", email: "" }}
        validationSchema={NewsletterSignupSchema}
        onSubmit={(values: NewsletterFormValues,
            { setSubmitting }: FormikHelpers<NewsletterFormValues>) => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }}
      >
        {(props: FormikProps<any>) => {
          const {
            values,
            touched,
            errors,
            dirty,
            isSubmitting,
            isValid,
            handleChange,
            handleBlur,
            handleSubmit,
            handleReset,
            setFieldTouched,
          } = props;

          
        const router = useRouter();

        useEffect(() => {
          Object.keys(errors).forEach(fieldName => {
            setFieldTouched(fieldName)
          })
        }, [router])

          return (
              <Form
                onSubmit={handleSubmit}
                className="w-8/12 mx-auto flex flex-col text-left"
              >
                <label htmlFor="name" className={`block mx-4 mt-4 ${(touched.name && errors.name ? `text-error-color` : `text-white`)}`}>
                  {nameLabel}
                </label>
                <Field
                  id="name"
                  name="name"
                  placeholder={namePlaceholderMsg}
                  className={`rounded bg-transparent border border-solid placeholder-gray-300 placeholder-opacity-50 text-center p-2 ${(touched.name && errors.name ? `border-error-color focus:border-error-color` : `border-white`)}`}
                />
                <ErrorMessage
                  component="span"
                  name="name"
                  className="block text-sm text-error-color mx-4 my-2"
                />
                <label htmlFor="email" className={`block mx-4 mt-4 ${(touched.email && errors.email ? `text-error-color` : `text-white`)}`}>
                  {emailLabel}
                </label>
                <Field
                  id="email"
                  name="email"
                  type="email"
                  placeholder={emailPlaceholderMsg}
                  className={`rounded bg-transparent border border-solid placeholder-gray-300 placeholder-opacity-50 text-center p-2 ${(touched.email && errors.email ? `border-error-color focus:border-error-color` : `border-white`)}`}
                />
                <ErrorMessage
                  component="span"
                  name="email"
                  className="block text-sm text-error-color mx-4 my-2"
                />
                <Button type="submit" className="mt-8" ariaDisabled={!(isValid && dirty)}>
                  {subscribeButtonLabel}
                </Button>
                <AriaLive isValid={(isValid && dirty)} validMsg="Naciśnij przycisk Zapisuję się, aby dołączyć do newslettera" invalidMsg="Sprawdź czy wszystkie pola wymagane są uzupełnione i czy zawierają poprawne dane" />
              </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default NewsletterForm;
