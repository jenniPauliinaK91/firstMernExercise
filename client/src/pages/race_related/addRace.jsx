import {  Stack, FormControl, TextField,Button,
Divider} from '@mui/material';

import { useState } from "react"
import { useAuthContext } from '../../hooks/useAuthContext';
import validator from 'validator'

export const AddRace =()=>{

    const {user} = useAuthContext()
    const [formData, setFormData ] = useState({
        name:'',
        organization:'',
        city:'',
        zipcode:0,
        address:'',
        distance: '',
        date:'',
        time:'',
        description:'',
        url:''
      

    })
    const [isLoading, setIsLoading]= useState(null)
    
    //fetch errors
    const[error, setError]=useState(null)

    //formerrors 
    const [formErrors, setFormErrors]= useState({
        zipcodeErr:false,
        distanceErr:false,

    })

    const [successMsg, setSuccessMesg]=useState(null)

    const handleChange= (fieldName) => (event)=>{
        const current =event.target.value

        switch (fieldName){
           
            case 'zipcode':
                validator.isNumeric(current)?setFormErrors({...formErrors, zipcodeErr:false}):setFormErrors({...formErrors, zipcodeErr:true})
                break
            case 'distance':
                validator.isNumeric(current)?setFormErrors({...formErrors, distanceErr:false}):setFormErrors({...formErrors, distanceErr:true})
                break
        }
        setFormData({...formData, [fieldName]: event.target.value})
        //setErrors({...errors, fetchErrorMsg:'' })
    }
    

    const handleSubmit = async(event)=>{
        event.preventDefault()
       if(!user){
            return
        }


        const response = await fetch('/race/addrace', {
                method:'POST',
                headers:{'Content-Type': 'application/json', 'Authorization':`Bearer ${user.token}`},
                body:JSON.stringify({name: formData.name, organization: formData.organization, address:formData.address, city:formData.city,
                    date: formData.date,time: formData.time, distance: formData.distance,  zipcode: formData.zipcode, description:formData.description, url:formData.url})
        })
        const json = await response.json()

        if(!response.ok){
            setIsLoading(false)
            setError(json.message)
            console.log(error)
        }
        if(response.ok){
        
            setIsLoading(false)
            console.log(json)
            setSuccessMesg(json.message)
            setError('')
            setFormData({  
            name:'',
            organization:'',
            city:'',
            zipcode:0,
            address:'',
            distance: '',
            date:'',
            time:'',
            description:'',
            url:''})
            
    
        }
        

    }

return (
<div className="addRaceFormDiv">
    {<h2 style={{color:'green', marginTop:'20px'}}>{successMsg}</h2>}
    <Stack 
        component='form'
        onSubmit={handleSubmit}
        noValidate
        spacing={2}
        sx={{borderRadius:'8px', bgcolor:'#f5f5f6',color:"tumma", padding:'40px',maxWidth:'600px', maxHeight:'1200px',margin:'30px auto'}}
     >
        <TextField variant='outlined'

        required={true} 
        type='text'
        label='Tapahtuman nimi'
        value={formData.name}
        onChange={handleChange('name')}
        />
        <TextField variant='outlined'
        required={true} 
        type='text'
        label='Organisaatio'
        value={formData.organization}
        onChange={handleChange('organization')}
         />
        <TextField variant='outlined'
        required={true} 
        type='text'
        label='Katuosoite'
        value={formData.address}
        onChange={handleChange('address')}
        />
        <TextField variant='outlined'
        required={true} 
        type='text'
        label='Postinumero'
        value={formData.zipcode}
        onChange={handleChange('zipcode')}
        error={formErrors.zipcodeErr}
        helperText={formErrors.zipcodeErr && 'Syötä vain numeroita'}
      />
        <TextField variant='outlined'
        required={true} 
        type='text'
        label='Kaupunki'
        value={formData.city}
        onChange={handleChange('city')}
        />
        <TextField variant='outlined'
        required={true} 
        type='date'
        label="Päivämäärä"
        value={formData.date}
        onChange={handleChange('date')}
        InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField variant='outlined'
        required={true} 
        type='time'
        label="Aika"
        value={formData.time}
        onChange={handleChange('time')}
        InputLabelProps={{
            shrink: true,
          }}
        />
       
        <TextField variant='outlined'
        required={true} 
        type='text'
        label='Matka (km)'
        value={formData.distance}
        onChange={handleChange('distance')}
        error={formErrors.distanceErr}
        helperText={formErrors.distanceErr && 'Syötä vain numeroita'}
        />
        <TextField variant='outlined'
        required={true} 
        multiline={true}
        type='text'
        label='Kuvaus'
        value={formData.description}
        onChange={handleChange('description')}
        />
        <TextField variant='outlined'
        required={false} 

        type='text'
        label='Verkkosivut'
        value={formData.url}
        onChange={handleChange('url')}
        />


        <FormControl>
            <Button disabled={formErrors.zipcodeErr||formErrors.distanceErr ||isLoading } className='btnRegLog' variant='contained' size='large' type="submit" sx={{minWidth:'70%'}}>Lisää Tapahtuma</Button>
        <Divider/>
     
     {error&&<h2 style={{color:'red'}}>{error}</h2>}
        
        </FormControl>


     </Stack>
 </div>
)

}