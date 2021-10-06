import { FC } from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { ThankYou, useI18n } from "@sirclo/nexus";
import { toast } from "react-toastify";


import SEO from "components/SEO/SEO";
import Layout from "components/Layout/Layout";
import { useBrand } from "lib/utils/useBrand";
import {
  Check,
  ChevronUp,
  ChevronDown,
  Copy
} from "react-feather";
import styles from "public/scss/pages/ThankYou.module.scss";
import stylesBanks from "public/scss/components/BanksAccount.module.scss";
import stylesOrder from "public/scss/pages/PaymentNotif.module.scss";

const classesThankYouPage = {
  thankYouClassName: styles.thankyou_inner,
  hankYouOrderID: styles.thankyou_label,
  thankYouMessageClassName: styles.thankyou_message,
  thankYouOrderID: styles.thankyou_orderID,
  buttonClassName: `btn w-100 ${styles.btn_primary} ${styles.btn_long}`,

  buttonConfirmClassName: stylesOrder.paymentConfirmation_buttonConfirm,
  detailContainerClassName: stylesOrder.paymentConfirmation_detailContainer,
  detailContentClassName: stylesOrder.paymentConfirmation_detailContent,
  detailHeaderClassName: stylesOrder.paymentConfirmation_detailHeader,
  detailTitleClassName: stylesOrder.paymentConfirmation_detailTitle,
  detailStatusClassName: stylesOrder.paymentConfirmation_detailStatus,
  paymentStatusCancelledClassName: stylesOrder.paymentConfirmation_detailStatusCancelled,
  paymentStatusReturnedClassName: styles.paymentConfirmation_detailStatusReturned,
  detailTotalAmountClassName: stylesOrder.paymentConfirmation_detailTotalAmount,
  detailDropdownClassName: stylesOrder.paymentConfirmation_detailDropdown,
  detailItemClassName: `d-flex`,
  detailItemImgClassName: stylesOrder.paymentConfirmation_detailItemImg,
  detailItemLabelClassName: stylesOrder.paymentConfirmation_detailItemLabel,
  detailItemPriceClassName: stylesOrder.paymentConfirmation_detailItemPrice,
  detailPriceBreakdownClassName: stylesOrder.paymentConfirmation_detailPriceBreakdown,
  detailFieldClassName: stylesOrder.paymentConfirmation_detailField,
  detailTotalFieldClassName: stylesOrder.paymentConfirmation_detailTotalField,
  detailHeaderDropdownClassName: stylesOrder.paymentConfirmation_detailHeaderDropdown,
  detailBodyDropdownClassName: stylesOrder.paymentConfirmation_detailBodyDropdown,
  labelClassName: stylesOrder.paymentConfirmation_label,

  bankAccountInformationClassName: stylesBanks.bank_information,
  bankAccountContainerClassName: stylesBanks.bank_container,
  bankAccountHeaderClassName: stylesBanks.bank_header,
  bankAccountSectionClassName: stylesBanks.bank_section,
  bankAccountLogoClassName: stylesBanks.bank_logoBank,
  bankAccountBodyClassName: stylesBanks.bank_body,
  bankAccountInfoAccountClassName: stylesBanks.bank_infoAccount,
  bankAccountNumberSectionClassname: stylesBanks.bank_numberSection,
  bankAccountCopyButtonClassName: stylesBanks.bank_buttonIcon,
  bankAccountIconCollapseClassName: stylesBanks.bank_buttonIcon,
  bankAccountLabelAccountNameClassName: stylesBanks.bank_name
}

const ThankYouPage: FC<any> = ({
  lng,
  lngDict,
  brand
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const i18n: any = useI18n();

  return (
    <Layout
      i18n={i18n}
      lng={lng}
      lngDict={lngDict}
      brand={brand}
    >
      <SEO title={i18n.t("thankYou.thanks")} />
      <section>
        <div className="container">
          <div className={styles.thankyou_container}>
            <ThankYou
              thankYouImageURL={<Check className={styles.thankyou_inner__icon} />}
              classes={classesThankYouPage}
              withDelay
              withOrderDetails
              onSuccessMsg={(msg) => toast.success(msg)}
              icon={{
                chevronUp: <ChevronUp />,
                chevronDown: <ChevronDown />,
                copy: <Copy />
              }}
            />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
  const brand = await useBrand(req);
  const defaultLanguage = brand?.settings?.defaultLanguage || params.lng || 'id';
  const { default: lngDict = {} } = await import(`locales/${defaultLanguage}.json`);

  return {
    props: {
      lng: defaultLanguage,
      lngDict,
      brand: brand || ""
    }
  };
}

export default ThankYouPage;
