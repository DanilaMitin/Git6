import styles from '../styles/BookingFields.module.css'
import { useState } from 'react';

function FilmsField({onClose}) {
    const [title,setTitle] = useState();
    const token = localStorage.getItem('token');

    async function createFilm(e) {
        e.preventDefault();
        try {
            const response = await fetch(
                "http://localhost:8080/api/movie/add",
                {
                method:"POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    "title": title,
                }),
                }
            );
            if (!response.ok) {
                console.log("Ошибка: " + response.status);
                return;
            }
            onClose();
            window.location.reload();
        } catch(error) {
            console.log(error);
            console.log("Не удалось создать фильм")
        }
    }

    return (
        <div className={styles.overlay} onClick={onClose}>
            <form className={styles.BookingForm} onClick={(e) => e.stopPropagation()} onSubmit={createFilm}>
                <label>Название:</label>
                <input type='title' value = {title} onChange = {(e) => setTitle(e.target.value)}></input>
                <input type='submit'/>
                <button type='button' onClick={onClose} className={styles.close}>Закрыть</button>
            </form>
        </div>
    );
    
}

export default FilmsField