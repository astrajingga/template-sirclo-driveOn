import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Newsletter, withBrand } from "@sirclo/nexus";
import { useRouter } from "next/router";

import Head from "next/head";
import SEO from "../SEO/SEO";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { useHookWidgetStyle } from "lib/utils/useWidgetStyle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

type LayoutPropType = {
  lngDict: any;
  i18n: any;
  lng: string;
  layoutClassName?: string;
  [otherProp: string]: any;
};

const classesNewsletterPopup = {
  containerClassName: "newsletter__popup-container",
  closeButtonClassName: "newsletter__close",
  formContainerClassName: "newsletter-form-container",
  labelClassName: "newsletter-form__label",
  inputClassName: "newsletter-form__input",
  buttonClassName: "newsletter-form__button",
};

const Layout: React.FC<LayoutPropType> = ({
  lngDict,
  i18n,
  lng,
  layoutClassName = "",
  withHeader = true,
  withFooter = true,
  brand,
  ...props
}) => {
  const router = useRouter();
  useHookWidgetStyle(router);

  useEffect(() => {
    i18n?.locale(lng, lngDict);
  }, [lng, lngDict]);

  useEffect(() => {
    if (brand?.googleAdsWebsiteMetaToken) getToken()
  }, [brand])

  const getToken = (): string => {
    const googleAdsWebsiteMetaToken = brand?.googleAdsWebsiteMetaToken
    const token: string = googleAdsWebsiteMetaToken.replace(/.*content="([^"]*)".*/, "$1")
    return token
  }

  return (
    <>
      <Head>
        {brand?.settings?.hideFromSearchEngine && (
          <meta name="robots" content="noindex, nofollow" />
        )}
        {brand?.googleAdsWebsiteMetaToken &&
          <meta name="google-site-verification" content={getToken()} />
        }
        {brand?.ID === "bajubaju-4" &&
          <meta name="google-site-verification" content="-c386YDXJpIeEJ9XXKhU-aTLsjibQRwT5YYFw2WPsx8" />
        }
        <link
          rel="shortcut icon"
          href={brand?.settings?.faviconURL}
          type="image/x-icon"
        />
        <link rel="preconnect" href="https://thumbor.sirclocdn.com" />
        <link rel="preconnect" href={process.env.IS_PROD == "true" ?
            "http://cdn.sirclo.com" :
            "http://cdn.sirclo.com.dmmy.me"} />
        
        <link
          rel="dns-prefetch"
          href={process.env.IS_PROD == "true" ?
            "http://cdn.sirclo.com" :
            "http://cdn.sirclo.com.dmmy.me"}
        />

        <link rel="dns-prefetch" href="https://storage.googleapis.com" />
        <link rel="dns-prefetch" href="https://thumbor.sirclocdn.com" />
        <link rel="dns-prefetch" href="https://graph.instagram.com" />
        <link rel="dns-prefetch" href="http://static.getbutton.io" />

        <link 
          rel="preload" 
          href="/webfonts/Karla-Bold.ttf"
          as="font" 
          crossOrigin="anonymous"
          type="font/ttf" 
        />

        <link 
          rel="preload" 
          href="/webfonts/Karla-BoldItalic.ttf"
          as="font" 
          crossOrigin="anonymous"
          type="font/ttf" 
        />

        <link 
          rel="preload" 
          href="/webfonts/Karla-Italic.ttf"
          as="font" 
          crossOrigin="anonymous"
          type="font/ttf" 
        />

        <link 
          rel="preload" 
          href="/webfonts/Karla-Regular.ttf"
          as="font" 
          crossOrigin="anonymous"
          type="font/ttf" 
        />
      </Head>
      <SEO
        title={brand?.settings?.websiteTitle}
        description={brand?.settings?.websiteDescription}
        image={brand?.logoURL}
      />
      {withHeader &&
        <Header lng={lng} />
      }
      <main className={layoutClassName}>{props.children}</main>
      <ToastContainer />
      <div className="newsletter__overlay">
        <Newsletter
          classes={classesNewsletterPopup}
          closeButton={<FontAwesomeIcon icon={faTimes} />}
          withForm
          onComplete={() => toast.success(i18n.t("newsletter.submitSuccess"))}
          onError={() => toast.error(i18n.t("newsletter.submitError"))}
          buttonComponent={i18n.t("newsletter.submitButton")}
        />
      </div>
      {withFooter &&
        <Footer brand={brand} />
      }
    </>
  );
};

export default withBrand(Layout);
