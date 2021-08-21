import { useState } from "react";

import {
  FormikProps,
  Formik,
  Form,
  Field,
  ErrorMessage,
  FormikHelpers,
} from "formik";
import { FormsData } from "types/forms-data";
import * as Yup from "yup";
import Button from "./button";

import { useRouter } from "next/router";
import React, { useEffect } from "react";
import AriaLive from "./aria-live";

import { MdDone, MdErrorOutline } from "react-icons/md";
import { NewsletterFormValues } from "types/newsletter-form-values";
import { subscribeToNewsletter, validateReCaptcha } from "@/lib/api";

import { RECAPTCHA_PUBLIC_KEY } from "@/lib/constants";
import { RecaptchaResData } from "types/recaptcha-res-data";
import Spinner from "./spinner";

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
    unhandledExeptionLabel,
  } = content;
  
  const NewsletterSignupSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, fieldTooShortErrorMsg)
      .max(200, fieldTooLongErrorMsg)
      .required(requiredFieldErrorMsg),
    email: Yup.string()
      .email(invalidEmailFormatErrorMsg)
      .required(requiredFieldErrorMsg),
  });

  const router = useRouter();
  const { locale } = router;

  const submitForm = async (
    values: NewsletterFormValues,
    { setSubmitting }: FormikHelpers<NewsletterFormValues>
  ) => {
    onLoading(true);
    grecaptcha.ready(() => {
      grecaptcha
        .execute(RECAPTCHA_PUBLIC_KEY, { action: "newsletter_submit" })
        .then(async(token) => {
          const response = (await validateReCaptcha(token)) as
            | RecaptchaResData
            | undefined;

          // validation NOT OK
          if (!response?.success) {
            onFormError();
            onLoading(false);
            return;
          }
          // validation OK
          successReCaptchaValidation(values);
          setSubmitting(false);
        });
    });
  };

  const successReCaptchaValidation = async (values: NewsletterFormValues) => {
    const subscription = await subscribeToNewsletter(locale, values);
    if (!subscription) {
      onFormError();
      onLoading(false);
      return;
    }
    onLoading(false);
    router.push("thank-you", "", { locale });
  };

  return (
    <div>
      {formIsVisible && <Formik
        initialValues={{ name: "", email: "" }}
        validationSchema={NewsletterSignupSchema}
        onSubmit={submitForm}
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
            setFieldValue,
          } = props;

          useEffect(() => {
            Object.keys(errors).forEach((fieldName) => {
              setFieldTouched(fieldName);
            });
          }, [router]);

          return (
            <Form
              onSubmit={handleSubmit}
              className="lg:w-8/12 mx-auto flex flex-col text-left"
            >
              <label
                htmlFor="name"
                className={`block mx-4 mt-4 ${
                  touched.name && errors.name
                    ? `text-error-color`
                    : touched.name && !errors.name
                    ? `text-green-500`
                    : `text-white`
                }`}
              >
                {nameLabel}
              </label>
              <div className="flex items-center relative">
                <Field
                  id="name"
                  name="name"
                  placeholder={namePlaceholderMsg}
                  className={`w-full rounded bg-transparent border border-solid placeholder-gray-300 placeholder-opacity-50 text-center p-2 pl-10 ${
                    touched.name && errors.name
                      ? `border-error-color focus:border-error-color`
                      : touched.name && !errors.name
                      ? `border-green-500 focus:border-green-500`
                      : `border-white`
                  }`}
                />
                {touched.name && !errors.name && (
                  <MdDone className="absolute left-3 text-green-500" />
                )}{" "}
                {touched.name && errors.name && (
                  <MdErrorOutline className="absolute left-3 text-error-color" />
                )}
              </div>
              <ErrorMessage
                component="span"
                name="name"
                className="block text-sm text-error-color mx-4 my-2"
              />
              <label
                htmlFor="email"
                className={`block mx-4 mt-4 ${
                  touched.email && errors.email
                    ? `text-error-color`
                    : touched.email && !errors.email
                    ? `text-green-500`
                    : `text-white`
                }`}
              >
                {emailLabel}
              </label>
              <div className="flex items-center relative">
                <Field
                  id="email"
                  name="email"
                  type="email"
                  placeholder={emailPlaceholderMsg}
                  className={`w-full rounded bg-transparent border border-solid placeholder-gray-300 placeholder-opacity-50 text-center p-2 pl-10 ${
                    touched.email && errors.email
                      ? `border-error-color focus:border-error-color`
                      : touched.email && !errors.email
                      ? `border-green-500 focus:border-green-500`
                      : `border-white`
                  }`}
                />
                {touched.email && !errors.email && (
                  <MdDone className="absolute left-3 text-green-500" />
                )}{" "}
                {touched.email && errors.email && (
                  <MdErrorOutline className="absolute left-3 text-error-color" />
                )}
                <Field id="token" name="token" type="hidden" />
              </div>
              <ErrorMessage
                component="span"
                name="email"
                className="block text-sm text-error-color mx-4 my-2"
              />
              <Button
                type="submit"
                className="mt-8"
                ariaDisabled={!(isValid && dirty)}
              >
                {subscribeButtonLabel}
              </Button>
              <AriaLive
                isValid={isValid && dirty}
                validMsg="Naciśnij przycisk Zapisuję się, aby dołączyć do newslettera"
                invalidMsg="Sprawdź czy wszystkie pola wymagane są uzupełnione i czy zawierają poprawne dane"
              />
            </Form>
          );
        }}
      </Formik>}      
      {!formIsVisible && <p className="w-full text-white bg-error-color font-bold p-5 border border-solid border-error-color">{unhandledExeptionLabel}</p>}
    </div>
  );
};

export default NewsletterForm;
