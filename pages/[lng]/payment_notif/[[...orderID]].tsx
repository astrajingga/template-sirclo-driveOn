import { FC } from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import { PaymentConfirmation, useI18n } from "@sirclo/nexus";
import Layout from "components/Layout/Layout";
import Breadcrumb from "components/Breadcrumb/Breadcrumb";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { useBrand } from "lib/utils/useBrand";
import Loader from "components/Loader/Loader";

const classesPaymentConfirmation = {
  paymentConfirmationDivClassName: "payment-notif-page-outer",
  inputContainerClassName: "sirclo-form-row",
  inputClassName: "form-control sirclo-form-input",
  selectClassName: "form-control sirclo-form-input",
  datePickerInputClassName: "date-picker__input",
  datePickerCalendarClassName: "date-picker__calendar",
  buttonConfirmClassName: "btn btn-orange btn-long ml-2 mobile-no-margin",
  buttonContinueClassName: "btn btn-orange btn-long mr-2 mobile-no-margin",
  orderDetailContainerClassName: "order-detail-container",
  summaryTotalContainerClassName: "summary-total",
  summaryItemTitleClassName: "summary-total__title",
  summaryItemPriceClassName: "summary-total__price",
  orderDetailSummaryClassName: `m-0`,
  paymentMethodContentClassName: `m-0`,
  orderDetailPaymentClassName: `d-none`,
  orderDetailShippingClassName: `d-none`,
  billingAddressClassName: `d-none`,
  paymentTitleClassName: `d-none`,
  billingAddressContentClassName: `d-none`,
  orderDetailHeaderClassName: `d-none`,
  summaryTitleClassName: `d-none`,
  summaryItemContainerClassName: `d-none`,
};

const PaymentConfirmationPage: FC<any> = ({
  lng,
  lngDict,
  brand
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const i18n: any = useI18n();
  const router = useRouter();
  let orderID = "";

  if (router.query.orderID) {
    orderID = router.query.orderID.toString();
  }

  const linksBreadcrumb = [
    `${i18n.t("home.title")}`,
    `${i18n.t("paymentConfirm.title")}`,
  ];

  return (
    <Layout
      i18n={i18n}
      lng={lng}
      lngDict={lngDict}
      brand={brand}
    >
      <Breadcrumb
        // title={i18n.t("paymentConfirm.title")}
        links={linksBreadcrumb}
        lng={lng}
      />
      <section>
        <div className="container">
          <div className="payment-notif-page-container">
            <div className="payment-notif-page-inner">
                <h3>{i18n.t("paymentConfirm.title")}</h3>
              <PaymentConfirmation
                onErrorMsg={(msg) => toast.error(msg)}
                orderIDProps={orderID?.toString()}
                classes={classesPaymentConfirmation}
                datePickerCalendarIcon={<FontAwesomeIcon icon={faCalendar} height="2em" />}
                withDelay
                loadingComponent={<Loader color="text-dark"/>}
                errorComponent={<div>{i18n.t("global.error")}</div>}
                withOrderDetails
              />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params, req }) => {
  const { default: lngDict = {} } = await import(
    `locales/${params.lng}.json`
  );

  const brand = await useBrand(req);

  return {
    props: {
      lng: params.lng,
      lngDict,
      brand: brand || ''
    },
  };
};

export default PaymentConfirmationPage;
