import styles from '../styles/BookingFields.module.css'
import { useState, useEffect } from 'react';

function NewsFieldsUpdate({selectedNews, onClose}) {
    const [news,setNews] = useState(null);
    const [title,setTitle] = useState();
    const [content,setContent] = useState();
    const token = localStorage.getItem('token');


    useEffect(() => {
            async function getNews() {
                console.log(selectedNews);
                try {
                    const response = await fetch(
                        `http://localhost:8080/api/news/${selectedNews.id}`,
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
        
                    setNews(data);

                    setTitle(data.title);
                    setContent(data.content);
                
                } catch(error) {
                    console.log(error);
                    console.log("Не удалось загрузить новость");
                }
    
    
    
            }
            getNews();
        }, [token]);


    async function updateNews(e) {
        e.preventDefault();
        try {
            const response = await fetch(
                `http://localhost:8080/api/news/${selectedNews.id}`,
                {
                method:"PUT",
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
            console.log("Не удалось обновить новость")
        }
    }

    return (
        <div className={styles.overlay} onClick={onClose}>
            <form className={styles.BookingForm} onClick={(e) => e.stopPropagation()} onSubmit={updateNews}>
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

export default NewsFieldsUpdate