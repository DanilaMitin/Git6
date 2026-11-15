import { useState,useEffect } from 'react';
import { useNavigate } from "react-router";
import styles from '../styles/Register.module.css'

function UpdateProfile() {
    
    const [email, setEmail] = useState("");
    const [userName, setUserName] = useState("");
    const [image, setImage] = useState(null);
    const [user, setUser] = useState(null);
    const [message, setMessage] = useState("");
    const token = localStorage.getItem('token');
    const navigate = useNavigate();


    useEffect(() => {
            async function getProfile() {
    
                if(!token) {
                    navigate("/login");
                }
    
                try {
                    const response = await fetch(
                        "http://localhost:8080/api/users/my",
                        {
                        method:"GET",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`
                        }
                        }
                    );
                    
        
        
                    if (!response.ok) {
                        console.log("Ошибка " + response.status);
                        return;
                    }
        
        
                    const data = await response.json();
        
                    setUser(data.user);

                    setUserName(data.user.userName);
                    setEmail(data.user.email);
                
                } catch(error) {
                    console.log(error);
                    console.log("Не удалось загрузить профиль");
                }
    
    
    
            }
            getProfile();
        }, [token]);



    async function registerSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append("userName", userName);
        formData.append("email", email);

        if (image) {
            formData.append("image", image);
        }

        try {
            const response = await fetch(
                "http://localhost:8080/api/users/my",
                {
                    method: "PUT",
                    headers: {Authorization: `Bearer ${token}`},
                    body: formData,
                }
            );
            
            if (response.status === 400) {
                setMessage("Введите кооректные данные")
                return;
            } else if (!response.ok) {
                setMessage(data.message || "Ошибка сервера")
                return;
            }
            console.log(response);

            navigate("/profile");

        } catch(error) {
            console.log(error);
            setMessage("Не удалось подключиться к серверу");
        }
    }



  return(
    <div className={styles.registerPage}>
        <form onSubmit={registerSubmit}>
            <label>Имя пользователя</label>
            <div><input type = "userName" value={userName} onChange={(e) => setUserName(e.target.value)} required /></div>
            <label>Email</label>
            <div><input type = "email" value={email} onChange={(e) => setEmail(e.target.value)} required /></div>
            <input type='file' onChange={(e) => setImage(e.target.files[0])} />
            <input type='submit' value='Изменить' />
        </form>
        <button className={styles.passwordButton} onClick = {() => {navigate("/updatePassword")}}>Изменить пароль</button>
        <button onClick = {() => navigate("/profile")}>Назад</button>
        {(message !== "") && <div className={styles.message}>{message}</div>}
    </div>
  );
}

export default UpdateProfile
