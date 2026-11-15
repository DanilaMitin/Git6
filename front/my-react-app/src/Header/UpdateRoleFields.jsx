import styles from '../styles/BookingFields.module.css'
import { useState } from 'react';

    function UpdateRoleFields({user, onClose}) {
        const [role,setRole] = useState("USER");
        const [error,setError] = useState();
        const token = localStorage.getItem('token');
        
        async function redRole(e) {
            e.preventDefault();
            try {
            const response = await fetch(
                `http://localhost:8080/api/users/${user.id}/updateRole`,
                {
                method:"PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    "role": role,
                }),
                }
            );
            

            if (!response.ok) {
                console.log("Ошибка " + response.status);
                setError(JSON.parse(await response.text()).message);
                return;
            }

            window.location.reload();
            } catch(error) {
                console.log(error);
                console.log("Не удалось обновить роль");
            }
        }

    return (
        <div className={styles.overlay} onClick={onClose}>
            <form className={styles.BookingForm} onClick={(e) => e.stopPropagation()} onSubmit={redRole}>
                <label>Роль:</label>
                <select onChange={(e) => setRole(e.target.value)}>
                    <option value="USER">Пользователь</option>
                    <option value="ADMIN">Админ</option>
                    <option value="MODERATOR">Модератор</option>
                </select>
                <input type='submit'/>
                <button type='button' onClick={onClose} className={styles.close}>Закрыть</button>
                {error && <div>{error}</div>}
            </form>
        </div>
    );
    
}

export default UpdateRoleFields