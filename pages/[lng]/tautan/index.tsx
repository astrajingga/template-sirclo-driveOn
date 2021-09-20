import { FC } from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { Links, useI18n } from "@sirclo/nexus";
import Layout from "components/Layout/Layout";
import { useBrand } from "lib/utils/useBrand";

const classesLinks = {
  containerClassName: "tautan",
  logoImage: "tautan_logo",
  titleClassName: "tautan_title",
  description: "tautan_description",
  linksSection: "tautan_linkSection",
  labelText: "tautan_labelText",
  labelImage: "tautan_labelImage"
}

const TautanPage: FC<any> = ({
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
      withHeader={false}
      withFooter={false}
    >
      <div className="container">
        <div className="row">
          <div className="col-12 col-sm-8 offset-sm2 col-md-6 offset-md-3 col-lg-4 offset-lg-4">
            <Links classes={classesLinks} />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
  const { default: lngDict = {} } = await import(
    `locales/${params.lng}.json`
  );

  const brand = await useBrand(req);

  return {
    props: {
      lng: params.lng,
      lngDict,
      brand: brand || ""
    }
  };
}

export default TautanPage;