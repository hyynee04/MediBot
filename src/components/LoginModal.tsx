import { motion } from "framer-motion"
import InputCustom from "./InputCustom"
import { useNavigate } from "react-router-dom"
import { paths } from "../routes/paths"
import { useState } from "react"
interface LoginModalProps {
    onClose: () => void;
    onOpenSignup: () => void;
}
const LoginModal = ({ onClose, onOpenSignup }: LoginModalProps) => {
    const navigate = useNavigate()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const handleLogin = () => {
        if (username == "username" && password == "password") {
            onClose();
            navigate(paths.chatbot)
        } else {
            setError("Sai username/password")
        }
    }
    const handleGotoSignup = () => {
        onClose();
        onOpenSignup();
    }
    return (
        <>
            <div className="fixed inset-0 z-50 flex items-center justify-center">
                {/* Overlay xám mờ */}
                <div
                    className="absolute inset-0 bg-black/50"
                    onClick={onClose} // Bấm vào overlay để đóng modal
                />

                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative w-full max-w-[400px] bg-primary-white rounded-3xl p-12 flex flex-col items-center justify-center gap-6">
                    <p className=" text-primary-black text-xl font-bold">Đăng Nhập</p>
                    <InputCustom
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => {
                            setUsername(e.target.value)
                            setError("")
                        }}
                    />
                    <InputCustom
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value)
                            setError("")
                        }}
                    />
                    {error && <p className="w-full align-baseline text-primary-red">{error}</p>}
                    <button
                        className="text-sm font-bold text-primary-white align-middle rounded-full 
                        bg-gradient-to-b from-primary-purple to-second-purple w-full p-4
                        transform transition-all duration-300 hover:scale-105 cursor-pointer"
                        onClick={() => handleLogin()}
                    >
                        Đăng Nhập
                    </button>
                    <p className="text-primary-grey">Bạn chưa có tài khoản? <a onClick={() => handleGotoSignup()} className=" transform transition-all duration-300 font-bold hover:underline cursor-pointer">Đăng ký ngay.</a></p>
                </motion.div>
            </div>
        </>
    )
}
export default LoginModal