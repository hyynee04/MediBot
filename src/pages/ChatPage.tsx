import { LuSquarePen, LuSendHorizontal, LuMenu } from "react-icons/lu";
import QuestionItem from "../components/QuestionItem";
import AnswerItem from "../components/AnswerItem";
import { useState } from "react";
import SideBar from "../components/SnackBar";

interface Content {
    id: number,
    ask: string,
    answer: string
}
const ChatPage = () => {
    const [isOpenMenu, setIsOpenMenu] = useState(true);
    const [listContent, setListContent] = useState<Content[]>([]);
    const handleSend = () => {
        const newItem = {
            id: listContent.length + 1,
            ask: "Chào bác sĩ ảo, dạo gần đây tôi hay bị ho khan, có thể là bệnh gì vậy?",
            answer: `Chào bạn 👋
                            Ho khan có thể do nhiều nguyên nhân như:

                            Viêm họng, cảm lạnh hoặc dị ứng thời tiết

                            Viêm phế quản nhẹ

                            Hút thuốc lá hoặc hít phải khói bụi
                            Tuy nhiên, nếu ho kéo dài trên 2 tuần, bạn nên đến cơ sở y tế để kiểm tra phổi nhé 🩺`
        }
        setListContent([...listContent, newItem])
    }
    return (
        <div className="w-screen h-screen flex flex-row bg-linear-to-b from-primary-white to-primary-purple">
            <SideBar isOpenMenu={isOpenMenu} setIsOpenMenu={setIsOpenMenu} setListContent={()=>setListContent([])}/>
            {isOpenMenu &&
                <span className="fixed inset-0 bg-primary-white opacity-50 z-1 md:hidden" onClick={() => setIsOpenMenu(false)} />
            }
            <div className="w-full h-screen flex flex-col items-center justify-end ">
                <div className="w-full p-4 text-lg font-bold text-primary-black md:hidden flex flex-row justify-between items-center">
                    <div className="w-fit p-2 hover:bg-stroke-grey rounded-lg cursor-pointer" onClick={() => setIsOpenMenu(true)}>
                        <LuMenu size={18} />
                    </div>
                    <div className="w-fit p-2 hover:bg-stroke-grey rounded-lg cursor-pointer" onClick={() => setListContent([])}>
                        <LuSquarePen size={18} />
                    </div>
                </div>
                <div className="w-full h-full flex flex-col justify-center items-center">
                    <div className={`w-full ${listContent.length > 0 ? 'h-full' : 'h-fit'} overflow-y-scroll flex justify-center pl-2`}>
                        {listContent.length == 0 ?
                            <div className="text-center text-lg">
                                <p>Chào bạn mình là <span className="font-bold">MediBot</span></p>
                                <p>Hãy nói với mình triệu chứng hoặc bệnh bạn muốn tìm hiểu nhé!</p>
                            </div>
                            :
                            <div className="flex flex-col gap-6 lg:w-[720px] w-full p-4">
                                {listContent.map(item =>
                                    <>
                                        <QuestionItem question={item.ask} />
                                        <AnswerItem answer={item.answer} />
                                    </>
                                )}
                            </div>
                        }
                    </div>
                    <div className="lg:w-[720px] w-full p-4">
                        <div className="rounded-full bg-background-white opacity-70 flex flex-row items-center">
                            <input
                                placeholder="Ask me..."
                                className=" text-primary-black text-sm p-4 w-full focus:outline-none"
                            />
                            <div className="mr-2 p-2 hover:bg-stroke-grey rounded-full cursor-pointer" onClick={() => handleSend()}>
                                <LuSendHorizontal size={24} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ChatPage