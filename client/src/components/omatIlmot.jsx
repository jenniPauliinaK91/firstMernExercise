
import { useEffect, useState } from "react"
import * as moment from 'moment'


function OmatIlmotComponent (props){

    const [tiedot, setTiedot]=useState(null)
    const id = props.kisaId
    const url = `https://source.unsplash.com/random/100-${props.i}×60/?moutains`
    useEffect(()=>{

        const kisa = async ()=>{
            const info = await fetch(`/race/getRace/${id}`)
            const json = await info.json()

            if(info.ok){
                console.log(json)
                setTiedot(json)
                
            }

        }
        kisa()
    },[])

    return(

        <div className="omatIlmotKisa">
            <img src={url}></img>
            {tiedot && <p>{tiedot.name} {moment(tiedot.date).utc().format('DD/MM/YY')} {tiedot.isCancelled&&'Peruttu'}</p>}
     
    
        </div>
    )

}
export default OmatIlmotComponent