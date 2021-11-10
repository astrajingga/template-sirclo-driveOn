/* library Package */
import { FC } from 'react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { GiftCard, useI18n } from '@sirclo/nexus'

/* library Template */
import { useBrand } from 'lib/utils/useBrand'

/* component*/
import Layout from 'components/Layout/Layout'
import Breadcrumb from 'components/Breadcrumb/Breadcrumb'

const classesGiftCard = {
  containerClassName: "giftcard-page-form",
  inputContainerClassName: "sirclo-form-row",
  labelClassName: "giftcard-label",
  inputClassName: "form-control sirclo-form-input",
  buttonClassName: "btn btn-orange btn-long float-right"
};

const GiftCardPage: FC<object> = ({
  lng,
  lngDict,
  brand
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const i18n: any = useI18n();

  const linksBreadcrumb = [`${i18n.t("home.title")}`, `${i18n.t("giftCard.title")}`]

  return (
    <Layout
      i18n={i18n}
      lng={lng}
      lngDict={lngDict}
      brand={brand}
    >
      <Breadcrumb title={i18n.t("giftCard.title")} links={linksBreadcrumb} lng={lng} />
      <section>
        <div className="container">
          <div className="giftcard-page-container">
            <div className="giftcard-page-inner">
              <h3 className="giftcard-page-title">
                {i18n.t("giftCard.welcome")}
              </h3>
              <span className="giftcard-page-subtitle">
                {i18n.t("giftCard.desc")}
              </span>
              <GiftCard classes={classesGiftCard} />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

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

export default GiftCardPage;