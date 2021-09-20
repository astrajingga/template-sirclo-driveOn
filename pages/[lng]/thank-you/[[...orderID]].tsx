import { FC } from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { ThankYou, useI18n } from "@sirclo/nexus";
import Layout from "components/Layout/Layout";
import Breadcrumb from "components/Breadcrumb/Breadcrumb";
import { useBrand } from "lib/utils/useBrand";

const classesThankYouPage = {
  thankYouClassName: "thank-you__inner",
  buttonClassName: "btn btn-orange btn-long text-uppercase"
}

const ThankYouPage: FC<any> = ({
  lng,
  lngDict,
  brand
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const i18n: any = useI18n();
  const linksBreadcrumb = [`${i18n.t("home.title")}`, `${i18n.t("thankYou.title")}`]

  return (
    <Layout
      lngDict={lngDict}
      i18n={i18n}
      lng={lng}
      brand={brand}
    >
      <Breadcrumb title={i18n.t("thankYou.title")} links={linksBreadcrumb} lng={lng} />
      <section>
        <div className="container">
          <div className="thank-you__container">
            <h6 className="thank-you__container--titlePrimary">{i18n.t("thankYou.titlePrimary")}</h6>
            <ThankYou
              thankYouImageURL={
                <img src="/images/checkl.svg" className="thank-you__inner--icon" alt="merlin" />
              }
              thankYouMessage={i18n.t("thankYou.message")}
              classes={classesThankYouPage}
              withDelay
            />
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
}

export default ThankYouPage;
