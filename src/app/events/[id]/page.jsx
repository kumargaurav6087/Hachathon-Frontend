import EventDetails from "@/components/EventDetails/EventDetails";

const EventDetailsPage = async ({ params }) => {
  const { id } = await params;

  return <EventDetails eventId={id} />;
};

export default EventDetailsPage;