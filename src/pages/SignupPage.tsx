import { useNavigate } from "react-router-dom"
import { paths } from "../routes/paths"
import { motion } from "framer-motion"
import InputCustom from "../components/InputCustom"
import { useState } from "react"

const SignupPage = () => {
    const navigate = useNavigate()
    const [name, setName] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState("")
    const handleSignup = () => {
        navigate(paths.root)
    }
    const handleGotoLogin = () => {
        navigate(paths.login)
    }
    return (
        <>
            <div className="h-screen w-screen flex items-center justify-center bg-background-white">
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="w-[400px] bg-primary-white rounded-3xl p-12 flex flex-col items-center justify-center gap-6">
                    <p className=" text-primary-black text-xl font-bold">Sign Up</p>
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
                        className="text-sm font-bold text-primary-white align-middle rounded-full 
                        bg-gradient-to-b from-primary-purple to-second-purple w-full p-4
                        transform transition-all duration-300 hover:scale-105 cursor-pointer">
                        Signup
                    </button>
                    <p className="text-primary-grey">Already have an account? <a onClick={() => handleGotoLogin()} className=" transform transition-all duration-300 font-bold hover:underline cursor-pointer">Log in</a></p>
                </motion.div>
            </div>
        </>
    )
}
export default SignupPage