import { useAuthContext } from "../hooks/useAuthContext"

import OmatIlmotComponent  from "../components/omatIlmot"
import { useEffect, useState } from "react"


export const OmatIlmot =()=>{

    const {user} = useAuthContext()
    const [items, setItems] = useState([])
    useEffect(()=>{


        if(user){
                    const haeIlmot = async ()=>{
                            const response= await fetch('/api/me', {
                        headers:{
                            'Authorization': `Bearer ${user.token}`
                        }})
                       const json = await response.json()
        
                       if(response.ok){
                        const items= json.myInfo.registrations
                        setItems(items)
                        
                    }
                    }
                    haeIlmot()
                    console.log(items)
                
                }

    }, [])
    return (
        <>
        <h1 style={{marginTop:'40px'}}>Omat ilmoittautumiset</h1>
        { 
            items.length==0 ? <h1 style={{marginTop:'40px'}}>Et ole vielä ilmoittaunut mihinkään.</h1>:items.map((item, index)=>{
                return <OmatIlmotComponent key={index} i={index} kisaId={item.kisaId}/>
            }) 
          }
          </>
    
    )
}