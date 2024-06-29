import { useContext, useEffect } from "react";
import { ProductContext } from "../contexts/ProductProvider";
import { Link } from "react-router-dom";

function Home() {
	const { products, dispathProducts } = useContext(ProductContext);
    useEffect(() => {
        fetch('http://localhost:3000/products')
            .then(response => response.json())
            .then(data => {
                dispathProducts({
                    type: "SET_PRODUCT",
                    payload: data
                })
            })
            .catch(error => {
                console.log(error);
            })
    }, [])
	return (
		<div className="m-5">
			<h1>Danh sách sản phẩm</h1>
			<div className="flex flex-wrap justify-around w-[100%] mt-6">
				{products?.map((product) => (
				<div key={product.id} className="max-w-md mx-auto rounded-md overflow-hidden shadow-md hover:shadow-lg w-[30%] p-4 mt-10 ">
				<div className="relative">
				<img className="w-full" src={product.thumbnail} alt="" />
					<div className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 m-2 rounded-md text-sm font-medium">SALE
					</div>
				</div>
				<div className="p-4">
					<h3 className="text-lg font-medium mb-2"> <Link to={`product-detail/${product.id}`}>{product.title}</Link></h3>
					<p className="text-gray-600 text-sm mb-4">{product.description}</p>
					<div className="flex items-center justify-between">
						<span className="font-bold text-lg">${product.price}</span>
						<button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
					Add Cart
				  </button>
					</div>
				</div>
			</div>
				))}
			</div>
		</div>
	);
}

export default Home;	// <div key={product.id} className="card rounded shadow w-[25%] p-4 mt-10">
					// 	<div className="max-w-md mx-auto rounded-md overflow-hidden shadow-md hover:shadow-lg">
					// 		<img className="max-w-[100%] h-[250px]" src={product.thumbnail} alt="" />
					// 	<h3 className="text-lg font-medium mb-2">${product.title}</h3>
					// 	<p className="text-gray-600 text-sm mb-4">{product.description}</p>
					// 	<div className="">
					// 		<p className="flex items-center justify-between">${product.price}</p>
					// 	<button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Add to cart</button>
					// 	</div>
						
					// 	</div>
						
					// </div>