    import { useState,useEffect } from 'react';
    import { useNavigate } from "react-router";
    import Header from '../Header/Header.jsx'
    import styles from '../styles/Profile.module.css'
import AdminHeader from '../Header/AdminHeader.jsx';

    function AdminBooking() {
    const [bookings, setBookings] = useState([]);;
    const token = localStorage.getItem('token');
    useEffect(() => {
        async function getBookings() {

            if(!token) {
                navigate("/login");
            }

            try {
            const response = await fetch(
                "http://localhost:8080/api/booking/all",
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

            setBookings(data);
            console.log(data);
            
            } catch(error) {
                console.log(error);
                console.log("Не удалось загрузить брони");
            }



        }
        getBookings();
    }, [token]);

    return(
    <>
        <AdminHeader/>
        <main className={styles.page}>
            { bookings.length > 0 &&
                <article >
                    <table className={styles.bookingsTable}>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Дата бронирования</th>
                                <th>Фильм</th>
                                <th>Статус</th>
                            </tr>
                        </thead>

                    <tbody>
                        {bookings.map((booking) => (
                            <tr key={booking.id}>
                                <td>{booking.id}</td>
                                <td>{booking.bookingDate}</td>
                                <td>{booking.movie.title ?? "Не указан"}</td>
                                <td>{booking.status}</td>
                            </tr>
                        ))}
                    </tbody>
                    </table>
                </article>
            }
        </main>
    </>
    );
    }

    export default AdminBooking
