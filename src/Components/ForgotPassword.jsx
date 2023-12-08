
import { useState } from "react";
import { backendUrl } from "../../config";
import './LoginStyle.css';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ForgotPassword = () =>{
   
//    const navigate=useNavigate();
    const [data,setData]= useState({
        email: '',
    });
     
    const handleChange = (e) =>{
        const {name, value} = e.target;
        setData({...data, [name]: value});
    }

    const handleSubmit= async(e) =>{
    e.preventDefault();
    const response = await fetch(`${backendUrl}/forgotPassword`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers:{
            'content-type': 'application/json'
        }
    });
     // eslint-disable-next-line no-unused-vars
     const res= await response.json();
    if(response.status === 401){
    //    alert("Email invalid")
    toast.error("Email Invalid", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
        //   alert("We have sent the Link")
          toast.success('We have sent the Link Please check your mail', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
            setData({
                email:"",
            })
    }
    }

    // console.log(data)


    return (
        <div >     
        <div style={{
            display: 'flex',
            height:'400px',
            width:'350px',
            backgroundColor:'black',
            color:'white',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            margin:'10px',
            border:"none",
            borderRadius: '10px',
        }}>
            <h5>Forgot your password?</h5>
            <form action="" onSubmit={handleSubmit}>
                <label htmlFor="email">Email ID</label>
                <input type="email" name="email" value={data.email} placeholder="Enter your email ID" onChange={handleChange} required /> <br />
           <button type="submit">Submit</button>
            </form> <br />
           
          </div>
          <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
          </div>   
       
    )
}

export default ForgotPassword;