import { NextRouter } from "next/router";
import { useEffect } from "react";

const handleWidgetStyle = (router: NextRouter, widget) => {
  const checkoutPage = ['place_order', 'cart', 'payment_method', 'shipping_method']
  const pathName = router?.pathname?.replace('/[lng]/', '');

  if(widget){
    if(checkoutPage.includes(pathName)) widget.className = "d-none";
    else widget.className = "widget";
  }
}

export const useWidgetStyle = (router: NextRouter) => {
  let widget = typeof window === 'object' ? document.querySelectorAll("[id*=\"gb-widget-\"]")?.[0] : null;
  handleWidgetStyle(router, widget)
}

export const useHookWidgetStyle = (router: NextRouter) => {
  const widget = typeof window === 'object' ? document.querySelectorAll("[id*=\"gb-widget-\"]")?.[0] : null;
  useEffect(() => {
    handleWidgetStyle(router, widget)
  }, [widget]);

}
