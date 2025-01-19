import { MapPinIcon, CalendarDaysIcon } from "@heroicons/react/24/outline";

interface EventProps {
  name: string;
  location: string;
  date: string;
}

export default function EventCard({ name, location, date }: EventProps) {
  return (
    <div className="flex flex-col  h-[360px] sm:h-[400px] sm:w-[500px] rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300 ">
      <div className="h-[290px] sm:h-[340px] bg-gray-300"></div>
      <div className="flex flex-col h-[100px]  p-4">
        <div className="text-lg font-medium">{name}</div>
        <div className="flex items-center">
          <MapPinIcon className="size-3 mr-1" />
          {location}
        </div>
        <div className="flex items-center">
          <CalendarDaysIcon className="size-3 mr-1" />
          {date}
        </div>
      </div>
    </div>
  );
}
