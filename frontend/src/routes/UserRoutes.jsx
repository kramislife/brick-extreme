import Login from "@/components/auth/Login/Login";
import Register from "@/components/auth/Register/Register";
import AddProduct from "@/components/admin/Products/AddProduct/AddProduct";
import Dashboard from "@/components/admin/Dashboard/Dashboard";
import About from "@/pages/About/About";
import Contact from "@/pages/Contact/Contact";
import Home from "@/pages/Home/Home";
import Products from "@/pages/Products/AllProduct/Products";
import ProductView from "@/pages/Products/AllProduct/ProductView";
import { Route } from "react-router-dom";
import AdminView from "@/pages/Admin/AdminView";
import ViewProducts from "@/components/admin/Products/ViewProducts";
import ViewOrder from "@/components/admin/Products/ViewOrder";
import ViewUsers from "@/components/admin/Products/ViewUsers";
import ViewReviews from "@/components/admin/Products/ViewReviews";
import CategoriesPage from "@/pages/Categories/CategoriesPage";

const UserRoutes = (
	<>
		{/* Public Routes */}
		<Route index element={<Home />} />
		<Route path="products" element={<Products />} />
		<Route path="categories" element={<CategoriesPage />} />
		
		{/* Product Routes with Categories */}
		<Route path="products/best-selling/:id" element={<ProductView />} />
		<Route path="products/latest/:id" element={<ProductView />} />
		<Route path="products/:id" element={<ProductView />} />

		{/* Auth Routes */}
		<Route path="login" element={<Login />} />
		<Route path="register" element={<Register />} />

		{/* Other Routes */}
		<Route path="about" element={<About />} />
		<Route path="contact" element={<Contact />} />

		{/* Admin Routes */}
		<Route path="admin" element={<AdminView />}>
			<Route index element={<Dashboard />} />
			<Route path="new-product" element={<AddProduct />} />
			<Route path="products" element={<ViewProducts />} />
			<Route path="orders" element={<ViewOrder />} />
			<Route path="users" element={<ViewUsers />} />
			<Route path="reviews" element={<ViewReviews />} />
		</Route>
	</>
);

export default UserRoutes;
