import './App.css';
import {Routes, Route} from 'react-router-dom'
import Register from './components/Register'
import Login from './components/Login'
import ManagerLogin from './components/ManagerLogin'
import PersistLogin from './components/PersistLogin';
import Layout from './components/Layout';
import RequireAuth from './components/RequireAuth';
import UserDashboard from './components/UserDashboard';
import ManagerDashboard from './components/ManagerDashboard';
import TaskForm from './components/TaskForm';


function App() {


  return (
    <div className="App">
        <Routes>
          <Route element={<PersistLogin/>}>
            {/* layout encompasses whole app to make everything work. put persistant items like nav bar in layout component */}
          <Route path='/' element={<Layout/>}>

            {/* routes accessable by anyone here */}
            <Route path='/' element={<Register/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/login/manager' element={<ManagerLogin/>}/>

            <Route element={<RequireAuth allowedRoles={'user'}/>}>
              {/* routes for users only here*/}
              <Route path='/dashboard/user' element={<UserDashboard/>}/>
            </Route>

            <Route element={<RequireAuth allowedRoles={'manager'}/>}>
              {/* routes for managers only here*/}
              <Route path='/dashboard/manager' element={<ManagerDashboard/>}/>
              <Route path='/newTask' element={<TaskForm/>}/>
            </Route>
          </Route>
          </Route>
        </Routes>
    </div>
  );
}

export default App;
