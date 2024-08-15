import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../ContextAPI/useAuth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Product = () => {
  const [products, setProducts] = useState([]);
  const { setCartCount, cartCount } = useAuth();
  const [productTotal, setProductTotal] = useState();

  useEffect(() => {
    (async function () {
      let result = await fetch(
        "https://shopping-backend-mhxl.onrender.com/api/v1/products"
      );
      const response = await result.json();
      setProducts(response);
      // handleAddToCart();
      let user = JSON.parse(localStorage.getItem("user"));
      if (!user || !user.id) {
        console.error("User not found in localStorage");
        return;
      }

      const rs = await fetch(
        "https://shopping-backend-mhxl.onrender.com/api/v1/orders-with-userId",
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            user_id: user.id,
          }),
        }
      );

      if (rs.status == 200) {
        let orders = await rs.json();

        const { order } = orders;
        const count = order.length;

        setCartCount(count);
      }

      productNumber();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productTotal, cartCount]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const productNumber = async () => {
    let result = await fetch(
      "https://shopping-backend-mhxl.onrender.com/api/v1/products"
    );
    const response = await result.json();

    let initialLength = productTotal;
    const productName = response.reduce(
      (newLength, length) => newLength + length,
      initialLength
    );
    setProductTotal(productName);
  };

  const cartBtn = async (product_id) => {
    let user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user.id) {
      toast.error("Please login to add an item to cart");
      console.error("User not found in localStorage");
      return;
    }

    let user_id = user.id;

    const order = await fetch(
      "https://shopping-backend-mhxl.onrender.com/api/v1/order",
      {
        method: "POST",
        headers: {
          "content-type": "application/json ",
        },
        body: JSON.stringify({
          product_id: Number(product_id),
          user_id: Number(user_id),
        }),
      }
    );

    if (order.status == 409) {
      let res = await order.json();
      toast.error("Product has already been added to cart");
      console.log(res);

      return;
    }

    if (order.status == 200 || order.status == 201) {
      let res = await order.json();
      console.log(res);

      toast.success("Item successfully added to cart");
      // handleAddToCart();
    }
  };

  return (
    <>
      <ToastContainer />

      <motion.div
        initial={{ x: -1000 }}
        animate={{ x: 0 }}
        exit={{ x: -1000 }}
        transition={{ duration: 1 }}
      >
        <div className="container mt-4 mb-4 bg-white px-5 py-5">
          <h1 className="pb-3">Featured Products</h1>
          <p>
            Images may not show because I&apos;m using the free version of
            render to host the backend. <br />
            Render instances have an ephemeral filesystem, meaning any file
            written to the instance after it has booted will be lost when it
            next restarts (e.g. spun down if on free instance type, next deploy,
            manual restart, etc.). If you want to use file uploads on your
            service, you&apos;ll need to have a persistent store, e.g. a Render
            Disk (which is chargeable and also requires a paid instance type) or
            an external service like AWS S3.
          </p>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-5">
            {products.map((item) => (
              <div className="col" key={item.id}>
                <div className="card d-flex justify-content-center align-items-center">
                  <img
                    src={item.image}
                    className="card-img-top w-50 h-25 pt-3"
                    alt="hot deals"
                  />
                  <div className="card-body py-0">
                    <div className="card-text text-justify">
                      <p className="fw-bold textTruncate d-block para text-wrap text-truncate">
                        {item.name}
                      </p>
                      <div className="para">
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star"></i>
                      </div>
                      <p className="price para">&cent; {item.price}</p>

                      <i
                        className="fa fa-shopping-cart addCart text-dark"
                        aria-hidden="true"
                        id={item.id}
                        onClick={() => cartBtn(item.id)}
                      ></i>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Product;
