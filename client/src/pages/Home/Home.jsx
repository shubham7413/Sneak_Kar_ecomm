import React, { useEffect, useState } from 'react'
import Categories from '../../components/Categories/Categories'
import Contact from '../../components/Contact/Contact'
import FeaturedProducts from '../../components/FeaturedProducts/FeaturedProducts'
import Slider from '../../components/Slider/Slider'
import "./Home.scss"
import useAuth from '../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material'
import useToken from '../../hooks/useToken'
const Home = () => {
  const {user} = useAuth()
  const navigate = useNavigate();
  
  useEffect( () => {
    if(!user) return navigate("/login")
  }, [navigate]);

  // const [open, setOpen]=useState(true);

  // const handleSkip = ()=>{
  //   setOpen(false);
  // }

  // const handleConnect = () => {
  //   navigate("/transact");
  // }
  const {payments} = useToken()
  console.log(payments)
  return (
    <div className='home'>
      <Slider/>
      <FeaturedProducts type="featured"/>
      <Categories/>
      <FeaturedProducts type="trending"/>
      <Contact/>

      {/* <Dialog open={open} onClose={handleSkip} fullWidth>
        <DialogTitle variant="h3">Connect to MetaMask Wallet</DialogTitle>
        
        Dialog content

        <DialogActions>
          
          <Button onClick={handleSkip}>Skip</Button>
          <Button onClick={handleConnect}>Connect</Button>
          
        </DialogActions>
      </Dialog> */}
    </div>
  )
}

export default Home;