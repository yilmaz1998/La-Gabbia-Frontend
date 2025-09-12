import React, { useState, useEffect } from 'react'
import { axiosInstance } from '../lib/axios'

const Menu = () => {
  const [menuItems, setMenuItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axiosInstance.get('/menu')
        setMenuItems(response.data)
      } catch (error) {
        console.error('Error fetching menu items:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchMenuItems()
  }, [])

  return (
    <div>
      <h1>Menu</h1>
      {loading ? (
        <p>Loading menu items...</p>
      ) : (
        <ul>
          {menuItems.map((item) => (
            <li key={item.id}>
              <h2>{item.name}</h2>
              <img src={item.image_url} />
              <p>{item.description}</p>
              <p>Price: ${item.price.toFixed(2)}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Menu