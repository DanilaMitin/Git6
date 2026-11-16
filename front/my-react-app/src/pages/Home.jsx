import { useState,useEffect } from 'react';
import { useNavigate } from "react-router";
import Header from '../Header/Header.jsx'
import styles from '../styles/Home.module.css'

function Home() {
  const [news, setNews] = useState([]);
  const [error,setError] = useState();
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

  return(
  <>
    <Header/>
    <main className={styles.page}>
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
          </article>
        ))}
      </div>
    </main>
  </>
  );
}

export default Home
