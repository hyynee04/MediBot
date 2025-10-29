import { LuPanelLeftClose, LuPanelLeftOpen, LuSquarePen, LuLogOut, LuSendHorizontal } from "react-icons/lu";
import HistoryItem from "../components/HistoryItem";
import { useNavigate } from "react-router-dom";
import { paths } from "../routes/paths";
import QuestionItem from "../components/QuestionItem";
import AnswerItem from "../components/AnswerItem";
const ChatPage = () => {
    const navigate = useNavigate()
    const handleGotoLogin = () => {
        navigate(paths.login)
    }
    return (
        <div className="w-screen h-screen flex flex-row">
            <div className="md:w-[260px] w-fit h-screen bg-background-white py-4 px-2 flex flex-col justify-between">
                <div className="flex flex-col gap-4">
                    <div className="flex flex-row justify-between items-center">
                        <p className="px-2 text-lg font-bold md:block hidden">MediBot</p>
                        <div className="p-2 hover:bg-stroke-grey rounded-lg cursor-pointer">
                            <LuPanelLeftClose size={18} />
                        </div>
                        {/* <LuPanelLeftOpen /> */}
                    </div>
                    <div className="p-2 flex flex-row items-center gap-2 hover:bg-stroke-grey rounded-lg cursor-pointer">
                        <LuSquarePen size={18} />
                        <p className="text-sm md:block hidden">New chat</p>
                    </div>
                    <div className="md:flex hidden flex-col h-full">
                        <p className="px-2 pb-2 text-primary-grey">Histories</p>
                        <HistoryItem text="Đoạn chat số 1aaaaaaaaaaaaaaaaaaaaaaaa" />
                        <HistoryItem text="Đoạn chat số 2" />
                        <HistoryItem text="Đoạn chat số 3" />
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <span className="w-full h-px bg-stroke-grey" />
                    <div className="flex flex-row justify-between items-center">
                        <p className="px-2 text-sm md:block hidden">Your name</p>
                        <div className="p-2 hover:bg-stroke-grey rounded-lg cursor-pointer" onClick={() => handleGotoLogin()}>
                            <LuLogOut size={18} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full h-screen flex flex-col items-center justify-end bg-gradient-to-b from-primary-white to-primary-purple">
                <p className="w-full p-4 text-lg font-bold text-primary-black ">Tiêu đề đoạn chat</p>
                <span className="w-full h-px bg-stroke-grey" />
                <div className="w-full h-full overflow-y-scroll flex justify-center pl-2">
                    <div className="flex flex-col gap-6 lg:w-[720px] w-full">
                        <QuestionItem question="Chào bác sĩ ảo, dạo gần đây tôi hay bị ho khan, có thể là bệnh gì vậy?" />
                        <AnswerItem answer="
                     Chào bạn 👋
                            Ho khan có thể do nhiều nguyên nhân như:

                            Viêm họng, cảm lạnh hoặc dị ứng thời tiết

                            Viêm phế quản nhẹ

                            Hút thuốc lá hoặc hít phải khói bụi
                            Tuy nhiên, nếu ho kéo dài trên 2 tuần, bạn nên đến cơ sở y tế để kiểm tra phổi nhé 🩺
                    "/>
                        <QuestionItem question="Tôi còn bị sốt nhẹ và đau đầu, có thể là cảm cúm không?" />
                        <AnswerItem
                            answer="Vâng, các triệu chứng bạn mô tả (ho, sốt nhẹ, đau đầu) rất giống cảm cúm thông thường.
                        Bạn nên:

                        Nghỉ ngơi, uống đủ nước

                        Uống thuốc hạ sốt nếu nhiệt độ > 38°C

                        Nếu sốt cao hơn 39°C hoặc khó thở → nên đi khám sớm."
                        />
                        <QuestionItem question="Chào bác sĩ ảo, dạo gần đây tôi hay bị ho khan, có thể là bệnh gì vậy?" />
                        <AnswerItem answer="
                     Chào bạn 👋
                            Ho khan có thể do nhiều nguyên nhân như:

                            Viêm họng, cảm lạnh hoặc dị ứng thời tiết

                            Viêm phế quản nhẹ

                            Hút thuốc lá hoặc hít phải khói bụi
                            Tuy nhiên, nếu ho kéo dài trên 2 tuần, bạn nên đến cơ sở y tế để kiểm tra phổi nhé 🩺
                    "/>
                        <QuestionItem question="Tôi còn bị sốt nhẹ và đau đầu, có thể là cảm cúm không?" />
                        <AnswerItem
                            answer="Vâng, các triệu chứng bạn mô tả (ho, sốt nhẹ, đau đầu) rất giống cảm cúm thông thường.
                        Bạn nên:

                        Nghỉ ngơi, uống đủ nước

                        Uống thuốc hạ sốt nếu nhiệt độ > 38°C

                        Nếu sốt cao hơn 39°C hoặc khó thở → nên đi khám sớm."
                        />
                        <QuestionItem question="Chào bác sĩ ảo, dạo gần đây tôi hay bị ho khan, có thể là bệnh gì vậy?" />
                        <AnswerItem answer="
                     Chào bạn 👋
                            Ho khan có thể do nhiều nguyên nhân như:

                            Viêm họng, cảm lạnh hoặc dị ứng thời tiết

                            Viêm phế quản nhẹ

                            Hút thuốc lá hoặc hít phải khói bụi
                            Tuy nhiên, nếu ho kéo dài trên 2 tuần, bạn nên đến cơ sở y tế để kiểm tra phổi nhé 🩺
                    "/>
                        <QuestionItem question="Tôi còn bị sốt nhẹ và đau đầu, có thể là cảm cúm không?" />
                        <AnswerItem
                            answer="Vâng, các triệu chứng bạn mô tả (ho, sốt nhẹ, đau đầu) rất giống cảm cúm thông thường.
                        Bạn nên:

                        Nghỉ ngơi, uống đủ nước

                        Uống thuốc hạ sốt nếu nhiệt độ > 38°C

                        Nếu sốt cao hơn 39°C hoặc khó thở → nên đi khám sớm."
                        />
                    </div>
                </div>
                <div className="lg:w-[720px] w-full py-4">
                    <div className="rounded-full bg-background-white opacity-70 flex flex-row items-center">
                        <input
                            placeholder="Ask me..."
                            className=" text-primary-black text-sm p-4 w-full focus:outline-none"
                        />
                        <div className="mr-2 p-2 hover:bg-stroke-grey rounded-full cursor-pointer" onClick={() => handleGotoLogin()}>
                            <LuSendHorizontal size={24} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ChatPage