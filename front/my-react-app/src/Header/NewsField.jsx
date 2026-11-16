import styles from '../styles/BookingFields.module.css'
import { useState } from 'react';

function NewsFields({onClose}) {
    const [title,setTitle] = useState();
    const [content,setContent] = useState();
    const token = localStorage.getItem('token');

    async function createNews(e) {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(
                "http://localhost:8080/api/news/add",
                {
                method:"POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    "title": title,
                    "content": content
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
            console.log("Не удалось создать новость")
        }
    }

    return (
        <div className={styles.overlay} onClick={onClose}>
            <form className={styles.BookingForm} onClick={(e) => e.stopPropagation()} onSubmit={createNews}>
                <label>Название:</label>
                <input type='title' value = {title} onChange = {(e) => setTitle(e.target.value)}></input>
                <label>Контент:</label>
                <textarea type='text' value = {content} onChange = {(e) => setContent(e.target.value)}></textarea>
                <input type='submit'/>
                <button type='button' onClick={onClose} className={styles.close}>Закрыть</button>
            </form>
        </div>
    );
    
}

export default NewsFields