import React, { useState, useEffect } from 'react'
import { axiosInstance } from '../lib/axios'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const typeOrder = ['Salad', 'Snack', 'Burger', 'Pizza', 'Pasta', 'Dessert', 'Drink']

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

  const getItemsByType = (type) => menuItems.filter(item => item.type === type)

  return (
    <div className="p-6">
      <h1 className="text-5xl text-center mb-6">Menu</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        typeOrder.map(type => {
          const items = getItemsByType(type)
          if (items.length === 0) return null
          return (
            <div key={type} className="mb-20">
              <h2 className="text-3xl mb-6">{type}s</h2>
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-8">
                {items.map(item => (
                  <Card key={item.id} sx={{ maxWidth: 420 }}>
                    <CardMedia
                      sx={{ height: 200 }}
                      image={item.image_url}
                      title={item.name}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h8" component="div">
                        {item.name}
                      </Typography>
                      <Typography gutterBottom variant="h8" component="div">
                        {item.price} $
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {item.description}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small">Add to Cart</Button>
                    </CardActions>
                  </Card>
                ))}
              </div>
            </div>
          )
        })
      )}
    </div>
  )
}

export default Menu