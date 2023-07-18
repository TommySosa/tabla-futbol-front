import Header from '../components/Header'
import Menu from '../components/Menu'
import Footer from '../components/Footer'
import { Outlet } from 'react-router-dom'

export default function Home() {
  return (
    <div className="grid-layout">
      <div className='box header'>
        <Header />
      </div>
      <div className='box menu'>
        <Menu></Menu>
      </div>
      <div className='box content'>
        <div className='tabla-container'>
          <Outlet />
        </div>
      </div>
      <div className='box footer'>
        <Footer></Footer>
      </div>
    </div>
  )
}