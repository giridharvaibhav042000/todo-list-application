import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`https://todo-list-application-sepia.vercel.app/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (res.ok) {
      alert("User created successfully!");
      navigate("/login");
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="app-container">
        <Header/>

    <form className="todo-form__wrapper" onSubmit={handleRegister}>
        <div className="todo-form__right">
            <label htmlFor="register-email">Email Address</label>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                id="register-email"
            />
            <label htmlFor="register-password">Password</label>
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                id="register-password"
            />
            <div className="action-buttons">
            <button type="submit">Register</button>
            

            </div>
        </div>
    </form>
    </div>
  );
};

export default Register;
