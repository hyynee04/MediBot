import { Route, Routes } from "react-router-dom";
import { paths } from "./paths";
import ChatPage from "../pages/ChatPage";
import HomePage from "../pages/HomePage";
import ProtectedRoute from "./ProtectedRoutes";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path={paths.root} element={<HomePage />} />
      <Route path={paths.login} element={<HomePage />} />
      <Route path={paths.signup} element={<HomePage />} />

      <Route element={<ProtectedRoute />}>
        <Route path={paths.chatbot} element={<ChatPage />} />
      </Route>

    </Routes>
  );
}

export default AppRoutes