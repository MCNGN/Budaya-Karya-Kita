interface EventProps {
    eventName:string;
}


export default function EventCard({ eventName }: EventProps) {
    return (
        <div className="flex-col bg-lime-400 h-[360] w-[314] rounded-lg overflow-hidden mr-10">
            <div className="h-[290]"></div>
            <div className="flex h-[70] bg-black text-white justify-between items-center p-5">
                <div className="">{eventName}</div>
                <div className="">→</div>
            </div>
        </div>
    )
};
