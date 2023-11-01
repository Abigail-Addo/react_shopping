import { useEffect, useState } from "react";

const Product = () => {
    const [products, setProducts] = useState([])


    useEffect(() => {
        (async function () {

            let result = await fetch('http://localhost:7070/shop/v1/products')
            const response = await result.json();
            setProducts(response)

        })();
    }, [])



    return (
        <>
            <div className="container mt-4">
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-3">

                    {products.map((item) => (
                        <div className="col" key={item.id}>
                            <div className="card shadow-sm d-flex justify-content-center align-items-center">
                                <img src={item.image} className="card-img-top w-50 h-25 pt-3" alt="hot deals" />
                                <div className="card-body py-0">
                                    <div className="card-text text-justify">
                                        <p className="fw-bold textTruncate d-block para">{item.name}</p>
                                        <div className="para">
                                            <i className="bi bi-star-fill"></i>
                                            <i className="bi bi-star-fill"></i>
                                            <i className="bi bi-star-fill"></i>
                                            <i className="bi bi-star-fill"></i>
                                            <i className="bi bi-star"></i>
                                        </div>
                                        <p className="price para">&cent; {item.price}</p>
                                        <a href="" className="text-dark">
                                            <i className="fa fa-shopping-cart addCart" aria-hidden="true" id={item.id}></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </>
    )

}

export default Product
