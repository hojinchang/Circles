import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" exact element={<HomePage />}></Route>
                <Route path="/login" exact element={<LoginPage />}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter;