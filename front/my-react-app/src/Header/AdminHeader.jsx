import styles from '../styles/Header.module.css'
import { useNavigate } from "react-router";

function AdminHeader() {
    const navigate = useNavigate();
    return (
        <header>
            <h1>Cinema</h1>
            <button onClick={() => navigate("/adminNews")}>Новости</button>
            <button onClick={() => navigate("/adminFilms")}>Фильмы</button>
            <button onClick={() => navigate("/adminUsers")}>Пользователи</button>
            <button onClick={() => navigate("/adminBooking")}>Брони</button>
            <button onClick={() => navigate("/profile")}>Назад</button>
        </header>
    );
    
}

export default AdminHeader;