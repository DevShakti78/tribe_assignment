import React,{useState} from 'react'
import "../../App.css"
import {Link,useNavigate} from "react-router-dom"
import M from "materialize-css"

const Signup = () => {
 
  const navigate = useNavigate()
  const [name,setName] = useState("")
  const [password,setPassword] = useState("")
  const [email,setEmail] = useState("")
  
  const PostData = () =>{
    if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
      return  M.toast({html: "invalid email" ,classes:"#ff1744 red accent-3"})
        }
    fetch("http://localhost:5000/signup",{
      method:"post",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        name,
        password,
        email
      })
    }).then(res=>res.json())
    .then(data=>{
      if(data.error){
        M.toast({html: data.error,classes:"#ff1744 red accent-3"})
      }
      else{
        M.toast({html: data.message,classes:"#7cb342 light-green darken-1"})
        navigate('/login')
      }
    }).catch(err=>{
      console.log(err)
    })
  }
  return (
    <div className='mycard'>
    <div className="card auth-card">
    <img className='myimage' src="https://images-platform.99static.com//X6c5uQCTjlf4soSdRd71k3C0Vz8=/173x177:1288x1292/fit-in/500x500/99designs-contests-attachments/57/57580/attachment_57580284" alt="" />
      <input type="text" placeholder='name' value={name} onChange={(e)=>setName(e.target.value)} />
      <input type="text" placeholder='email' value={email} onChange={(e)=>setEmail(e.target.value)} />
      <input type="text" placeholder='password' value={password} onChange={(e)=>setPassword(e.target.value)} />
      <button onClick={()=>PostData()} className="btn waves-effect waves-light #4a148c purple darken-4" >Register
</button>
<h5>
  <Link to="/login">Already have an account ?</Link>
</h5>
    </div>
  </div>
  )
}

export default Signup