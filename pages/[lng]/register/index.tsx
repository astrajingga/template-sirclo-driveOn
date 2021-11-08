/* library package */
import { FC, useState } from 'react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Router from 'next/router'
import { toast } from 'react-toastify'
import ReCAPTCHA from 'react-google-recaptcha'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faEye,
  faEyeSlash,
  faUserCircle,
  faEnvelope,
  faArrowLeft,
  faCheckCircle,
} from '@fortawesome/free-solid-svg-icons'

import {
  faWhatsapp
} from "@fortawesome/free-brands-svg-icons";

import {
  Register,
  SingleSignOn,
  WhatsAppOTPInput,
  useI18n
} from '@sirclo/nexus'

/* library template */
import { parseCookies } from 'lib/parseCookies'
import redirectIfAuthenticated from 'lib/redirectIfAuthenticated'
import { useBrand } from 'lib/utils/useBrand'
import { useGoogleAuth } from 'lib/utils/useGoogleAuth'
import { useFacebookAuth } from 'lib/utils/useFacebookAuth'

/* component */
import Layout from 'components/Layout/Layout'
import Breadcrumb from 'components/Breadcrumb/Breadcrumb'
import Loader from 'components/Loader/Loader'
import LoaderPages from 'components/Loader/LoaderPages'

/* style */

const classesRegister = {
  containerClassName: "row register-page-form",
  basicInfoContainerClassName: "col-12",
  deliveryAddressContainerClassName: "col-12",
  headerLabelClassName: "register-page-form--label",
  inputContainerClassName: "sirclo-form-row",
  inputClassName: "form-control sirclo-form-input",
  labelRequiredClassName: "col-12",
  verificationContainerClassName: "col-12 mb-3",
  buttonClassName: "btn col-12 btn-danger btn-long",
  passwordStrengthBarContainerClassName:
    "sirclo-form-password-strength-bar-container",
  passwordStrengthBarClassName: "sirclo-form-password-strength-bar",
  passwordStrengthLabelClassName: "sirclo-form-password-strength-label",
  passwordCriteriaListClassName: "sirclo-form-password-criteria-list",
  passwordCriteriaClassName: "sirclo-form-password-criteria",
  datePickerInputClassName: "date-picker__input",
  datePickerCalendarClassName: "date-picker__calendar"
}

const classesWhatsAppOTP = {
  //form
  inputFormTitleClassName: "login-page-title",
  inputFormDescriptionClassName: "login-page-subtitle",
  formWAContainerClassName: "login-page-form",
  inputLabelClassName: "login-page-label",
  inputWANumberClassName: "form-control sirclo-form-input",
  btnSubmitClassName: "btn btn-orange btn-long btn-center login-page-btn",
  inputDescriptionClassName: "text-center",
  termsAndConditionClassName: "login-page-pointer",
  privacyPolicyClassName: "login-page-pointer",
  //confirmation
  confirmationContainerClassName: "login-page-column",
  confirmationHeaderContainerClassName: "w-100 text-center",
  confirmationBackContainerClassName: "login-page-back",
  confirmationBackLabelClassName: "login-page-backTitle ml-2",
  confirmationHeaderTitleClassName: "login-page-title",
  confirmationHeaderSubtitleClassName: "login-page-subtitle",
  confirmationButtonOTPClassName: "btn btn-orange btn-long btn-center login-page-btn login-page-btnOtp",
  anotherLoginMethodClassName: "login-page-pointer",
  //verification
  verificationContainerClassName: "login-page-column",
  verificationHeaderClassName: "text-center",
  verificationTitleClassName: "login-page-title mt-2",
  verificationBodyClassName: "login-page-column",
  infoLabelClassName: "login-page-subtitle text-center",
  fieldOTPInputContainerClassName: "login-page-inputContainer",
  fieldOTPInputClassName: "form-control sirclo-form-input login-page-inputOtp",
  verificationFooterClassName: "login-page-column",
  btnResendOTPClassName: "btn btn-orange btn-long btn-center login-page-btn login-page-btnResend",
  btnChangeMethodClassName: "login-page-pointer",
  //choose account
  chooseAccountContainerClassName: "login-page-column",
  chooseAccountHeaderClassName: "text-center",
  chooseAccountTitleClassName: "login-page-title",
  chooseAccountDescriptionClassName: "login-page-subtitle",
  accountOptionsContainerClassName: "login-page-accountOptionContainer",
  accountOptionClassName: "login-page-accountOption",
  selectedAccountClassName: "login-page-accountOptionSelected",
  accountContainerClassName: "login-page-accountContainer",
  accountNameClassName: "login-page-accountName",
  accountEmailClassName: "login-page-accountEmail",
  btnChooseAccountClassName: "btn btn-orange btn-long btn-center",
}

const RegisterPage: FC<any> = ({
  lng,
  lngDict,
  brand,
  hasGoogleAuth,
  hasFacebookAuth
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const i18n: any = useI18n()
  const [isVerified, setIsVerified] = useState<boolean>(false)
  const [step, setStep] = useState<string>("email");

  const brandName = (brand: string): string => {
    const lower = brand?.toLowerCase();
    return brand?.charAt(0).toUpperCase() + lower?.slice(1);
  }

  const linksBreadcrumb = [
    `${i18n.t("home.title")}`,
    `${i18n.t("register.title")}`,
  ]

  return (
    <Layout
      i18n={i18n}
      lng={lng}
      lngDict={lngDict}
      brand={brand}
    >
      <Breadcrumb
        links={linksBreadcrumb}
        lng={lng}
      />
      <section>
        <div className="container">
          <div className="register-page-container">
            <div className="register-page-inner">
              <div className="row mb-3 register-page-padding">
              {(step === 'email') &&
                <div className="col-12 col-md-12">
                  <Register
                    classes={classesRegister}
                    withHeaderLabel={true}
                    onErrorMsg={(msg) => toast.error(msg)}
                    onSuccessMsg={(msg) => toast.success(msg)}
                    redirectPage={() =>
                      Router.push(`/[lng]/login`, `/${lng}/login`)
                    }
                    passwordViewIcon={
                      <FontAwesomeIcon className="icon-password" icon={faEye} />
                    }
                    passwordHideIcon={
                      <FontAwesomeIcon
                        className="icon-password"
                        icon={faEyeSlash}
                      />
                    }
                    passwordUnfulfilledCriteriaIcon={
                      <FontAwesomeIcon icon={faCheckCircle} height="1.25em" />
                    }
                    passwordFulfilledCriteriaIcon={
                      <FontAwesomeIcon icon={faCheckCircle} height="1.25em" />
                    }
                    withVerification={true}
                    isVerified={isVerified}
                    verificationComponent={
                      <ReCAPTCHA
                        sitekey={process.env.NEXT_PUBLIC_SITEKEY_RECAPTCHA}
                        onChange={() => setIsVerified(true)}
                      />
                    }
                    loadingComponent={<Loader color="text-light" />}
                  />
                </div>
               }
              {(step === 'whatsapp-input') &&
              <>
                <WhatsAppOTPInput
                  brandName={brandName(brand?.name)}
                  onStepChange={setStep}
                  classes={classesWhatsAppOTP}
                  loginRedirectPath="account"
                  inputPlaceholder={i18n.t("whatsAppOTPInput.inputPlaceholder")}
                  onErrorMsg={(msg) => toast.error(msg)}
                  onCompletedMsg={(msg) => toast.success(msg)}
                  loadingComponent={
                    <LoaderPages otherClassNameInner="login-page-innerOtp" />
                  }
                  icons={{
                    account: <FontAwesomeIcon className="icon-password" icon={faUserCircle} size="2x" />,
                    back: <FontAwesomeIcon className="icon-password" icon={faArrowLeft} />
                  }}
                />
              </>
              }
              <div className="text-center footer">
                {i18n.t("login.dontHaveAccount")}<a href="/en/login"> {i18n.t("login.toLogin")}</a>
              </div>
              </div>
              <label className="login-page-orTitle"><span>{i18n.t("testimonials.or")}</span></label>
              <div className="row mb-5">
                <div className="col-12 col-sm-12">
                  <h3 className="login-page-title">
                    {i18n.t("register.title")}
                  </h3>
                  <span className="login-page-subtitle">
                    {i18n.t("register.promo")}
                  </span>
                  <br></br>
                  {(hasGoogleAuth || hasFacebookAuth) &&
                    <>
                        <SingleSignOn
                          className="login-page-withGoogleButton mt-2"
                          buttonText={i18n.t("register.sso")}
                          onErrorMsg={(msg: string) => toast.error(msg)}
                          loadingComponent={
                            <div className="quickdetail__overlay">
                              <LoaderPages />
                            </div>
                          }
                        />
                    </>
                  }
                  <button
                    className="login-page-withGoogleButton mt-2"
                    onClick={() => {
                      if (step === 'email') setStep('whatsapp-input')
                      if (step === 'whatsapp-input') setStep('email')
                    }}
                  >
                    <FontAwesomeIcon
                      className="icon-password"
                      icon={step === 'email' ? faWhatsapp : faEnvelope}
                    />
                    <span>
                      {step === 'email' ? i18n.t("register.whatsapp") : i18n.t("register.email")}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  params,
}) => {
  const { default: lngDict = {} } = await import(
    `locales/${params.lng}.json`
  )

  const cookies = parseCookies(req)
  redirectIfAuthenticated(res, cookies, "account")
  const hasGoogleAuth = await useGoogleAuth(req)
  const hasFacebookAuth = await useFacebookAuth(req)

  const brand = await useBrand(req)

  return {
    props: {
      lng: params.lng,
      lngDict,
      hasGoogleAuth,
      hasFacebookAuth,
      brand: brand || ''
    },
  }
}

export default RegisterPage