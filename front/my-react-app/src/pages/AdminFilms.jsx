import { useState,useEffect } from 'react';
import { useNavigate } from "react-router";
import AdminHeader from '../Header/AdminHeader.jsx'
import styles from '../styles/Home.module.css'
import NewsFields from '../Header/NewsField.jsx';
import NewsFieldsUpdate from '../Header/NewsFielsUpdate.jsx';
import FilmsField from '../Header/FilmsField.jsx';

function AdminFilms() {
  const [news, setFilms] = useState([]);
  const [error,setError] = useState();
    const [selectedFilms, setSelectedFilms] = useState(null);
    const [open, setOpen] = useState(false);
  const token = localStorage.getItem('token');
  useEffect(() => {
    async function getFilms() {

    try {
      const response = await fetch(
        "http://localhost:8080/api/movie/all",
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
      setFilms(data);
    } catch(error) {
      console.log("Не удалось загрузить фильмы");
    }

    }
    getFilms();
  }, []);


  async function delFilm(filmId) {
    try {
      const response = await fetch(
        `http://localhost:8080/api/movie/${filmId}`,
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
      console.log("Не удалось удалить фильм");
    }
  }

  return(
  <>
    <AdminHeader/>
    <main className={styles.page}>
        <button onClick={() => setOpen(true)}>Добавить</button>
        <h2 className={styles.title}>фильмы</h2>
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
                <button onClick={() => delFilm(item.id)}>Удалить</button>
                <button onClick={() => setSelectedFilms(item)}>Изменить</button>
            </article>
            ))}
        </div>
        {(open) && <FilmsField onClose={() => setOpen(false) }/>}
        {(selectedFilms) && <NewsFieldsUpdate selectedFilms = {selectedFilms} onClose={() => setSelectedFilms(null) }/>}
    </main>
  </>
  );
}

export default AdminFilms
