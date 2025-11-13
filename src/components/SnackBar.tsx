import { LuPanelLeftClose, LuPanelLeftOpen, LuSquarePen, LuLogOut, LuUser } from "react-icons/lu";
import HistoryItem from "../components/HistoryItem";
import { useNavigate } from "react-router-dom";
import { paths } from "../routes/paths";

interface SidebarProps {
    isOpenMenu: boolean;
    setIsOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
    setListContent: React.Dispatch<React.SetStateAction<void>>;
};

const SideBar = ({ isOpenMenu, setIsOpenMenu, setListContent }: SidebarProps) => {
    const navigate = useNavigate()
    const handleGotoLogin = () => {
        navigate(paths.root)
    }
    return (
        <div
            className={`
                h-screen py-4 px-2 flex-col justify-between z-2
                ${isOpenMenu
                    ? 'w-[260px] flex md:relative fixed bg-background-white'
                    : 'w-fit md:flex hidden'}
            `}
        >
            <div className="flex flex-col gap-4">
                <div className="flex flex-row justify-between items-center">
                    <p className={`px-2 text-lg font-bold ${isOpenMenu ? 'block' : 'hidden'}`}>MediBot</p>
                    <div className={`p-2 hover:bg-stroke-grey rounded-lg cursor-pointer ${isOpenMenu ? 'block' : 'hidden'}`} onClick={() => setIsOpenMenu(false)}>
                        <LuPanelLeftClose size={18} />
                    </div>
                    <div className={`p-2 hover:bg-stroke-grey rounded-lg cursor-pointer ${isOpenMenu ? 'hidden' : 'block'}`} onClick={() => setIsOpenMenu(true)}>
                        <LuPanelLeftOpen size={18} />
                    </div>
                </div>
                <div className="p-2 flex flex-row items-center gap-2 hover:bg-stroke-grey rounded-lg cursor-pointer" onClick={() => setListContent()}>
                    <LuSquarePen size={18} />
                    <p className={`text-sm ${isOpenMenu ? 'block' : 'hidden'}`}>New chat</p>
                </div>
                <div className={`flex-col h-full ${isOpenMenu ? 'flex' : 'hidden'}`}>
                    <p className="px-2 pb-2 text-primary-grey">Histories</p>
                    <HistoryItem text="Đoạn chat số 1" />
                    <HistoryItem text="Đoạn chat số 2" />
                    <HistoryItem text="Đoạn chat số 3" />
                </div>
            </div>
            <div className="flex flex-col gap-4">
                <span className={`w-full h-px ${isOpenMenu ? "bg-stroke-grey" : "bg-second-purple"}`} />
                <div className="flex flex-row justify-between items-center">
                    <div className={`flex flex-row items-center gap-2 ${isOpenMenu ? 'block' : 'hidden'}`}>
                        <span className="p-2 bg-stroke-grey rounded-full">
                            <LuUser />
                        </span>
                        <p className="text-sm">Guest</p>
                    </div>
                    <div className="p-2 hover:bg-stroke-grey rounded-lg cursor-pointer" onClick={() => handleGotoLogin()}>
                        <LuLogOut size={18} />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default SideBar