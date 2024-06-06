import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import './User.css'
import axios from 'axios'
import { useState } from 'react'
import toast from 'react-hot-toast'

const User = () => {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            await axios.get('http://localhost:8000/api/getAll')
            .then((response)=>{
                setUsers(response.data);
            }).catch((error)=>{
                console.log(error);
            });
        }
        fetchData();
    },[])

    const deleteUser = async(userId) => {
        await axios.delete(`http://localhost:8000/api/delete/${userId}`)
        .then((response)=>{
            setUsers((prevUsers)=> prevUsers.filter((user) => user._id !== userId));
            toast.success(response.data.msg, {position: 'top-right'});
            console.log(response);
        }).catch((error)=>{
            console.log(error);
        });
    }




  return (
    <div className='userTable'>
        <Link to={"/add"} className='addButton'>Add User</Link>
        <table bprder={1} cellPadding={10} cellSpacing={0}>
            <thead>
                <tr>
                    <th>SNo.</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user, index) => {
                    return(
                        <tr key={user._id}>
                            <td>{index+1}</td>
                            <td>{user.fname} {user.lname}</td>
                            <td>{user.email}</td>
                            <td className='actionButtons'>
                                <Link to={`/edit/`+user._id}>Edit</Link>
                                <button onClick={()=> deleteUser(user._id)}>Delete</button>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    </div>
  )
}

export default User