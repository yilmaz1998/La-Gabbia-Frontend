import React from 'react'

const Orders = () => {

  const handleLogOut = () => {
    localStorage.removeItem("adminToken");
    window.location.reload();
  }

  return (
    <div>
      <button onClick={handleLogOut}>Log Out</button>
    </div>
  )
}

export default Orders