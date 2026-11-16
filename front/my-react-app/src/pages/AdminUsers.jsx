import { useState,useEffect } from 'react';
import { useNavigate } from "react-router";
import AdminHeader from '../Header/AdminHeader.jsx'
import styles from '../styles/Home.module.css'
import stylesP from '../styles/Profile.module.css'
import NewsFields from '../Header/NewsField.jsx';
import NewsFieldsUpdate from '../Header/NewsFielsUpdate.jsx';
import FilmsField from '../Header/FilmsField.jsx';
import UpdateRoleFields from '../Header/UpdateRoleFields.jsx';

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [error,setError] = useState();
    const [selectedUser, setSelectedUser] = useState(null);
  const token = localStorage.getItem('token');
  useEffect(() => {
    async function getUsers() {

    try {
      const response = await fetch(
        "http://localhost:8080/api/users/all",
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
      console.log(data);
      setUsers(data);
    } catch(error) {
      console.log("Не удалось загрузить пользователей");
    }

    }
    getUsers();
  }, []);


  return(
  <>
    <AdminHeader/>
    <main className={styles.page}>
        { users.length > 0 &&
                        <article >
                            <table className={stylesP.bookingsTable}>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Имя пользователя</th>
                                        <th>Email</th>
                                        <th>Роль</th>
                                        <th>Количество входов</th>
                                        <th></th>
                                    </tr>
                                </thead>
        
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user.id}>
                                        <td>{user.id}</td>
                                        <td>{user.userName}</td>
                                        <td>{user.email}</td>
                                        <td>{user.role}</td>
                                        <td>{user.count}</td>
                                        <td>
                                            <button onClick={() => setSelectedUser(user)}>Изменить роль</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                            </table>
                        </article>
        }
        {selectedUser && <UpdateRoleFields user = {selectedUser} onClose={() => setSelectedUser(null)}/>}
    </main>
  </>
  );
}

export default AdminUsers
