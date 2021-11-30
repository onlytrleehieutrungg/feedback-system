import {
    BrowserRouter as Router,
    Redirect,
  } from "react-router-dom";
const Logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('name');
    localStorage.removeItem('roleId');
    return (
        <Redirect to={'/login'}></Redirect>
    )
};
export default Logout;