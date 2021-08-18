import { FormikProps, Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import { FormsData } from "types/forms-data";
import * as Yup from "yup";
import Button from "./button";

import { useRouter } from 'next/router';
import React, { useEffect } from "react";
import AriaLive from "./aria-live";

import { MdDone, MdErrorOutline } from "react-icons/md";
import { NewsletterFormValues } from "types/newsletter-form-values";
import { subscribeToNewsletter } from "@/lib/api";


type NewsletterFormProps = {
  content: FormsData;
};



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

  const router = useRouter();
  const {locale} = router;

  return (
    <div>
      <Formik
        initialValues={{ name: "", email: "" }}
        validationSchema={NewsletterSignupSchema}
        onSubmit={async (values: NewsletterFormValues,
            { setSubmitting }: FormikHelpers<NewsletterFormValues>) => {
          // alert(JSON.stringify(values, null, 2));
          const content = await subscribeToNewsletter(locale, values);
          if (!content) {
            throw new Error("No content");
          }
          setSubmitting(false);
          router.push('thank-you', '', {locale});
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

          
        

        useEffect(() => {
          Object.keys(errors).forEach(fieldName => {
            setFieldTouched(fieldName)
          })
        }, [router])

          return (
              <Form
                onSubmit={handleSubmit}
                className="lg:w-8/12 mx-auto flex flex-col text-left"
              >
                <label htmlFor="name" className={`block mx-4 mt-4 ${(touched.name && errors.name ? `text-error-color` : (touched.name && !errors.name ? `text-green-500` : `text-white`))}`}>
                  {nameLabel}
                </label>
                <div className="flex items-center relative">
                  <Field
                    id="name"
                    name="name"
                    placeholder={namePlaceholderMsg}
                    className={`w-full rounded bg-transparent border border-solid placeholder-gray-300 placeholder-opacity-50 text-center p-2 pl-10 ${(touched.name && errors.name ? `border-error-color focus:border-error-color` : (touched.name && !errors.name ? `border-green-500 focus:border-green-500` : `border-white`))}`}
                  />
                  {touched.name && !errors.name && <MdDone className="absolute left-3 text-green-500" />} {touched.name && errors.name && <MdErrorOutline className="absolute left-3 text-error-color" />}
                </div>
                <ErrorMessage
                  component="span"
                  name="name"
                  className="block text-sm text-error-color mx-4 my-2"
                />
                <label htmlFor="email" className={`block mx-4 mt-4 ${(touched.email && errors.email ? `text-error-color` : (touched.email && !errors.email ? `text-green-500` : `text-white`))}`}>
                  {emailLabel}
                </label>
                <div className="flex items-center relative">
                  <Field
                    id="email"
                    name="email"
                    type="email"
                    placeholder={emailPlaceholderMsg}
                    className={`w-full rounded bg-transparent border border-solid placeholder-gray-300 placeholder-opacity-50 text-center p-2 pl-10 ${(touched.email && errors.email ? `border-error-color focus:border-error-color` : (touched.email && !errors.email ? `border-green-500 focus:border-green-500` : `border-white`))}`}
                  />
                  {touched.email && !errors.email && <MdDone className="absolute left-3 text-green-500" />} {touched.email && errors.email && <MdErrorOutline className="absolute left-3 text-error-color" />}
                </div>
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
