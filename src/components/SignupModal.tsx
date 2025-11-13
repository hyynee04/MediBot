import { motion } from "framer-motion"
import InputCustom from "./InputCustom"
import { useState } from "react"
interface SignUpModalProps {
    onClose: () => void;
    onOpenLogin: () => void;
}
const SignUpModal = ({ onClose, onOpenLogin }: SignUpModalProps) => {
    const [name, setName] = useState("")
    const [mail, setMail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState("")
    const handleSignup = () => {
    }
    const handleGotoLogin = () => {
        onClose();
        onOpenLogin();
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
                    <p className=" text-primary-black text-xl font-bold">Đăng Ký</p>
                    <InputCustom
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value)
                            setError("")
                        }}
                    />
                    <InputCustom
                        type="text"
                        placeholder="Mail"
                        value={mail}
                        onChange={(e) => {
                            setMail(e.target.value)
                            setError("")
                        }}
                    />
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
                    <InputCustom
                        type="password"
                        placeholder="Confirm pasword"
                        value={confirmPassword}
                        onChange={(e) => {
                            setConfirmPassword(e.target.value)
                            setError("")
                        }}
                    />
                    {error && <p className="w-full align-baseline text-primary-red">{error}</p>}
                    <button
                        onClick={() => handleSignup()}
                        className="text-sm font-bold text-primary-white align-middle rounded-full 
                        bg-gradient-to-b from-primary-purple to-second-purple w-full p-4
                        transform transition-all duration-300 hover:scale-105 cursor-pointer">
                        Đăng Ký
                    </button>
                    <p className="text-primary-grey">Bạn đã có tài khoản? <a onClick={() => handleGotoLogin()} className=" transform transition-all duration-300 font-bold hover:underline cursor-pointer">Đăng nhập.</a></p>
                </motion.div>
            </div>
        </>
    )
}
export default SignUpModal