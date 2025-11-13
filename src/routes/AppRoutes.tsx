import { Route, Routes } from "react-router-dom";
import { paths } from "./paths";
import ChatPage from "../pages/ChatPage";
import LoginModal from "../components/LoginModal";
import SignUpModal from "../components/SignupModal";
import HomePage from "../pages/HomePage";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path={paths.root} element={<HomePage />} />
            <Route path={paths.login} element={<LoginModal />} />
            <Route path={paths.signup} element={<SignUpModal />} />
            <Route path={paths.chatbot} element={<ChatPage />} />
        </Routes>
    );
}

export default AppRoutes