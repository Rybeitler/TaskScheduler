import logo from './logo.svg';
import './App.css';
import {useState} from 'react'
import {Routes, Route} from 'react-router-dom'
import Register from './components/Register'
import Login from './components/Login'
import ManagerLogin from './components/ManagerLogin'
import {UserProvider} from './context/UserContext'


function App() {
    const [allUsers, setAllUsers] = useState([])

  return (
    <div className="App">
      <UserProvider>
        <Routes>
            <Route path='/' element={<Register/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/login/manager' element={<ManagerLogin/>}/>
        </Routes>
      </UserProvider>
    </div>
  );
}

export default App;
