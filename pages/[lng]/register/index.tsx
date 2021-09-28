import { FC, useState } from 'react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Router from 'next/router'
import { toast } from 'react-toastify'
import ReCAPTCHA from 'react-google-recaptcha'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faEye,
  faEyeSlash,
  faCheckCircle,
} from '@fortawesome/free-solid-svg-icons'
import {
  Register,
  SingleSignOn,
  useI18n
} from '@sirclo/nexus'
import { parseCookies } from 'lib/parseCookies'
import redirectIfAuthenticated from 'lib/redirectIfAuthenticated'
import { useBrand } from 'lib/utils/useBrand'
import { useGoogleAuth } from 'lib/utils/useGoogleAuth'
import { useFacebookAuth } from 'lib/utils/useFacebookAuth'
import Layout from 'components/Layout/Layout'
import Breadcrumb from 'components/Breadcrumb/Breadcrumb'
import Loader from 'components/Loader/Loader'
import LoaderPages from 'components/Loader/LoaderPages'

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

const RegisterPage: FC<any> = ({
  lng,
  lngDict,
  brand,
  hasGoogleAuth,
  hasFacebookAuth
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const i18n: any = useI18n()
  const [isVerified, setIsVerified] = useState<boolean>(false)

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
        // title={i18n.t("register.title")}
        links={linksBreadcrumb}
        lng={lng}
      />
      <section>
        <div className="container">
          <div className="register-page-container">
            <div className="register-page-inner">
              <div className="row mb-5">
                <div className="col-12 col-sm-12">
                  <h3 className="login-page-title">
                    {i18n.t("register.title")}
                  </h3>
                  <span className="login-page-subtitle">
                    {i18n.t("register.promo")}
                  </span>
                  {(hasGoogleAuth || hasFacebookAuth) &&
                    <>
                      <div className="login-page-withGoogle register">
                        <SingleSignOn
                          className="login-page-withGoogleButton"
                          buttonText={i18n.t("register.sso")}
                          onErrorMsg={(msg: string) => toast.error(msg)}
                          loadingComponent={
                            <div className="quickdetail__overlay">
                              <LoaderPages />
                            </div>
                          }
                        />
                      </div>
                      <label className="login-page-orTitle"><span>{i18n.t("testimonials.or")}</span></label>
                    </>
                  }
                </div>
              </div>
              <div className="row mb-3">
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