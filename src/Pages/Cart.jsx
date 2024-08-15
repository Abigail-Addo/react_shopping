import { useEffect, useState } from "react";
import { useAuth } from "../ContextAPI/useAuth";
import Header from "../components/header";
import "../assets/css/Cart.css";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Cart = () => {
  const [cartItem, setCartItem] = useState([]);
  const { setCurrentUser, setAuth, cartPrice, setCartPrice } = useAuth();
  const redirect = useNavigate();

  useEffect(() => {
    const localToken = localStorage.getItem("token");
    if (localToken && localToken.length > 0) {
      setAuth(true);
      let user = JSON.parse(localStorage.getItem("user"));
      setCurrentUser(user);
    } else {
      setAuth(false);
    }

    (async function fetchCartItems() {
      let user = JSON.parse(localStorage.getItem("user"));
      if (!user || !user.id) {
        console.error("User not found in localStorage");
        return;
      }

      let userId = user.id;
      if (userId > 0) {
        let rs = await fetch(
          "https://shopping-backend-mhxl.onrender.com/api/v1/orderWithUserId",
          {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({
              user_id: userId,
            }),
          }
        );
        if (rs.status === 200) {
          const response = await rs.json();
          setCartItem(response);
        }
      }
    })();
  }, [setCurrentUser, setAuth]);

  const deleteItem = async (orderId) => {
    try {
      const confirmed = confirm("Are you sure you want to delete this order?");
      if (confirmed) {
        const result = await fetch(
          `https://shopping-backend-mhxl.onrender.com/api/v1/deleteAnOrder/${orderId}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (result.status === 200 || result.status === 201) {
          const response = await result.json();
          console.log(response);

          const updatedCartItems = cartItem.filter(
            (order) => order.id !== orderId
          );
          setCartItem(updatedCartItems);
          toast.success("Order deleted successfully");
        } else {
          toast.error("Failed to delete order");
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateItem = async (orderId, event) => {
    try {
      const updatedQuantity = parseInt(event.target.value);
      const orderToUpdate = cartItem.find((order) => order.id === orderId);

      if (!orderToUpdate) {
        console.error("Order not found");
        return;
      }

      const updatedPrice = orderToUpdate.products.price * updatedQuantity;

      const result = await fetch(
        `https://shopping-backend-mhxl.onrender.com/api/v1/update-an-order/${orderId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            product_id: orderToUpdate.products.id,
            user_id: orderToUpdate.user_id,
            quantity: updatedQuantity,
            price: updatedPrice,
          }),
        }
      );

      if (result.status === 200 || result.status === 201) {
        const updatedCartItems = cartItem.map((order) => {
          if (order.id === orderId) {
            return {
              ...order,
              quantity: updatedQuantity,
              price: updatedPrice,
            };
          }
          return order;
        });

        setCartItem(updatedCartItems);
        toast.success("Order updated successfully");
        totalPriceCal();
      } else {
        const response = await result.json();
        console.error("Failed to update order:", response);
        toast.error("Failed to update order");
      }
    } catch (error) {
      console.error("Error updating order:", error);
      toast.error("An error occurred while updating the order");
    }
  };

  useEffect(() => {
    totalPriceCal();
  }, [cartItem]);

  const totalPriceCal = () => {
    const totalPrice = cartItem.reduce(
      (sum, order) => sum + parseFloat(order.price || 0),
      0
    );

    const formattedTotalPrice = totalPrice
      .toFixed(2)
      .replace(/\d(?=(\d{3})+\.)/g, "$&,");

    setCartPrice("GH" + "\u00A2" + " " + formattedTotalPrice);
    localStorage.setItem("totalPrice", formattedTotalPrice);
  };

  const goToHome = () => {
    redirect("/home");
  };

  return (
    <>
      <Header></Header>

      <ToastContainer />

      <div className="container mt-4 mb-4 px-5 py-5 bg-white">
        <div className="row">
          <h2 className="h6 d-flex flex-wrap justify-content-between align-items-center px-4 py-3">
            <span>Cart Summary</span>
            <a className="font-size-sm text-decoration-none" onClick={goToHome}>
              Continue shopping
            </a>
          </h2>
          <div className="col-xl-9 col-md-8 border-bottom">
            {cartItem.map((order) => (
              <div
                className="d-sm-flex justify-content-between my-4 order-container"
                key={order.id}
              >
                <div className="d-block d-sm-flex text-center text-sm-left">
                  <a className="cart-item-thumb mr-sm-4">
                    <img
                      src={order.products.image}
                      className="w-100 h-100"
                      alt="Product"
                    />
                  </a>
                  <div className="media-body pt-3 px-4">
                    <h3 className="product-card-title fw-bold border-0 pb-0">
                      {order.products.name}
                    </h3>
                    <div className="font-size-sm">
                      {order.products.description}
                    </div>
                    <div className="font-size-lg pt-2">
                      <p className="Itemprice">
                        &cent; {order.price || order.products.price}
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="delete">
                    <button
                      className="btn btn-outline-danger btn-sm btn-block"
                      type="button"
                      id={order.products.id}
                      onClick={() => deleteItem(order.id)}
                    >
                      <i className="bi bi-trash"></i>Remove
                    </button>
                  </div>
                  <div className="delete">
                    <input
                      type="number"
                      name="number"
                      id="number"
                      min={1}
                      max={10}
                      defaultValue={order.quantity}
                      onChange={(e) => updateItem(order.id, e)}
                      onKeyDown={(e) => e.preventDefault()}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="col-xl-3 col-md-4">
            <h2 className="h6 px-4 py-3 text-start border-bottom pb-5">
              Subtotal
            </h2>
            <div className="h3 font-weight-semibold text-start py-3">
              {cartPrice}
            </div>
            <hr />
            <p className="h6 pt-2 font-weight-semibold text-muted">
              Delivery fees are not included
            </p>
            <Link to="/payment">
              <p className="btn btn-primary btn-block">Proceed to Checkout</p>
            </Link>
            <div className="pt-4">
              <div className="accordion" id="cart-accordion">
                <div className="card">
                  <div className="card-header">
                    <h3 className="accordion-heading font-weight-semibold">
                      Returns are easy
                    </h3>
                    <p>Free return within 15 days</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
