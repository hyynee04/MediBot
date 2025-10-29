interface AnswerItemProps {
    answer: string;
}

const AnswerItem = ({ answer }: AnswerItemProps) => {
    return (
        <div className="w-full h-fit flex">
            <p className="">{answer}</p>
        </div>
    )
}

export default AnswerItem