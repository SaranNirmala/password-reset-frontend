import { useState } from "react";
import { backendUrl } from "../../config";
import { Link, Navigate} from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './LoginStyle.css';


const Login = () =>{
   
//    const navigate=useNavigate();
    const [data,setData]= useState({
        email: '',
        password: '',
    });

     const [loggedIn, setLoggedIn] = useState(false);

    const handleChange = (e) =>{
        const {name, value} = e.target;
        setData({...data, [name]: value});
    }

    const handleSubmit= async(e) =>{
    e.preventDefault();
    const response = await fetch(`${backendUrl}/login`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers:{
            'content-type': 'application/json',
           
        }
    });
     const res= await response.json();
    if(response.status === 401){
        // alert("Password Invalid")
        toast.error("Password Invalid", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
    } else if( response.status === 403){
        // alert("Please Register")
        toast.error("Please Register ", {
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
    
        //  alert("Login Successfully")
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
    }

   
    
    if(sessionStorage.getItem('user') && JSON.parse(sessionStorage.getItem('user')) && loggedIn) {

        return <Navigate to={'/'} replace />;
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
             <h3>Login Form</h3>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email ID</label>
                <input type="email" name="email" value={data.email} placeholder="Enter your email ID" onChange={handleChange} required /> <br />
                <label htmlFor="password">Password</label>
                <input type="password" name="password" value={data.password} placeholder="Enter your Password" onChange={handleChange} required />
           <button type="submit">Submit</button>
            </form> <br /> 
            <Link to={'/forgotPassword'}>Forgot Password</Link>
            <Link to={'/register'} >Please Register Here</Link>
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

export default Login;