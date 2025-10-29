interface QuestionItemProps{
    question: string;
}

const QuestionItem = ({question}: QuestionItemProps) => {
    return (
        <div className="w-full h-fit flex justify-end">
            <p className="bg-primary-white px-4 py-2 rounded-2xl max-w-2/3">{question}</p>
        </div>
    )
}

export default QuestionItem