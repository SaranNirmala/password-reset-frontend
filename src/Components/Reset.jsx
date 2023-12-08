
import { useState } from "react";
import { backendUrl } from "../../config";
import { Navigate } from "react-router-dom";
import './LoginStyle.css';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



const Reset = () =>{
   
//    const navigate=useNavigate();
    const [data,setData]= useState({
        password: '',
    });
     
    // eslint-disable-next-line no-unused-vars
    const [resetPassword,setResetPassword] = useState(false)
    const handleChange = (e) =>{
        const {name, value} = e.target;
        setData({...data, [name]: value});
    }

    const handleSubmit= async(e) =>{
    e.preventDefault();
    const response = await fetch(`${backendUrl}/resetPassword`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers:{
            'Content-Type': 'application/json'
        }
    });
     // eslint-disable-next-line no-unused-vars
     const res= await response.json();
     console.log(res)
    if(response.status === 401){
    //   alert("Reset validation error");
      toast.error("Reset Validation error", {
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
     alert("Password reset successfully")
    toast.success('Password reset successfully', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
            setResetPassword(true);
            setData({
                password:'',
            })
    }
    }

  console.log(resetPassword);
    if(resetPassword === true){
        return <Navigate to={'/login'} replace/>
      }

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
            <h5>Reset Your Password</h5>
            <form onSubmit={handleSubmit}>
                <label htmlFor="password">Password:</label>
                <input type="password" name="password" value={data.password} placeholder="Enter your password" onChange={handleChange} required /> <br />
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

export default Reset;