import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import { useI18n, usePaymentLink } from "@sirclo/nexus";
import Layout from "components/Layout/Layout";
import Breadcrumb from "components/Breadcrumb/Breadcrumb";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { useBrand } from "lib/utils/useBrand";

const PaymentStatus: React.FC<any> = ({ 
  lng, 
  lngDict,
  brand,
  orderID,
  status
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const i18n: any = useI18n();
  const router = useRouter();
  const { data } = usePaymentLink(orderID);
  let paymentStatus: any;

  if (data === undefined || status === null) status = "orderNotFound";

  switch (status) {
    case 'failed':
      paymentStatus = {
        title: i18n.t("paymentStatus.titleFailed"),
        iconClass: "paymentStatus_innerIconFailed",
        contentTitle: i18n.t("paymentStatus.failed"),
        contentDesc: i18n.t("paymentStatus.failedDesc")
      }
      break
    case 'unfinish':
      paymentStatus = {
        title: i18n.t("paymentStatus.titleUnfinish"),
        iconClass: "paymentStatus_innerIconWarning",
        contentTitle: i18n.t("paymentStatus.unfinish"),
        contentDesc: i18n.t("paymentStatus.unfinishDesc")
      }
      break
    default:
      paymentStatus = {
        title: i18n.t("paymentStatus.orderNotFound"),
        iconClass: "paymentStatus_innerIconWarning",
      }
  }

  const linksBreadcrumb = [
    `${i18n.t("home.title")}`,
    `${i18n.t("placeOrder.title")}`,
  ];

  return (
    <Layout 
      lngDict={lngDict} 
      i18n={i18n} 
      lng={lng}
      brand={brand}
    >
      <Breadcrumb
        title={i18n.t("placeOrder.title")}
        links={linksBreadcrumb}
        lng={lng}
      />
      <div className="container">
        <div className="paymentStatus">
          <div className="paymentStatus_inner">
            <h6 className="paymentStatus_title">
              {paymentStatus?.title}
            </h6>
            <FontAwesomeIcon
              icon={faExclamationTriangle}
              className={paymentStatus?.iconClass}
            />
            {!["orderNotFound", ""].includes(status) &&
              <div className="paymentStatus_content">
                <h6 className="paymentStatus_contentTitle">
                  {paymentStatus?.contentTitle}
                </h6>
                <p className="paymentStatus_contentDesc">
                  {paymentStatus?.contentDesc}
                </p>
              </div>
            }
            <div className="paymentStatus_action">
              {status !== 'unfinish' &&
                <div className="paymentStatus_actionButton">
                  <button
                    className="btn btn-black-outer btn-long text-uppercase"
                    onClick={() => router.push("/[lng]/products", `/${lng}/products`)}
                  >
                    {i18n.t("paymentStatus.continueShopping")}
                  </button>
                </div>
              }
              {status !== 'orderNotFound' &&
                <div className="paymentStatus_actionButton">
                  <button
                    className="btn btn-black btn-long text-uppercase"
                    onClick={() => {
                      window.location.href = data.orders[0].paymentLinks[0];
                    }}
                  >
                    {i18n.t("paymentStatus.tryAgain")}
                  </button>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params, req }) => {
  const { default: lngDict = {} } = await import(
    `locales/${params.lng}.json`
  );

  const brand = await useBrand(req);
  const [orderID, status] = params?.orderID as string[];

  return {
    props: { 
      lng: params.lng, 
      lngDict,
      brand: brand || "",
      orderID: orderID || "",
      status: status || "",
    }
  };
}

export default PaymentStatus;