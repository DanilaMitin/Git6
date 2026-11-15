import { useState,useEffect } from 'react';
import { useNavigate } from "react-router";
import Header from '../Header/Header.jsx'
import styles from '../styles/Home.module.css'
import BookingFields from '../Header/BookingFields.jsx'

function Films() {
  const [news, setFilms] = useState([]);
  const [error,setError] = useState();
  const [bookedIds, setBookedIds] = useState([]);
  const [selectedFilm, setSelectedFilm] = useState(null);
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
      const token = localStorage.getItem('token');
      if (localStorage.getItem('token')) {
        const myfilmsRes = await fetch(
          "http://localhost:8080/api/booking/my",
          {
            method:"GET",
            headers: { Authorization: `Bearer ${token}` }
          }
        );
        if (myfilmsRes.ok) {
          const myFilms = await myfilmsRes.json();
          setBookedIds(myFilms.map(b => b.movie.id));
        }
      }
      

      if (!response.ok) {
        console.log("Ошибка " + response.status);
        setError(response.message);
        return;
      }

      const data = await response.json();
      console.log(data);
      setFilms(data);
    } catch(error) {
        setError("Не удалось загрузить фильмы");
        console.log("Не удалось загрузить фильмы");
    }

    }
    getFilms();
  }, [token]);




  return(
  <>
    <Header/>
    <main className={styles.page}>
      <h2 className={styles.title}>Фильмы</h2>
      {error && <p className={styles.message}>{error}</p>}

      <div className={styles.grid}>
        {news.map(item =>(
          <article key ={item.id} className={styles.card}>
            <h3 className={styles.cardTitle}>{item.title}</h3>
              {token && !bookedIds.includes(item.id) && <button onClick={() => setSelectedFilm(item)}>Забронировать</button>}
              {token && bookedIds.includes(item.id) && <span>Забронировано</span>}
              {!token && <span>Войдите, чтобы забронировать</span>}
          </article>
        ))}
      </div>
      {selectedFilm && (
        <BookingFields film={selectedFilm} onClose={() => setSelectedFilm(null)}/>
      )}

    </main>
  </>
  );
}

export default Films
