import { ShipmentTracker } from "@sirclo/nexus";

const classesTrackerPage = {
  shipmentHeaderClassName: "track-shipment__header rounded-none px-10 py-8",
  shipmentBodyClassName: "track-shipment__body d-flex justify-content-center",
  shipmentFooterClassName: "track-shipment__footer d-flex justify-content-center text-center",
  shipmentTrackingClassName: "track-shipment__tracking",
  shipmentHeaderTextClassName: "track-shipment__headerText",
  shipmentTextClassName: "track-shipment__text",
  shipmentListClassName: "track-shipment__list",
  shipmentListWrapperClassName: "track-shipment__listWrapper",
  shipmentCloseIconClassName: "track-shipment__closeIcon",
  shipmentTrackButtonClassName: "track-shipment__trackButton btn btn-orange",
};
const TrackerPage = ({ order_token }) => {

  return (
    <ShipmentTracker
      token={order_token}
      iconTracker={
        <img
          className="mr-2"
          src={"/images/order_track.svg"}
          alt="order_track"
        />
      }
      classes={classesTrackerPage}
    />
  );
};

export async function getServerSideProps({ params }) {
  const lng = params.lng == "en" ? "en" : "id";

  const { default: lngDict = {} } = await import(
    `locales/${lng}.json`
  );

  return {
    props: { lng: lng, lngDict, order_token: params.token },
  };
}

export default TrackerPage;
