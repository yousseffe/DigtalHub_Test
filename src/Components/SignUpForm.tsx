import { useState } from "react";
import { CardWrapper } from "./CardWrapper";
import { Input } from "./Input"; 
import { log } from "console";

type user ={
  username: string;
  email: string;
  password: string;
}
export const SignUpForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!formData.username || !formData.email.includes("@") || formData.password.length < 6) return "Missed Data";
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
    const isUserExists = existingUsers.some(
      (user: user) =>
        user.username === formData.username || user.email === formData.email
    );

    if (isUserExists) {
      setError("User with this username or email already exists.");
      setSuccess("");
      return;
    }

    const newUser : user ={...formData} 

    localStorage.setItem("users", JSON.stringify([...existingUsers, newUser]));

    setError("");
    setSuccess("Signup successful! Please log in.");
    setFormData({
      username: "",
      email: "",
      password: "",
    });
  };

  return (
    <CardWrapper
      headerLabel="Create an account"
      backButtonLabel="Already have an account?"
      backButtonHerf="/Login"
    >
      <p className="text-center text-2xl p-0 font-semibold">Signup Form</p>
      <form className="space-y-6 px-3" onSubmit={handleSubmit}>
        <div className="space-y-4 mb-4">
          <Input
            label="Username"
            name="username"
            value={formData.username}
            placeholder="Your username"
            regex={/^[a-zA-Z0-9_]{3,}$/} 
            errorMessage="Username must be at least 3 characters."
            onChange={handleChange}
          />
          <Input
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            placeholder="Your email"
            regex={/^[^\s@]+@[^\s@]+\.[^\s@]+$/} 
            errorMessage="Please enter a valid email address."
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
          Signup
        </button>
      </form>
    </CardWrapper>
  );
};
