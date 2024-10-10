import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Login from "./Login.js";
import UserList from "./Users.js";
import Edit from "./Edit.js";

function App(){
  return(
    <Router>
        <Routes>
          <Route path="/" element={<Login/>}></Route>
          <Route path="/users" element={<UserList/>}></Route>
          <Route path="/edit/:id" element={<Edit/>} />
        </Routes>
    </Router>
  )
}


export default App;
