import { Outlet } from 'react-router-dom'



const Layout = () => {
    return (
        <main className='App'>
            {/* nav bar goes here */}
            <Outlet/>
            {/* footer goes here */}
        </main>
    );
}

export default Layout;