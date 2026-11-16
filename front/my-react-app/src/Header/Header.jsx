import styles from '../styles/Header.module.css'
import { useNavigate } from "react-router";

function Header() {
    const navigate = useNavigate();
    return (
        <header>
            <h1>Cinema</h1>
            <button onClick={() => navigate("/")}>Новости</button>
            <button onClick={() => navigate("/films")}>Фильмы</button>
            <button onClick={() => navigate("/profile")}>Мой профиль</button>
        </header>
    );
    
}

export default Header;