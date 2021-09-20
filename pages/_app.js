import "@brainhubeu/react-carousel/lib/style.css";
import "react-toastify/dist/ReactToastify.css";
import "../public/scss/main.scss";

import { useState, useEffect } from "react";

import { 
  useApollo, 
  ApolloProvider, 
  PackageFeatureProvider,
  Widget,
  I18n 
} from "@sirclo/nexus";

import { useWidgetStyle } from "lib/utils/useWidgetStyle";
import { PageTransition } from "next-page-transitions";
import MaintenanceMode from "@sirclo/nexus/lib/component/MaintenanceMode";

const MyApp = ({ Component, pageProps, router }) => {
  const apolloClient = useApollo(pageProps.initialApolloState)
  const [hash, setHash] = useState("")

  useEffect(() => {
    const routeChangeHandler = () => {
      setHash(Math.random().toString(36).substring(7));
    };

    router.events.on("routeChangeComplete", routeChangeHandler);

    return () => {
      router.events.off("routeChangeComplete", routeChangeHandler);
    };
  }, []);

  return (
    <PageTransition
        timeout={200}
        loadingDelay={100}
        classNames="page-transition"
      >
      <ApolloProvider client={apolloClient} key={router.route}>
        <PackageFeatureProvider>
          <MaintenanceMode classes={{ maintenanceContainerClassName: "maintenance" }}>
            <I18n lngDict={pageProps.lngDict} locale={pageProps.lng}>
              <Component {...pageProps} />
              <Widget pos="script"
                hash={hash}
                getItemCount={() => setTimeout(() => {
                  useWidgetStyle(router);
                }, 3000)}
              />
            </I18n>
          </MaintenanceMode>
        </PackageFeatureProvider>
      </ApolloProvider>
    </PageTransition>
  )
}

export default MyApp;
