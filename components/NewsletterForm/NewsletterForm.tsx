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
// import Button from "../button";
import Button from "../links/button";

import { useRouter } from "next/router";
import React, { useEffect } from "react";
import AriaLive from "../aria-live";

import { BsExclamation, BsCheck } from "react-icons/bs";

import { MdDone, MdErrorOutline } from "react-icons/md";
import { NewsletterFormValues } from "types/newsletter-form-values";
import { subscribeToNewsletter, validateReCaptcha } from "@/lib/api";

import { RECAPTCHA_PUBLIC_KEY } from "@/lib/constants";
import { RecaptchaResData } from "types/recaptcha-res-data";

import style from "./NewsletterForm.module.scss";
import { getButtonAppearance } from "utils/button";
import { ButtonData, ButtonType } from "types/buttons-data";

type NewsletterFormProps = {
  content: FormsData;
  onLoading: (isLoading: boolean) => void;
};

const NewsletterForm: React.FC<NewsletterFormProps> = ({
  content,
  onLoading,
}) => {
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
    ariaValidMsg,
    ariaInvalidMsg,
  } = content;

  const submitButton: ButtonData = {
    id: "NewsletterSubmitButton",
    label: subscribeButtonLabel,
    type: ButtonType.primary,
  };

  const [formIsVisible, setFormIsVisible] = useState<boolean>(true);

  const onFormError = () => {
    setFormIsVisible(false);
  };

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
        .then(async (token) => {
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
    <div className={style["form-wrapper"]}>
      {formIsVisible && (
        <Formik
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
              <Form onSubmit={handleSubmit} className={style.form}>
                <div className={style.form__field}>
                  <label
                    htmlFor="name"
                    className={`${style.form__label} ${
                      touched.name && errors.name
                        ? `${style["form__label--error"]}`
                        : touched.name && !errors.name
                        ? `${style["form__label--valid"]}`
                        : ""
                    }`}
                  >
                    {nameLabel}
                  </label>
                  <Field
                    id="name"
                    name="name"
                    placeholder={namePlaceholderMsg}
                    className={`${style.form__input} ${
                      touched.name && errors.name
                        ? `${style["form__input--error"]}`
                        : touched.name && !errors.name
                        ? `${style["form__input--valid"]}`
                        : ""
                    }`}
                  />
                  {touched.name && !errors.name && (
                    <BsCheck
                      className={`${style.form__icon} ${style["form__icon--valid"]}`}
                    />
                  )}{" "}
                  {touched.name && errors.name && (
                    <BsExclamation
                      className={`${style.form__icon} ${style["form__icon--error"]}`}
                    />
                  )}
                </div>
                <ErrorMessage
                  component="span"
                  name="name"
                  className={`${style["form__error-msg"]}`}
                />

                <div className={style.form__field}>
                  <label
                    htmlFor="email"
                    className={`${style.form__label} ${
                      touched.email && errors.email
                        ? `${style["form__label--error"]}`
                        : touched.email && !errors.email
                        ? `${style["form__label--valid"]}`
                        : ""
                    }`}
                  >
                    {emailLabel}
                  </label>
                  <Field
                    id="email"
                    name="email"
                    type="email"
                    placeholder={emailPlaceholderMsg}
                    className={`${style.form__input} ${
                      touched.email && errors.email
                        ? `${style["form__input--error"]}`
                        : touched.email && !errors.email
                        ? `${style["form__input--valid"]}`
                        : ""
                    }`}
                  />
                  {touched.email && !errors.email && (
                    <BsCheck
                      className={`${style.form__icon} ${style["form__icon--valid"]}`}
                    />
                  )}{" "}
                  {touched.email && errors.email && (
                    <BsExclamation
                      className={`${style.form__icon} ${style["form__icon--error"]}`}
                    />
                  )}
                </div>
                <ErrorMessage
                  component="span"
                  name="email"
                  className={`${style["form__error-msg"]}`}
                />
                <Button
                  button={submitButton}
                  appearance={getButtonAppearance(submitButton.type, "dark")}
                  type="submit"
                />
                <Field id="token" name="token" type="hidden" />
                <AriaLive
                  isValid={isValid && dirty}
                  validMsg={ariaValidMsg}
                  invalidMsg={ariaInvalidMsg}
                />
              </Form>
            );
          }}
        </Formik>
      )}
      {!formIsVisible && (
        <p className={`${style["form__error-msg"]}`}>
          {unhandledExeptionLabel}
        </p>
      )}
    </div>
  );
};

export default NewsletterForm;
