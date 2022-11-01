import { FormControl, IconButton, OutlinedInput, InputAdornment, TextField,Button, Stack, InputLabel, FilledInput, Divider, Typography, Link as RouterLink} from '@mui/material';


import {Visibility, VisibilityOff} from '@mui/icons-material'
import { useState } from 'react';
import {Link } from 'react-router-dom'

import { useLogin } from '../hooks/useLogin';



export const Login=()=>{
  //form data
   const[cred, setCred] = useState({email:"", password:"", showPassword:false})



   const {login, error, isLoading} = useLogin()


   
   const togglePassword = ()=>{
    setCred({
        ...cred, showPassword: !cred.showPassword
    })
}
   const handleChange= (fieldName) => (event)=>{
   
    setCred({...cred, [fieldName]: event.target.value})
  
}



   const handleSubmit= async(event)=>{
    event.preventDefault()

    await login (cred.email, cred.password)
  


   }

    return (
        <div className='loginContainer'>
            <h1 style={{marginTop:"30px"}}>Kirjaudu sisään</h1>
       <Stack 
       component='form'
       onSubmit={handleSubmit}
       noValidate
       spacing={6}
       sx={{bgcolor:'#f5f5f6', padding:'40px', maxWidth:'500px', margin:'50px auto', borderRadius:'8px'}}>

            <TextField variant="outlined" 
            type="email" 
            label="Sähköposti" 
            value={cred.email} 
            onChange={handleChange('email')}
            />
            <FormControl variant='filled'>
                <InputLabel htmlFor='password-field'>Salasana</InputLabel>
                <OutlinedInput id="password-field" type={cred.showPassword?'text':'password'} value={cred.password} onChange={handleChange('password')}
                endAdornment={
                    <InputAdornment position='end'><IconButton aria-label="toggle password visibility" onClick={()=>togglePassword('showPassword')} edge='end'>{
                    cred.showPassword?<VisibilityOff/>:<Visibility/>
                    }</IconButton>
                    </InputAdornment>
                            }/>
            </FormControl>

            <FormControl>
                <Button disabled={isLoading} variant='contained' color="button" size="large" type="submit" 
                sx={{minWidth:'70px'}}>Kirjaudu</Button>
                <Divider/>
                <Typography  sx={{marginTop:'10px' }}paragraph align='center'>Etkö omista tiliä?{' '}
                <Link component={RouterLink}  to='/register'> Luo tili täällä</Link></Typography>
            {error&& <p style={{color:'red', fontWeight:'bolder', fontSize:'20px'}}>{error}</p>}
            
            </FormControl>
        
        
        </Stack>
        </div>
    )
}