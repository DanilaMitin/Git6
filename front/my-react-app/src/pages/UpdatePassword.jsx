import { useState,useEffect } from 'react';
import { useNavigate } from "react-router";
import styles from '../styles/Register.module.css'

function UpdatePassword() {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [message, setMessage] = useState("");
    const token = localStorage.getItem('token');
    const navigate = useNavigate();



    async function registerSubmit(e) {
        e.preventDefault();
        

        try {
            const response = await fetch(
                "http://localhost:8080/api/users/my/password",
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        oldPassword,
                        newPassword,
                    }),
                }
            );
            
            if (response.status === 400) {
                console.log(response);
                setMessage(JSON.parse(await response.text()).message);
                return;
            } else if (!response.ok) {
                setMessage(response.message || "Ошибка сервера")
                return;
            }
            console.log(response);

            navigate("/profile")
        } catch(error) {
            console.log(error);
            setMessage("Не удалось подключиться к серверу");
        }
    }



  return(
    <div className={styles.registerPage}>
        <form onSubmit={registerSubmit}>
            <label>Старый пароль</label>
            <div><input type = "password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} required /></div>
            <label>Новый пароль</label>
            <div><input type = "password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required /></div>
            <input type='submit' value='Изменить пароль' />
        </form>
        <button onClick = {() => navigate("/profile")}>Назад</button>
        {(message !== "") && <div className={styles.message}>{message}</div>}
    </div>
  );
}

export default UpdatePassword
