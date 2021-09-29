import { FC } from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import {
  Lookbook,
  isLookbookAllowed,
  useI18n
} from "@sirclo/nexus";
import Layout from "components/Layout/Layout";
import Breadcrumb from "components/Breadcrumb/Breadcrumb";
import useWindowSize from "lib/utils/useWindowSize";
import { useBrand } from "lib/utils/useBrand";

const classesLookbook = {
  containerClassName: "lookbook",
  rowClassName: "card-columns",
  lookbookContainerClassName: "card lookbook__items",
  imageClassName: "lookbook__items--images",
  lookbookLabelContainerClassName: "lookbook__items--details",
  labelClassName: "lookbook__items--details-label",
  linkClassName: "lookbook__items--details-links",
};

const LookbookCategory: FC<any> = ({
  lng,
  lngDict,
  brand
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const i18n: any = useI18n();
  const size = useWindowSize();
  const LookbookAllowed = isLookbookAllowed();

  const linksBreadcrumb = [`${i18n.t("home.title")}`, `${i18n.t("lookbook.title")}`]

  return (
    <Layout
      i18n={i18n}
      lng={lng}
      lngDict={lngDict}
      brand={brand}
    >
      <Breadcrumb 
      // title={i18n.t("lookbook.title")} 
      links={linksBreadcrumb} lng={lng} />
      {LookbookAllowed &&
        <section>
          <div className="container">
            <Lookbook
              classes={classesLookbook}
              linkText={i18n.t("lookbook.seeCollection")}
              pathPrefix={`lookbook/categories`}
              thumborSetting={{
                width: size.width < 768 ? 400 : 600,
                format: "webp",
                quality: 85,
              }}
            />
          </div>
        </section>
      }
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params, req }) => {
  const { default: lngDict = {} } = await import(
    `locales/${params.lng}.json`
  );
  
  const brand = await useBrand(req);
  
  // console.log("masuk");
  return {
    props: {
      lng: params.lng,
      lngDict,
      brand: brand || ''
    },
  };
}

export default LookbookCategory;
