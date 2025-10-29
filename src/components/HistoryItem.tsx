interface HistoryItemProps {
    text: string;
}
const HistoryItem = ({ text }: HistoryItemProps) => {
    return (
        <div className="p-2 flex flex-row items-center gap-2 hover:bg-stroke-grey rounded-lg cursor-pointer">
            <p className="text-sm overflow-hidden text-ellipsis whitespace-nowrap">{text}</p>
        </div>
    )
}
export default HistoryItem