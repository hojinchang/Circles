import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/SignUpPage";

const AppRouter = () => {
    const user = false;

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" exact element={user ? <HomePage /> : <LoginPage />}></Route>
                <Route path="/login" exact element={user ? <Navigate to="/" /> : <LoginPage />}></Route>
                <Route path="/sign-up" exact element={<SignUpPage />}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter;