import { FC, useState } from 'react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { toast } from 'react-toastify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faEye,
  faEyeSlash,
  faUserCircle,
  faEnvelope,
  faArrowLeft
} from '@fortawesome/free-solid-svg-icons'
import {
  faWhatsapp
} from "@fortawesome/free-brands-svg-icons";
import {
  Login,
  WhatsAppOTPInput,
  SingleSignOn,
  useI18n
} from '@sirclo/nexus'
import { parseCookies } from 'lib/parseCookies'
import redirectIfAuthenticated from 'lib/redirectIfAuthenticated'
import { useBrand } from 'lib/utils/useBrand'
import { useGoogleAuth } from 'lib/utils/useGoogleAuth'
import { useFacebookAuth } from 'lib/utils/useFacebookAuth'
import { useWhatsAppOTPSetting } from 'lib/utils/useSingleSignOn'
import Layout from 'components/Layout/Layout'
// import Breadcrumb from 'components/Breadcrumb/Breadcrumb'
import Loader from 'components/Loader/Loader'
import LoaderPages from 'components/Loader/LoaderPages'

const loginClasses = {
  containerClassName: "login-page-form",
  inputContainerClassName: "sirclo-form-row",
  inputClassName: "form-control sirclo-form-input",
  buttonClassName: "col-12 btn btn-danger btn-long btn-center",
  footerClassName: "footer",
  forgotPasswordClass: "forgot-password",
  forgotLinkClass: "forgot-link",
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
  btnChooseAccountClassName: "btn btn-orange btn-long btn-center"
}

const LoginPage: FC<any> = ({
  lng,
  lngDict,
  brand,
  hasGoogleAuth,
  hasFacebookAuth,
  hasOtp
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const i18n: any = useI18n()
  const [step, setStep] = useState<string>("whatsapp-input");
  // const linksBreadcrumb = [`${i18n.t("home.title")}`, `${i18n.t("login.title")}`]

  const brandName = (brand: string): string => {
    const lower = brand?.toLowerCase();
    return brand?.charAt(0).toUpperCase() + lower?.slice(1);
  }

  return (
    <Layout
      i18n={i18n}
      lng={lng}
      lngDict={lngDict}
      brand={brand}
    >
      {/* <Breadcrumb title={i18n.t("login.title")} links={linksBreadcrumb} lng={lng} /> */}
      <section>
        <div className="container">
          <div className="login-page-container">
            <div className="login-page-inner">
              {step === "email" || !hasOtp ?
                <>
                  <h3 className="login-page-title">
                    {i18n.t("login.title")}
                  </h3>
                  <span className="login-page-subtitle">
                    {i18n.t("login.welcome")}
                  </span>
                  <Login
                    classes={loginClasses}
                    onCompletedMsg={(msg) => toast.success(msg)}
                    onErrorMsg={(msg) => toast.error(msg)}
                    passwordViewIcon={<FontAwesomeIcon className="icon-password" icon={faEye} />}
                    passwordHideIcon={<FontAwesomeIcon className="icon-password" icon={faEyeSlash} />}
                    loadingComponent={<Loader color="text-light" />}
                  />
                </> :
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
              {(step === 'email' || step === 'whatsapp-input') &&
                <>
                  {(hasGoogleAuth || hasFacebookAuth || hasOtp) &&
                    <label className="login-page-orTitle">
                      <span>{i18n.t("testimonials.or")}</span>
                    </label>
                  }
                  <div className="login-page-withGoogle">
                    {(hasGoogleAuth || hasFacebookAuth) &&
                      <SingleSignOn
                        className="login-page-withGoogleButton"
                        buttonText={i18n.t("login.sso")}
                        onErrorMsg={(msg: string) => toast.error(msg)}
                        loadingComponent={
                          <div className="quickdetail__overlay">
                            <LoaderPages />
                          </div>
                        }
                      />
                    }
                    {hasOtp &&
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
                          {step === 'email' ? i18n.t("login.whatsapp") : i18n.t("login.withEmail")}
                        </span>
                      </button>
                    }
                  </div>
                </>
              }
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res, params }) => {
  const { default: lngDict = {} } = await import(
    `locales/${params.lng}.json`
  )

  const cookies = parseCookies(req)
  redirectIfAuthenticated(res, cookies, 'account')
  const hasGoogleAuth = await useGoogleAuth(req)
  const hasFacebookAuth = await useFacebookAuth(req)
  const hasOtp = await useWhatsAppOTPSetting(req)

  const brand = await useBrand(req)

  return {
    props: {
      lng: params.lng,
      lngDict,
      hasGoogleAuth,
      hasFacebookAuth,
      hasOtp,
      brand: brand || ''
    },
  }
}

export default LoginPage
