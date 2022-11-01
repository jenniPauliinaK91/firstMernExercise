import {Link} from 'react-router-dom'

import { useAuthContext } from '../hooks/useAuthContext'
export const Main=()=>{

        const{user} = useAuthContext()
    return (
        <div>
            <div className="kuvaContainer">
                <div className="exlNimi"> Example race</div>
                <div className="exlDetails"> 1.7.2023</div>
                <div className="imgButton "><button className="btn_img">Ilmoittaudu</button></div>
        
            </div>  
            <div className="alaosa">
                <div className="box">
                    <h1>Kisa järjestäjä?</h1>
                    {user?  <span>Lisää kisasi <Link to='/addrace'>tästä</Link></span> : <span><Link to='/login'>Kirjaudu sisään lisätäksesi kisa</Link></span>}
           
                </div>


            </div>

        </div>
    
    
     )
}