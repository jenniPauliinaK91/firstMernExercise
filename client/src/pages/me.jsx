
import { useEffect, useState } from "react"
import * as moment from 'moment'
import {Button} from '@mui/material';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

import { useAuthContext } from "../hooks/useAuthContext"
import { UseGetMyRaces } from "../hooks/useGetMyRaces";

export const Me =()=>{


    const [open, setOpen] =useState(true);

    const handleClick = () => {
    setOpen(!open);

  };

    const [info, setInfo] = useState(null)
    const {user} = useAuthContext()

    const {races, error, haeKisat} = UseGetMyRaces()
    useEffect( ()=>{

        const haeTiedot = async() => 
        {
               const resp= await fetch('/api/me', {
                headers:{
                    'Authorization': `Bearer ${user.token}`
                }})
               const json = await resp.json()

               if(resp.ok){
                setInfo(json.myInfo)
                
        
            }
        }
        if(user){
            haeTiedot()

        }
  

    },[user])
    useEffect(()=>{
        
        if(user){
            haeKisat()
        }
      
     
    },[user])

    const cancelEvent=async(id)=>{
        
        const resp = await fetch('/race/cancelEvent',{
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
                'Authorization': `Bearer ${user.token}`

            },
            body:JSON.stringify({
              id:id
            })
        })
        console.log(resp.ok)

        if(resp.ok){
         

           console.log('peruttu')
           haeKisat()
        }
        
    }
    
    return (
        <div className="meContainer">
            <h1>Omat tiedot</h1>
            {
               
                info&& 
               
                    <div className="meInfoDiv">
                    <span>Nimi: {info.firstname}    {info.lastname} </span>
                    <span>Sähköposti: {info.email} </span>
                    <span>Ikä: {info.age} </span>
                    <span>Liittymispäivä: {moment(info.joindate).utc().format('DD/MM/YY')} </span>
                    <Button  className='btnRegLog' variant='contained' size='large'  sx={{minWidth:'70%', marginTop:'30px'}}>Muokkaa tietoja</Button>
                    
                    
                 </div>
            }
            {
                races.length>0 &&
                <div className="myRaces">
                    <h2>Omat tapahtumat</h2>
                    <List
                        sx={{ width: '100%', maxWidth: '500px', bgcolor: 'background.paper', margin:'auto' }}
                        component="nav"
                        aria-labelledby="nested-list-subheader"

                        >

                        <ListItemButton onClick={handleClick}>
               
                            <ListItemText primary="Tapahtumat" />
                            {open ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <List  component="div" disablePadding>
                            {races&&races.map((race)=>(
                          
                            <ListItemButton key={races._id}  sx={{ pl: 4 }}>
                              <ListItemText primary={race.name} />
                                {race.isCancelled? <p>Peruttu</p>:<button className="cancel_btn" onClick={()=> cancelEvent(race._id)}>Peru tapahtuma</button>}
                            </ListItemButton>)) }
                            </List>
                        </Collapse>
                    </List>

                </div>
                
            }
      
        </div>
    )
}
