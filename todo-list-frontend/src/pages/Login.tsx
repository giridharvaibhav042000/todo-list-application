import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
interface LoginProps {
  onLogin: () => void;
}
const Login = ({ onLogin }: LoginProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await fetch(`https://todo-list-application-sepia.vercel.app/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Login failed");
        return;
      }

      // STORE token for future API calls
      localStorage.setItem("token", data.token);
      onLogin();
      navigate("/");

    } catch (err) {
      console.error(err);
      alert("Login error");
    }
  };

  return (
    <div className="app-container">
        <Header/>
        <div className="todo-form__wrapper">
            <div className="todo-form__right">
                <label htmlFor="login-email-address">Email</label>
                <input placeholder="Email" onChange={e => setEmail(e.target.value)} id="login-email-address"/>
                <label htmlFor="login-password">Password</label>
                <input placeholder="Password" type="password" onChange={e => setPassword(e.target.value)} id="login-password" />
                <div className="action-buttons">
                    <button onClick={handleLogin}>Login</button>
                    <Link to={'/register'}>Register</Link>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Login;
