import Login from "@/components/auth/Login/Login";
import Register from "@/components/auth/Register/Register";
import About from "@/pages/About/About";
import Contact from "@/pages/Contact/Contact";
import Home from "@/pages/Home/Home";
import Products from "@/pages/Products/AllProduct/Products";
import BestSellingProduct from "@/pages/Products/BestSelling/BestSellingProduct";
import LatestSingleProduct from "@/pages/Products/LatestProduct/LatestSingleProduct";
import { Route } from "react-router-dom";

const UserRoutes = (
	<>
		<Route index element={<Home />} />
		<Route path="products" element={<Products />} />
		<Route path="about" element={<About />} />
		<Route path="contact" element={<Contact />} />
		<Route path="login" element={<Login />} />
		<Route path="register" element={<Register />} />

		{/* Best Selling Product Details */}
		<Route path="best-selling/:id" element={<BestSellingProduct/>}/>

		{/* Latest Product Details */}
		<Route path="latest-product/:id" element={<LatestSingleProduct/>}/>
	</>
);

export default UserRoutes;
