import Login from "@/components/auth/Login/Login";
import Register from "@/components/auth/Register/Register";
import About from "@/pages/About/About";
import Contact from "@/pages/Contact/Contact";
import Home from "@/pages/Home/Home";
import Products from "@/pages/Products/AllProduct/Products";
import ProductView from "@/pages/Products/AllProduct/ProductView";
import { Route } from "react-router-dom";

const UserRoutes = (
	<>
		<Route index element={<Home />} />
		<Route path="products" element={<Products />} />
		
		{/* Product Routes with Categories */}
		<Route path="products/best-selling/:id" element={<ProductView />} />
		<Route path="products/latest/:id" element={<ProductView />} />
		<Route path="products/:id" element={<ProductView />} />

		{/* Other Routes */}
		<Route path="about" element={<About />} />
		<Route path="contact" element={<Contact />} />
		<Route path="login" element={<Login />} />
		<Route path="register" element={<Register />} />
	</>
);

export default UserRoutes;
