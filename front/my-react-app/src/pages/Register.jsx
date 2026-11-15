import { useState } from 'react';
import { useNavigate } from "react-router";
import styles from '../styles/Register.module.css'

function Register() {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userName, setUserName] = useState("");
    const [image, setImage] = useState(null);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    async function registerSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append("userName", userName);
        formData.append("email", email);
        formData.append("password", password);

        if (image) {
            formData.append("image", image);
        }

        try {
            const response = await fetch(
                "http://localhost:8080/api/auth/register",
                {
                    method: "POST",
                    body: formData,
                }
            );

            const data = await response.json();
            
            if (response.status === 400) {
                setMessage("Введите кооректные данные")
                return;
            } else if (!response.ok) {
                setMessage(data.message || "Ошибка сервера")
                return;
            }
            navigate("/login");

        } catch(error) {
            setMessage("Не удалось подключиться к серверу");
        }
    }



  return(
    <div className={styles.registerPage}>
        <form onSubmit={registerSubmit}>
            <h2>Регистрация</h2>
            <label>Имя пользователя</label>
            <div><input type = "userName" value={userName} onChange={(e) => setUserName(e.target.value)} required /></div>
            <label>Email</label>
            <div><input type = "email" value={email} onChange={(e) => setEmail(e.target.value)} required /></div>
            <label>Пароль</label>
            <div><input type = "password" value={password} onChange={(e) => setPassword(e.target.value)} required /></div>
            <input type='file' onChange={(e) => setImage(e.target.files[0])} />
            <input type='submit' value='Зарегистрироваться' />
        </form>
        <button onClick = {() => navigate("/login")}>Войти</button>
        {(message !== "") && <div className={styles.message}>{message}</div>}
    </div>
  );
}

export default Register
