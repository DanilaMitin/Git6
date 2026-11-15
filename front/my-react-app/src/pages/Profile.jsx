    import { useState,useEffect } from 'react';
    import { useNavigate } from "react-router";
    import Header from '../Header/Header.jsx'
    import styles from '../styles/Profile.module.css'

    function Profile() {
    const [src, setSrc] = useState(null);
    const [user, setUser] = useState();
    const [bookings, setBookings] = useState([]);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
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
            
            const responseAvatar = await fetch(
                "http://localhost:8080/api/users/avatar",
                {
                method:"GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
                }
            );


            if (!response.ok) {
                console.log("Ошибка " + response.status);
                return;
            }

            if (!responseAvatar.ok) {
                console.log("Ошибка " + responseAvatar.status);
                return;
            }

            const data = await response.json();
            const avatar = await responseAvatar.json();

            setSrc(`data:${avatar.contentType};base64,${avatar.data}`);
            setUser(data.user);
            setBookings(data.bookings);
            console.log(data);
            console.log(avatar);
            
            } catch(error) {
                console.log(error);
                console.log("Не удалось загрузить профиль");
            }



        }
        getProfile();
    }, [token]);

    async function deleteBooking(bookingId) {
        try {
            const response = await fetch(
            `http://localhost:8080/api/booking/my/${bookingId}`,
            {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        window.location.reload();
        } catch(error) {
            console.log(error);
        }
    }

    async function deleteUser() {
        try {
            const response = await fetch(
            `http://localhost:8080/api/booking/my`,
            {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        } catch(error) {
            console.log(error);
        }
        navigate("/login");
    }

    return(
    <>
        <Header/>
        <main className={styles.page}>
            { user &&
            <article className={styles.ProfileForm}>
                <img src={src} alt="Аватар" />
                <div>Имя пользователя: {user.userName}</div>
                <div>Email: {user.email}</div>
                <div>Количество входов: {user.count}</div>
                <div className={styles.buttons}>
                    <button className={styles.editButton} onClick={() => {navigate('/updateProfile')}}>Изменить</button>
                    <button className={styles.deleteButton} onClick={() => {localStorage.removeItem('token'); deleteUser(); navigate("/login")}}>Удалить</button>
                    <button className={styles.exitButton} onClick={() => {localStorage.removeItem('token'); navigate("/login")}}>Выйти</button>
                    {(user.role === "MODERATOR" || user.role === "ADMIN") && <button onClick={() => navigate('/adminNews')}>Режим админа</button>}
                </div>
            </article>
            }
            { bookings.length > 0 &&
                <article >
                    <table className={styles.bookingsTable}>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Дата бронирования</th>
                                <th>Фильм</th>
                                <th>Статус</th>
                                <th></th>
                            </tr>
                        </thead>

                    <tbody>
                        {bookings.map((booking) => (
                            <tr key={booking.id}>
                                <td>{booking.id}</td>
                                <td>{booking.bookingDate}</td>
                                <td>{booking.movie.title ?? "Не указан"}</td>
                                <td>{booking.status}</td>
                                <td><button onClick={() => deleteBooking(booking.id)}>Удалить</button></td>
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

    export default Profile
