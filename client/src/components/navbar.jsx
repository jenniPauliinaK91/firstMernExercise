
import {Link, useNavigate } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
import logo3 from '../imgs/logo3.png'
function Navbar() {

  const navigate = useNavigate()
  const {logout} = useLogout()
  const {user} = useAuthContext()

  const handleLogout=()=>{
    logout()
    navigate('/')
  }
  return (
    
    <div className='navbar'>
      <div className="links">
      <div className='logoContainer'>
        <Link  to='/'><img style={{width:'50px'}}src={logo3}/></Link></div>
        
        <Link to='/races'>Tapahtumat</Link>
        <Link to='/'>Blogi</Link>
    
        </div>
    <div>
          {
          user?<div className='login'><Link to='/omatilmot'>Omat ilmoittautumiset</Link><Link to='/omattiedot'>Omat tiedot</Link><div className='emailNav'>{user.email}</div> <button className='btn_logout' onClick={handleLogout}>Logout</button></div>

         :<div className='login'> <Link  to='/login'>Kirjaudu sisään</Link></div>}

        </div>

        </div>
  );
  }
  
  
  export default Navbar

