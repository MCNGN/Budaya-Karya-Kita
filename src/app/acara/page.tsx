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
    <div>
      <Header />
      <div className="h-screen pl-12 pt-8 ">
        <div className="w-[500] mb-20">
          <div className="text-2xl">
            Dukung dan kunjungi acara budaya terdekat denganmu.
          </div>
        </div>
        <div className="flex">
          {dummyEvent.map((event, index) => (
            <EventCard key={index} name={event.eventName} />
          ))}
        </div>
      </div>
    </div>
  );
}
