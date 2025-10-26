import { Route, Routes } from "react-router-dom";
import { paths } from "./paths";
import ChatPage from "../pages/ChatPage";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path={paths.root} element={<ChatPage />} />
            <Route path={paths.login} element={<LoginPage />} />
            <Route path={paths.signup} element={<SignupPage />} />
        </Routes>
    );
}

export default AppRoutes