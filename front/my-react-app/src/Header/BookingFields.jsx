import styles from '../styles/BookingFields.module.css'
import { useState } from 'react';

function BookingFields({film, onClose}) {
    const [date,setDate] = useState();

    async function createBooking(e) {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(
                "http://localhost:8080/api/booking/my",
                {
                    method: "POST",
                    headers: {
                        "Content-Type" : "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        "movieId": film.id,
                        "bookingDate": date,
                    }),
                }
            );
            if (!response.ok) {
                console("Ошибка: " + response.status);
            }
            onClose();
            window.location.reload();
        } catch(error) {
            console.log("Не удалось создать бронь")
        }
    }

    return (
        <div className={styles.overlay} onClick={onClose}>
            <form className={styles.BookingForm} onClick={(e) => e.stopPropagation()} onSubmit={createBooking}>
                <h3>{film.title}</h3>
                <label>Дата:</label>
                <input type='datetime-local' value = {date} onChange = {(e) => setDate(e.target.value)}></input>
                <input type='submit'/>
                <button type='button' onClick={onClose} className={styles.close}>Закрыть</button>
            </form>
        </div>
    );
    
}

export default BookingFields;