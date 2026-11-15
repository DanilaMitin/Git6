import { useState } from 'react';
import { useNavigate } from "react-router";
import styles from '../styles/Login.module.css'


function Login() {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();


    async function loginSubmit(e) {
        e.preventDefault();
        setMessage("");
        try {
            const response = await fetch(
                "http://localhost:8080/api/auth/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type" : "application/json"
                    },
                    body: JSON.stringify({
                        email,
                        password,
                    }),
                }
            );




            if(!response.ok) {
                const data = await response.json();
                setMessage(data.message || "Ошибка сервера");
                return;
            }
            
            const token = await response.text();
            localStorage.setItem('token',token);
            navigate("/")
        } catch(error) {
            setMessage("Не удалось подключиться к серверу");
        }
    }



  return(
    <div className={styles.loginPage}>
        <form onSubmit={loginSubmit}>
            <h2>Вход</h2>
            <label>Email</label>
            <div><input type = "email" value={email} onChange={(e) => setEmail(e.target.value)} required /></div>
            <label>Пароль</label>
            <div><input type = "password" value={password} onChange={(e) => setPassword(e.target.value)} required /></div>
            <input className = {styles.loginButton} type='submit' value='Вход' />
        </form>
        <button onClick = {() => navigate("/register")}>Регистрация</button>
        {(message !== "") && <div className={styles.message}>{message}</div>}
    </div>
  );
}

export default Login
