import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { axiosInstance } from '../lib/axios';

const AdminLogin = () => {
    const [username, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()  
        try {
            const response = await axiosInstance.post('/admin/login', {
                username,
                password
            });
            if (response.status === 200) {
                console.log('Login successful');
                navigate("/admin/orders")
                localStorage.setItem("adminToken", response.data.token)
            }
        } catch (error) {
            console.error("Error logging in:", error)
            alert("Something went wrong. Please try again.")
        }
    }

  return (
    <div className='flex justify-center text-center items-center min-h-screen p-4'>
    <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">
    <h1 className='text-3xl p-12'>Admin Login</h1>
    <form onSubmit={handleSubmit} className='mx-auto max-2-lg'>
        <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="dense"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
        />
        <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="dense"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
        />
        <Button type='submit' variant="contained" color="primary" fullWidth style={{ marginTop: '24px' }}>Login</Button>
        <Button variant="outlined" color="secondary" fullWidth style={{ marginTop: '12px' }} onClick={() => navigate("/")}>Back to Home</Button>
      </form>
    </div>
    </div>
  )
}

export default AdminLogin