import { useEffect } from "react";
import { useAuth } from '../Context/useAuth';

const Cart = () => {
    const { setCurrentUser, setAuth } = useAuth();

    useEffect(() => {
        const localToken = localStorage.getItem("token");
        if (localToken && localToken.length > 0) {
          setAuth(true);
        let user = JSON.parse(localStorage.getItem("user"));
        setCurrentUser(user);
        } else {
          setAuth(false);
        }
      }
      , [setCurrentUser, setAuth]); 

  return (
    <>
      <div className="container bg-white">
        <h1>Cart page</h1>
      </div>
    </>
  )
}

export default Cart
