import { useSelector } from "react-redux";
import { selectUser } from "../store/userSlice";
import NewsComponent from "../components/News.jsx";
import React, { useState } from "react";
const Home = () => {
    const { payload: user } = useSelector(selectUser);

    return (
        <div className="w-full min-h-screen pt-8 px-4">
            <NewsComponent />
        </div>
    );
};

export default Home;
