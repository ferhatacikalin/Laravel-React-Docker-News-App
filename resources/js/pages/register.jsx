import { useState } from "react";
import { register } from "../services/authService";
import { useNavigate } from "react-router-dom";
import Input from "../components/input";

const Register = () => {
    const navigation = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password_confirmation, setPasswordConfirm] = useState("");

    const [errors, setErrors] = useState([]);

    const submitHandle = async (e) => {
        e.preventDefault();
        await register({
            name: name,
            email: email,
            password: password,
            password_confirmation: password_confirmation,
        })
            .then(() => navigation("/"))
            .catch((error) => setErrors(error.response.data.errors));
    };

    return (
        <>
            <section className="bg-white">
                <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
                    <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
                        <img
                            alt="Night"
                            src="https://source.unsplash.com/960x1080/?landscape"
                            className="absolute inset-0 h-full w-full object-cover opacity-80"
                        />

                        <div className="hidden lg:relative lg:block lg:p-12">
                            <h2 className="mt-6 text-4xl font-light text-lblack sm:text-3xl md:text-4xl">
                                Welcome to LemonNews
                            </h2>
                        </div>
                    </section>

                    <main
                        aria-label="Main"
                        className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
                    >
                        <div className="max-w-xl lg:max-w-3xl">
                            <div className="relative -mt-16 block lg:hidden">
                                <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                                    Welcome to LemonNews
                                </h1>
                            </div>

                            <form
                                onSubmit={submitHandle}
                                className="mt-8 grid grid-cols-6 gap-6"
                            >
                                <div className="col-span-6">
                                    <label
                                        htmlFor="Email"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Name
                                    </label>

                                    <input
                                        type="text"
                                        id="Name"
                                        name="Name"
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
                                        className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                                    />
                                    {errors["name"] ?? (
                                        <span className="text-orange-500 text-xs">
                                            {errors["name"]}
                                        </span>
                                    )}
                                </div>
                                <div className="col-span-6">
                                    <label
                                        htmlFor="Email"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Email
                                    </label>

                                    <input
                                        type="email"
                                        id="Email"
                                        name="email"
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                                    />
                                    {errors["email"] ?? (
                                        <span className="text-orange-500 text-xs">
                                            {errors["email"]}
                                        </span>
                                    )}
                                </div>

                                <div className="col-span-6 ">
                                    <label
                                        htmlFor="Password"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Password
                                    </label>

                                    <input
                                        type="password"
                                        id="Password"
                                        name="password"
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        error={errors["email"] ?? null}
                                        className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                                    />
                                    {errors["password"] ?? (
                                        <span className="text-orange-500 text-xs">
                                            {errors["password"]}
                                        </span>
                                    )}
                                </div>
                                <div className="col-span-6 ">
                                    <label
                                        htmlFor="Password"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Confirm Password
                                    </label>

                                    <input
                                        type="password"
                                        id="Password"
                                        name="password"
                                        onChange={(e) =>
                                            setPasswordConfirm(e.target.value)
                                        }
                                        error={errors["password_confirmation"] ?? null}
                                        className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                                    />
                                    {errors["password"] ?? (
                                        <span className="text-orange-500 text-xs">
                                            {errors["password_confirmation"]}
                                        </span>
                                    )}
                                </div>
                                <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                                    <button
                                        type="submit"
                                        className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
                                    >
                                        Register
                                    </button>

                                    <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                                        <a
                                            href="/login"
                                            className="text-gray-700 underline"
                                        >
                                            Login
                                        </a>
                                        .
                                    </p>
                                </div>
                            </form>
                        </div>
                    </main>
                </div>
            </section>
        </>
    );
};

export default Register;
