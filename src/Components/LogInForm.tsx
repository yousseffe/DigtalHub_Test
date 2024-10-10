import { useState } from "react";
import { CardWrapper } from "./CardWrapper";
import { Input } from "./Input";
import { useNavigate } from "react-router-dom";
type user ={
    username: string;
    email: string;
    password: string;
}
export const LogInForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        identifier: "",
        password: ""
    });

    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        const usernameRegex = /^[a-zA-Z0-9_]{3,}$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (
            !formData.identifier ||
            (!usernameRegex.test(formData.identifier) && !emailRegex.test(formData.identifier))
        ) {
            return "Please enter a valid username or email.";
        }

        if (formData.password.length < 6) return "Password must be at least 6 characters.";
        return "";
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const validationError = validateForm();
        if (validationError) {
            setError(validationError);
            setSuccess("");
            return;
        }
        const existingUsers : user[] = JSON.parse(localStorage.getItem("users") || "[]");
        const foundUser = existingUsers.find(
            (user: user) =>
                (user.username === formData.identifier ||
                    user.email === formData.identifier) &&
                user.password === formData.password
        );

        if (!foundUser) {
            setError("Invalid username/email or password.");
            setSuccess("");
            return;
        }

        localStorage.setItem("loggedInUser", JSON.stringify(foundUser.username));
        setError("");
        setSuccess("Login successful!");
        navigate("/");
    };

    return (
        <CardWrapper
            headerLabel="Log in to your account"
            backButtonLabel="Don't have an account?"
            backButtonHerf="/SignUp"
        >
            <p className="text-center text-2xl p-0 font-semibold">Login Form</p>
            <form className="space-y-6 px-3" onSubmit={handleSubmit}>
                <div className="space-y-4 mb-4">
                    <Input
                        label="Username or Email"
                        name="identifier"
                        value={formData.identifier}
                        placeholder="Your username or email"
                        regex={/.*/}
                        errorMessage=""
                        onChange={handleChange}
                    />
                    <Input
                        label="Password"
                        name="password"
                        type="password"
                        value={formData.password}
                        placeholder="********"
                        regex={/^.{6,}$/}
                        errorMessage="Password must be at least 6 characters."
                        onChange={handleChange}
                    />
                </div>
                {error && <p className="text-red-500">{error}</p>}
                {success && <p className="text-green-500">{success}</p>}
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                >
                    Login
                </button>
            </form>
        </CardWrapper>
    );
};
