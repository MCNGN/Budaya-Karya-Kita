import { ChevronDoubleRightIcon } from "@heroicons/react/24/solid";

interface EventProps {
  name: string;
}

export default function EventCard({ name }: EventProps) {
  return (
    <div className="flex flex-col bg-lime-400 h-[360px] sm:h-[400px] sm:w-[500px] rounded-lg overflow-hidden shadow-lg">
      <div className="h-[290px] sm:h-[340px] bg-gray-300"></div>
      <div className="flex h-[70px] bg-black text-white justify-between items-center p-4">
        <div className="text-lg">{name}</div>
        <ChevronDoubleRightIcon className="size-6" />
      </div>
    </div>
  );
}
