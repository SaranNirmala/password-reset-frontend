import { useState } from "react";
import { backendUrl } from "../../config";
import { Navigate} from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Register =() => {
      
 
    const [register, setRegister] = useState({
        name:'',
        email: '',
        password: '',
    })

    const [loggedIn, setLoggedIn] = useState(false)

    const handleChange = (e) =>{
      const {name, value}= e.target;
      setRegister({...register, [name]: value});
    }


const handleSubmit = async(e) =>{
    e.preventDefault();
    const response= await fetch(`${backendUrl}/register`,{
        method: 'POST',
        body: JSON.stringify(register),
        headers:{
            "content-type": "application/json",
        }
    })
   
    const res= await response.json();
    if(response.status=== 409){
    //   alert("User already registered")
    toast.error("User already exists", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }   else{
        //   alert("Registered successfully")
        toast.success('Login Successfully', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
        sessionStorage.setItem("user", JSON.stringify(res));
        setLoggedIn(true);
      }
      setRegister({
        name:'',
        email: '',
        password: '',
    });
}


if (
    sessionStorage.getItem("user") &&
    JSON.parse(sessionStorage.getItem("user"))
 && loggedIn ) {
    return <Navigate to={"/"} replace />;
  }

    return (
        <div>
            <div style={{
            display: 'flex',
            height:'400px',
            width:'350px',
            backgroundColor:'black',
            color:'white',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            margin:'10px'
        }}>
            <h3>Registration Form</h3>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name</label>
                <input type="name" name="name" value={register.name} placeholder="Enter your Name" onChange={handleChange} required /> <br />
                <label htmlFor="email">Email ID</label>
                <input type="email" name="email" value={register.email} placeholder="Enter your email ID" onChange={handleChange} required /> <br />
                <label htmlFor="password">Password</label>
                <input type="password" name="password" value={register.password} placeholder="Enter your Password" onChange={handleChange} required />
               <button type="submit">Submit</button> 
            </form>
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

export default Register;