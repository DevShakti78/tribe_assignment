import React,{useState,useContext} from 'react'
import { Link ,useNavigate} from 'react-router-dom'
import {userContext} from "../../App"
import M from 'materialize-css'

const Login = () => {
  const {state,dispatch} = useContext(userContext)
  const navigate = useNavigate()
  const [password,setPassword] = useState("")
  const [email,setEmail] = useState("")
  
  const PostData = () =>{
    if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
      return  M.toast({html: "invalid email" ,classes:"#ff1744 red accent-3"})
        }
    fetch("http://localhost:5000/signin",{
      method:"post",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        password,
        email
      })
    }).then(res=>res.json())
    .then(data=>{
      console.log(data)
      if(data.error){
        M.toast({html: data.error,classes:"#ff1744 red accent-3"})
      }
      else{
        localStorage.setItem("jwt",data.token)
        localStorage.setItem("user",JSON.stringify(data.user))
        dispatch({type:"USER",payload:data.user})
        M.toast({html: "signed in succesfully",classes:"#7cb342 light-green darken-1"})
        navigate('/')
      }
    }).catch(err=>{
      console.log(err)
    })
  }
  return (
    <div className='mycard'>
      <div className="card auth-card">
      <img className='myimage' src="https://images-platform.99static.com//X6c5uQCTjlf4soSdRd71k3C0Vz8=/173x177:1288x1292/fit-in/500x500/99designs-contests-attachments/57/57580/attachment_57580284" alt="" />
      <input type="text" placeholder='email' value={email} onChange={(e)=>setEmail(e.target.value)} />
      <input type="text" placeholder='password' value={password} onChange={(e)=>setPassword(e.target.value)} />
        <button onClick={()=>PostData()} className="btn waves-effect waves-light #4a148c purple darken-4" >Login
  </button>
  <h5>
  <Link to="/signup">Don't have an account ?</Link>
</h5>
      </div>
    </div>
  )
}

export default Login