import EventCard from "../components/EventCard";
import Header from "../components/Header";

const dummyEvent = [
  {
    eventName: "Festival Bangau",
  },
  {
    eventName: "Event Game",
  },
  {
    eventName: "Festival Budaya",
  },
  {
    eventName: "Pameran Batik",
  },
];

export default function Event() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-col px-4 pt-2 sm:px-12 font-inter">
        <div className="w-full max-w-md sm:max-w-lg mb-8">
          <div className="text-xl sm:text-3xl ">
            Dukung dan kunjungi acara budaya terdekat denganmu.
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-center sm:justify-normal gap-4 mb-4 sm:gap-6">
          {dummyEvent.map((event, index) => (
            <EventCard key={index} name={event.eventName} />
          ))}
        </div>
      </div>
    </div>
  );
}
