import axios from 'axios'
import useAuth from './useAuth';

const useLogout = () =>{
    const {setAuth} = useAuth()


    const logout = async ()=>{
        setAuth({})
        try{
            const res = await axios.get('http://localhost:8000/api/logout',{withCredentials:true})
        }
        catch(err){
            console.log(err)
        }
    }
    return logout;
}

export default useLogout;