import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "../pages/HomePage";

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" exact element={<HomePage />}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter;