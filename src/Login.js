// Project created by Chirag Gupta
//9023747490
// chiraggupta31cg@gmail.com

import {useState} from "react";
import {useNavigate} from "react-router-dom";
import './App.css';
import Message from "./Message";

function Login() {

  const[email,setemail]=useState("");
  const[password,setPassword]=useState("");
  const [message, setMessage] = useState({ type: '', content: '' });
  const navigate=useNavigate();
 

  const login=async(e)=>{
    e.preventDefault();

    try{
      const res=await fetch("https://reqres.in/api/login",{
        method:"POST",
        headers:{
          "Content-type":"application/json"
        },
        body:JSON.stringify({
          email:email,
          password:password

        })
      });

      const credential=await res.json();
      if(res.ok){
        localStorage.setItem("token",credential.token);
        setMessage({ type: 'success', content: 'Login successful! Redirecting...' });
        setTimeout(() => navigate('/users'), 2000);
       
      }else{
        const errorData = await res.json();
        setMessage({ type: 'error', content: errorData.error || 'Login failed' });
      }
    }
    catch(err){
      console.log('error: ',err);
      setMessage({type:'error', content: err || "Try Again!"});
    }
  };


  return (
    <div className="layout">
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={login}>
        <p className="input1"> Email</p>
        <i class="fa fa-envelope"></i>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setemail(e.target.value)}
          required
        />
        <p className="input2">Password</p>
        <i class="fa fa-unlock-alt"></i>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      {message.content && (
        <Message type={message.type} message={message.content} onClose={() => setMessage({ type: '', content: '' })} />
      )}
    </div>
    </div>
  );
}

export default Login;
