import { Link, Stack, FormControl, TextField,Button,
    InputLabel,OutlinedInput, Divider, Typography, FormHelperText,IconButton, InputAdornment } from '@mui/material';

import { Visibility, VisibilityOff} from '@mui/icons-material'
import { useState } from "react"
import {Link as RouterLink, useNavigate } from 'react-router-dom'

import validator from 'validator'
import { useAuthContext } from '../hooks/useAuthContext';

export const Register=()=>{

    const navigate = useNavigate()
   const [formData,setFormData] = useState({
           email:'',
           password:'',
           firstname:'',
           lastname:'',
           age:0,
           repeatPassword:'',
           showPassword:false,
           showRepeatPassword:false
   })

   const [serverErrors, setServerErrors] =useState('')
   const[errors, setErrors]=useState({
       email:false,
       password:false,
       repeatPassword:false,
       firstname:false,
       age:false,
       lastname:false,
       fetchError:false,
       fetchErrorMsg:'',
       
   })
   const togglePassword=(showPasswordInput)=>{
       setFormData({...formData, [showPasswordInput]:!formData[showPasswordInput]})
   }

   const handleChange= (fieldName) => (event)=>{
       const current =event.target.value

      switch (fieldName){
       case 'firstname':
           validator.isAlpha(current)?setErrors({...errors, firstname:false}):setErrors({...errors, firstname:true})
           break
       case 'lastname':
           validator.isAlpha(current)?setErrors({...errors, lastname:false}):setErrors({...errors, lastname:true})
           break
       case 'email':
           validator.isEmail(current)?setErrors({...errors, email:false}):setErrors({...errors, email:true})
           break
       case 'repeatPassword':
           current===formData.password ?setErrors({...errors, repeatPassword:false}):setErrors({...errors, repeatPassword:true})
           break
      }
       setFormData({...formData, [fieldName]: event.target.value})
  
     setServerErrors('')
   }   
    const {dispatch, user} =useAuthContext()

   const handleSubmit= async(event)=>{
    
       event.preventDefault()
 
        const resp = await fetch('/api/register',{
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                email: formData.email,
                password: formData.password,
                age: formData.age,
                firstname: formData.firstname,
                lastname: formData.lastname
            })
        })
        const json = await resp.json()
        if(!resp.ok){

           setServerErrors(json.message)
        }
        if(resp.ok){
                localStorage.setItem('user', JSON.stringify(json))
                dispatch({type:'LOGIN', payload: json})
                console.log(user)
                navigate('/')


        }
 
   
 
           
    
   }
   return (
    <div className="regFormDiv">
    
       <Stack 
           component='form'
           onSubmit={handleSubmit}
           noValidate
           spacing={4}
           sx={{borderRadius:'8px',bgcolor:'#f5f5f6',color:"tumma", padding:'40px',maxWidth:'600px', maxHeight:'800px',margin:'auto'}}
        >
           <TextField variant='outlined'

           required={true} 
           type='text'
           label='Etunimi'
           value={formData.firstname}
           onChange={handleChange('firstname')}
           error={errors.firstname}
           helperText={errors.firstname && 'Vain kirjaimia'}/>
           <TextField variant='outlined'
           required={true} 
           type='text'
           label='Sukunimi'
           value={formData.lastname}
           onChange={handleChange('lastname')}
           error={errors.lastname}
           helperText={errors.lastname && 'Vain kirjaimia.'}/>
           <TextField variant='outlined'
           required={true} 
           inputProps={{ min:15, max: 100 }}
           type='number'
           label='Ikä'
           value={formData.age}
           onChange={handleChange('age')}
           error={errors.lastname}
           helperText={errors.age && 'Syötä ikä numeroina.'}/>
           <TextField variant='outlined'
           required={true} 
           type='email'
           label='Sähköposti'
           value={formData.email}
           onChange={handleChange('email')}
           error={errors.email}
           helperText={errors.email && 'Tarkista email.'}/>

           <FormControl variant='outlined'>
               <InputLabel sx={{backgroundColor: "#f5f5f6"}} htmlFor='password-field'>Salasana</InputLabel>
               <OutlinedInput required={true}  id='password-field' type={formData.showPassword?'text':'password'} value={formData.password}onChange={handleChange('password')}
                endAdornment={
                   <InputAdornment position='end'><IconButton aria-label="toggle password visibility" onClick={()=>togglePassword('showPassword')} edge='end'>{
                       formData.showPassword?<VisibilityOff/>:<Visibility/>
                   }</IconButton></InputAdornment>
               }/>
           </FormControl>


           <FormControl variant='outlined'>
               <InputLabel  sx={{backgroundColor: "#f5f5f6"}}  htmlFor='password-repeat-field'>Toista salasana</InputLabel>
               <OutlinedInput required={true}   id='password-repeat-field' type={formData.showRepeatPassword?'text':'password'}  value={formData.repeatPassword} onChange={handleChange('repeatPassword')}endAdornment={
                   <InputAdornment position='end'><IconButton aria-label="toggle password visibility" onClick={()=>togglePassword('showRepeatPassword')} edge='end'>{
                       formData.showRepeatPassword?<VisibilityOff/>:<Visibility/>
                   }</IconButton></InputAdornment>
               }
             />
             {errors.repeatPassword && <FormHelperText error={errors.repeatPassword}>Salasanat eivät täsmää</FormHelperText> }
           </FormControl>


           <FormControl>
               <Button  className='btnRegLog' variant='contained' size='large' type="submit" sx={{minWidth:'70%'}}>Rekisteröidy</Button>
           <Divider/>
           <Typography paragraph align='center'>Omistatko jo tilin?{' '}
           <Link component={RouterLink} to='/login'> Kirjaudu sisään täältä</Link></Typography>
           {/*errors.fetchError&& <p style={{color:'red'}}>{errors.fetchErrorMsg}</p>*/}
           { <p style={{color:'red'}}>{serverErrors}</p>}
           
           </FormControl>


        </Stack>
    </div>
   )
}