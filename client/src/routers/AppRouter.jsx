import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/SignUpPage";

const AppRouter = () => {
    const user = false;

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" exact element={<HomePage />}></Route>
                <Route path="/login" exact element={<LoginPage />}></Route>
                <Route path="/sign-up" exact element={<SignUpPage />}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter;