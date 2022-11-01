
import { useAuthContext } from "./useAuthContext"
import {  useState } from "react"


export const UseGetMyRaces =()=>{

    const {user} = useAuthContext()
    const [races, setRaces]=useState([])
    const [error, setError]= useState(null)

  
        const haeKisat =async()=>{

            const result = await fetch('/race/getMyRaces', {
                headers:{
                    'Authorization': `Bearer ${user.token}`
                }})

                const json = await result.json()
               if(result.ok){
                console.log(json.races)
                setRaces(json.races)
              
                
                }
                if(!result.ok){
                   console.log(result.error)
                   setError(result.error)
                }
            }  

 

return {races,error, haeKisat}

}