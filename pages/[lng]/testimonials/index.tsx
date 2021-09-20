import { FC, useState } from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import dynamic from "next/dynamic";
import {
  Testimonials,
  isTestimonialFormAllowed,
  isTestimonialAllowed,
  Pagination,
  useI18n
} from "@sirclo/nexus";
import Layout from "components/Layout/Layout";
import Breadcrumb from "components/Breadcrumb/Breadcrumb";
import Placeholder from "components/Placeholder";
import ReCAPTCHA from "react-google-recaptcha";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import PremiumFeatures from "components/PremiumFeatures/PremiumFeatures";
import { useBrand } from "lib/utils/useBrand";
import { parseCookies } from "lib/parseCookies";

const Popup = dynamic(() => import("components/Popup/Popup"));
const TestimonialForm = dynamic(() => import("@sirclo/nexus").then((mod) => mod.TestimonialForm));

const classesTestimonials = {
  containerClassName: "testimonial__body",
  cardClassName: "testimonial__body--items",
  mainClassName: "testimonial__body--items-main",
  contentClassName: "testimonial__body--items-main-content",
  userClassName: "testimonial__body--items-main-user",
  dateClassName: "testimonial__body--items-created",
};

const classesTestimonalsForm = {
  backdropClassName: "d-none",
  formContainerClassName: "testimonial__form--inner",
  testimonialHeaderClassName: "d-none",
  formClassName: "testimonial__form--page",
  inputContainerClassName: "sirclo-form-row mb-3",
  inputLabelClassName: "testimonialForm-inputLabelClassName",
  inputClassName: "form-control sirclo-form-input",
  imgUploadContainerClassName: "sirclo-form-row mb-3",
  uploadIconClassName: "d-block mb-2",
  imgUploadClassName: "sirclo-form-input-file",
  publishOptionClassName: "sirclo-form-input-radio",
  verificationContainerClassName: "mb-3",
  submitBtnClassName: "btn btn-orange btn-long text-uppercase",
}

const classesPlaceholderTestimonials = {
  placeholderTitle: "placeholder-item placeholder-item__testimonial--title",
  placeholderList: "placeholder-item placeholder-item__testimonial--list"
}

const classesPagination = {
  pagingClassName: "testimonial__footer--pagination-order",
  itemClassName: "testimonial__footer--pagination-order-list",
  activeClassName: "testimonial__footer--pagination-order-list-active",
  linkClassName: "testimonial__footer--pagination-order-list-link"
}

const TestimonialsPage: FC<any> = ({
  lng,
  lngDict,
  brand
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const i18n: any = useI18n();
  const [testimonialInfo, setTestimonialInfo] = useState(null);
  const [popup, setPopup] = useState<boolean>(false)
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const testimonialFormAllowed = isTestimonialFormAllowed();
  const testimonialAllowed = isTestimonialAllowed();

  const linksBreadcrumb = [`${i18n.t("home.title")}`, `${i18n.t("testimonial.title")}`]

  return (
    <Layout
      i18n={i18n}
      lng={lng}
      lngDict={lngDict}
      brand={brand}
    >
      {popup && testimonialFormAllowed && (
        <PremiumFeatures>
          <Popup setPopup={setPopup}>
            <TestimonialForm
              classes={classesTestimonalsForm}
              uploadIcon={i18n.t("testimonial.inputImage")}
              onCreateTestimonialCompleted={() => setPopup(false)}
              onCreateTestimonialError={(error: any) => toast.error(error)}
              onUploadImageCompleted={() => toast.success(i18n.t("testimonial.successUpload"))}
              onUploadImageError={(error: any) => toast.error(error)}
              withVerification={true}
              isVerified={isVerified}
              verificationComponent={
                <ReCAPTCHA
                  sitekey={process.env.NEXT_PUBLIC_SITEKEY_RECAPTCHA}
                  onChange={() => setIsVerified(true)}
                />
              }
            />
          </Popup>
        </PremiumFeatures>
      )}
      <Breadcrumb title={i18n.t("testimonial.title")} links={linksBreadcrumb} lng={lng} />
      <PremiumFeatures>
        {testimonialAllowed &&
          <div className="container">
            <div className="testimonial">
              <div className="testimonial__header">
                <div className="testimonial__header--detail">
                  <span>{i18n.t('testimonial.weHave')} {testimonialInfo && testimonialInfo.totalItems} {i18n.t('testimonial.caption')}</span>
                </div>
                <div className="testimonial__header--add" onClick={() => setPopup(!popup)}>
                  <FontAwesomeIcon icon={faPlus} className="testimonial__header--add-icon" />
                  <span>{i18n.t("testimonial.addTestimonial")}</span>
                </div>
              </div>
              <Testimonials
                classes={classesTestimonials}
                itemPerPage={2}
                getPageInfo={(pageInfo: any) =>
                  setTestimonialInfo(pageInfo)
                }
                loadingComponent={
                  <>
                    <Placeholder classes={classesPlaceholderTestimonials}
                      withTitle={true} withList={true} listMany={3}
                    />
                    <hr className="my-5" />
                    <Placeholder classes={classesPlaceholderTestimonials}
                      withTitle={true} withList={true} listMany={3}
                    />
                  </>
                }
              />
              <div className="testimonial__footer">
                <div className="testimonial__footer--pagination">
                  {testimonialInfo && testimonialInfo.totalItems &&
                    <Pagination
                      classes={classesPagination}
                      totalData={testimonialInfo && testimonialInfo.totalItems}
                      displayPerPage={2}
                      prevLabel={"Previous"}
                      nextLabel={"Next"}
                    />
                  }
                </div>
              </div>
            </div>
          </div>
        }
      </PremiumFeatures>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params, res, req }) => {
  const { default: lngDict = {} } = await import(
    `locales/${params.lng}.json`
  );

  const brand = await useBrand(req);

  if (res) {
    const cookies = parseCookies(req);
    res.writeHead(307, {
      Location: `/${cookies.ACTIVE_LNG || "id"}`,
    });
    res.end();
  }

  return {
    props: {
      lng: params.lng,
      lngDict,
      brand: brand || ''
    },
  };
}

export default TestimonialsPage;
