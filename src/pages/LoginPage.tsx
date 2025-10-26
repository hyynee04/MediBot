import { motion } from "framer-motion"
import InputCustom from "../components/InputCustom"
import { useNavigate } from "react-router-dom"
import { paths } from "../routes/paths"
import { useState } from "react"

const LoginPage = () => {
    const navigate = useNavigate()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const handleLogin = () => {
        if (username == "username" && password == "password") {
            navigate(paths.root)
        } else {
            setError("Sai username/password")
        }
    }
    const handleGotoSignup = () => {
        navigate(paths.signup)
    }
    return (
        <>
            <div className="h-screen w-screen flex items-center justify-center bg-background-white">
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="w-[400px] bg-primary-white rounded-3xl p-12 flex flex-col items-center justify-center gap-6">
                    <p className=" text-primary-black text-xl font-bold">Log In</p>
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
                        Login
                    </button>
                    <p className="text-primary-grey">Don’t have an account? Please <a onClick={() => handleGotoSignup()} className=" transform transition-all duration-300 font-bold hover:underline cursor-pointer">Sign up</a></p>
                </motion.div>
            </div>
        </>
    )
}
export default LoginPage