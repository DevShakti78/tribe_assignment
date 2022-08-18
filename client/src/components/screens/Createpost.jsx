import React,{useState,useEffect} from 'react'
import M from 'materialize-css'
import { useNavigate } from 'react-router-dom'

const Createpost = () => {
  const navigate=useNavigate()
    const [title,setTitle] = useState("")
    const [body,setBody] = useState("")
    const [image,setImage] = useState("")
    const [url,setUrl] = useState("")

    useEffect(() => {
      
      if(url){
        fetch("http://localhost:5000/createpost",{
          method:"post",
          headers:{
            "Content-Type":"application/json",
            'Authorization':"Bearer "+localStorage.getItem("jwt")
          },
          body:JSON.stringify({
            title,
            body,
            pic:url
          })
        }).then(res=>res.json())
        .then(data=>{
          console.log(data)
          if(data.error){
            M.toast({html: data.error,classes:"#ff1744 red accent-3"})
          }
          else{
            M.toast({html: "created post succesfully",classes:"#7cb342 light-green darken-1"})
            navigate('/')
          }
        }).catch(err=>{
          console.log(err)
        })
      }

    }, [url])
    

    const postDetails = () =>{
        const data = new FormData()
       data.append("file",image)
       data.append("upload_preset","tribe-assg")
       data.append("cloud_name","shaktidf")
       fetch("https://api.cloudinary.com/v1_1/shaktidf/image/upload",{
           method:"post",
           body:data
       })
       .then(res=>res.json())
       .then(data=>{
          setUrl(data.url)
       })
       .catch(err=>{
           console.log(err)
       })

      

    }
  return (
    <>
    <div className='card input-feild'
    style={{margin:'30px auto',maxWidth:"500px",padding:"20px",textAlign:"center"}}
    >
        <input type="text" placeholder='title' value={title} onChange={(e)=>setTitle(e.target.value)} />
        <input type="text" placeholder='body' value={body} onChange={(e)=>setBody(e.target.value)} />
        <div className="btn #4a148c purple darken-4">
        <span style={{marginLeft:"20px"}}>Upload Image</span>
        <input type="file" onChange={(e)=>setImage(e.target.files[0])} />
      </div>
      <div className="file-path-wrapper">
        <input className="file-path validate" type="text"/>
      </div>
      <button onClick={(e)=>postDetails()} className="btn waves-effect waves-light #4a148c purple darken-4" >Create
  </button>
    </div>
    </>
  )
}

export default Createpost