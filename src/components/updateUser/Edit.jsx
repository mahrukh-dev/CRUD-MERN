import React from 'react'
import "../addUser/Add.css"
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const Edit = () => {

    const navigate = useNavigate();

    const users = {
        fname: '',
        lname: '',
        email: '',
        password: ''
    }
    const {id} = useParams();
    const [user, setUser] = useState(users);

    const inputChangeHandler = (e) => {
        const {name, value} = e.target;
        setUser({...user, [name]: value});
        console.log(user);
    }

    useEffect(() => {
        
        axios.get(`http://localhost:8000/api/getOne/${id}`)
            .then((response)=>{
                setUser(response.data);
            }).catch((error)=>{
                console.log(error);
            })
        
    }, [id])

    const submitForm = async (e) => {
        e.preventDefault();
        await axios.put(`http://localhost:8000/api/update/${id}`, user)
        .then((response)=>{
            toast.success(response.data.msg, {position: 'top-right'});
            navigate('/');
        }).catch((error)=>{
            console.log(error);
        });
    }


  return (
    <div className='addUser'>
        <Link to='/'>Back</Link>
        <h3>Update User</h3>
        <form className='addUserForm' onSubmit={submitForm}>
            <div className="inputGroup">
                <label htmlFor="fname">First name</label>
                <input type="text" onChange={inputChangeHandler} value={user.fname} id="fname" name="fname"  placeholder='First Name' />
            </div>
            <div className="inputGroup">
                <label htmlFor="lname">Last name</label>
                <input type="text" onChange={inputChangeHandler} value={user.lname} id="lname" name="lname" placeholder='Last Name' />
            </div>
            <div className="inputGroup">
                <label htmlFor="email">Email</label>
                <input type="email" onChange={inputChangeHandler} value={user.email} id="email" name="email"  placeholder='Email' />
            </div>
            <div className="inputGroup">
                <button type='submit'>Update User</button>
            </div>
        </form>
    </div>
  )
}

export default Edit