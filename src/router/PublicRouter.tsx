import { FC } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";


const PublicRouter: FC = () => {
    return (
        <Routes>
            <Route index element={<Home />} />
        </Routes>
    );
};

export default PublicRouter;
