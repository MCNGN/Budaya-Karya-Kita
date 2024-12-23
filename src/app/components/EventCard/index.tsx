interface EventProps {
  name: string;
}

export default function EventCard({ name }: EventProps) {
  return (
    <div className="flex-col bg-lime-400 h-[360px] w-[314px] rounded-lg overflow-hidden mr-10">
      <div className="h-[290px]"></div>
      <div className="flex h-[70px] bg-black text-white justify-between items-center p-5">
        <div>{name}</div>
        <div>→</div>
      </div>
    </div>
  );
}
