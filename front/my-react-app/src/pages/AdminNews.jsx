import { useState,useEffect } from 'react';
import { useNavigate } from "react-router";
import AdminHeader from '../Header/AdminHeader.jsx'
import styles from '../styles/Home.module.css'
import NewsFields from '../Header/NewsField.jsx';
import NewsFieldsUpdate from '../Header/NewsFielsUpdate.jsx';

function AdminNews() {
  const [news, setNews] = useState([]);
  const [error,setError] = useState();
    const [selectedNews, setSelectedNews] = useState(null);
    const [open, setOpen] = useState(false);
  const token = localStorage.getItem('token');
  useEffect(() => {
    async function getNews() {

    try {
      const response = await fetch(
        "http://localhost:8080/api/news/all",
        {
          method:"GET",
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      

      if (!response.ok) {
        console.log("Ошибка " + response.status);
        return;
      }
      const data = await response.json();
      console.log(data);
      setNews(data);
    } catch(error) {
      console.log("Не удалось загрузить новости");
    }

    }
    getNews();
  }, []);


  async function delNews(newsId) {
    try {
      const response = await fetch(
        `http://localhost:8080/api/news/${newsId}`,
        {
          method:"DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        }
      );
      

      if (!response.ok) {
        console.log("Ошибка " + response.status);
        console.log(response);
        return;
      }
      window.location.reload();
    } catch(error) {
        console.log(error);
      console.log("Не удалось удалить новость");
    }
  }

  return(
  <>
    <AdminHeader/>
    <main className={styles.page}>
        <button onClick={() => setOpen(true)}>Добавить</button>
        <h2 className={styles.title}>Новости</h2>
        {error && <p className={styles.message}>{error}</p>}

        <div className={styles.grid}>
            {news.map(item =>(
            <article key ={item.id} className={styles.card}>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.cardText}>{item.content}</p>
                {item.user && (
                <footer className={styles.cardFooter}>
                {item.user.userName}
                </footer>
                )}
                <button onClick={() => delNews(item.id)}>Удалить</button>
                <button onClick={() => setSelectedNews(item)}>Изменить</button>
            </article>
            ))}
        </div>
        {(open) && <NewsFields onClose={() => setOpen(false) }/>}
        {(selectedNews) && <NewsFieldsUpdate selectedNews = {selectedNews} onClose={() => setSelectedNews(null) }/>}
    </main>
  </>
  );
}

export default AdminNews
