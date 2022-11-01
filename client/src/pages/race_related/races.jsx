
import { useEffect, useState } from "react"
import * as moment from 'moment'
import { useAuthContext } from "../../hooks/useAuthContext"

export const Races =()=>{

    const [kisat, setKisat] = useState(null)


    const {user} = useAuthContext()
    const[errors, setErrors]= useState(null)
    const [success, setSuccess] = useState(null)
    useEffect(()=>{

        const haeKisat = async ()=>{
            const resp = await fetch('/race/getraces')
            const json = await resp.json()

            if(resp.ok){
                setKisat(json)
            }
        }
     
            haeKisat()


    },[user]) 

    const handleClick=async (id)=>{
    
        const resp = await fetch('/api/reg',{
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
                'Authorization': `Bearer ${user.token}`

            },
            body:JSON.stringify({
              kisaId:id
            })
        })
        const json = await resp.json()
        if(!resp.ok){
         
           setErrors(json.message)
           console.log(errors)
        }
        if(resp.ok){
                
              //  console.log(json.message)
                setSuccess(json.message)
               



        }
    }
    const showSuccess=()=>{
        return <h2 style={{color:'green'}}>Ilmoittautuminen onnistui.</h2>
    }
    const showAlreadyReg=()=>{
        return <h2 style={{color:'red'}}>Olet jo ilmoittautunut tähän.</h2>
    }
    const showButton = (kisa)=>{
        if(kisa.isCancelled){
            return <p>Cancelled</p>
        }
       else{
        return(
            <button className="btn_img"  style={{marginTop:'15px'}} onClick={()=>handleClick(kisa._id)}>Ilmoittaudu</button>
        )
       }
    }
    return (
        <>
        <div className="otsikko">Tapahtumat</div>
        <div>{success&&showSuccess()||errors&&showAlreadyReg() }</div>

        <div className="racesContainer">
   
            {
                
                kisat && kisat.map((kisa, index)=>{
                    let d =kisa.date
                    const url = `https://source.unsplash.com/random/100-${index}×60/?moutains`
                    const formattedDate=moment(d).utc().format('DD/MM/YY')
                   
                
                   
                 return  ( 
                 <div className={kisa?.isCancelled?"kisaDiv cancelled":"kisaDiv"} key={kisa._id} id="kisaCard">
                    <div className="imgRace">
                    <img src={url}/>
              </div>
                    <div className="kisaInfo">{kisa.name} {<br/>}{kisa.city} {<br/>} {kisa.distance} km{<br/>} {formattedDate}{<br/>}
                    {kisa.url!=''&& <p>lisätietoa: {kisa.url}</p>}</div>
                    {user && showButton(kisa) }
                    {!user&& kisa.isCancelled?<p>Peruttu</p>:<></>}
                    </div>
                    )
                }

                 
                )
        
            }
           
           
        </div>
        </>
    )
}