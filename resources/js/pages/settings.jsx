import { useSelector, useDispatch } from "react-redux";
import { selectUser, logout } from "../store/userSlice";
import {
    getCategories,
    selectCategories,
    selectSelectedCategories,
    setSelectedCategories,
} from "../store/categoriesSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Settings = () => {
    const { payload: user } = useSelector(selectUser);
    const categories = useSelector(selectCategories);
    const selectedCategories = useSelector(selectSelectedCategories);
    const dispatch = useDispatch();
    const navigation = useNavigate();
    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch]);
    const handleLogout = () => {
        dispatch(logout());
    };
    const handleToggleCategory = (category) => {
        const updatedSelectedCategories = [...selectedCategories];
        const categoryIndex = updatedSelectedCategories.indexOf(category);

        if (categoryIndex > -1) {
            // Category already selected, remove it
            updatedSelectedCategories.splice(categoryIndex, 1);
        } else {
            // Category not selected, add it
            updatedSelectedCategories.push(category);
        }

        dispatch(setSelectedCategories(updatedSelectedCategories));
    };

    return (
        <div className="w-1/2 min-h-screen pt-10 px-4 container mx-auto">
            <h1 className="text-2xl font-bold my-6 ">Preferences</h1>
            <div className="mt-6">
                <p>Select news categories:</p>
            </div>
            <div>
                {categories.map((category) => (
                    <div
                        key={category}
                        className={`mt-3 mr-3 text-lg inline-flex items-center font-bold leading-2xl uppercase px-3 py-1 ${
                            selectedCategories?.includes(category)
                                ? "bg-green-200 text-green-700"
                                : "bg-gray-200 text-gray-700"
                        } rounded-full cursor-pointer`}
                        onClick={() => handleToggleCategory(category)}
                    >
                        {category}
                    </div>
                ))}
            </div>
            <div className="mt-6 mb-3">
                <p>Account:</p>
            </div>
            <button
                class="inline-block rounded border border-red-600 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-600 hover:text-white focus:outline-none focus:ring active:bg-red-500"
                onClick={handleLogout}
            >
                Logout
            </button>
        </div>
    );
};

export default Settings;
