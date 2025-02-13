import ForgetPassword from '../pages/ForgetPassword';
import Login from '../pages/Authenticate/Login';
import Logout from '../pages/Authenticate/Logout';
import Setting from '../pages/Authenticate/Setting';
import Dashboard from '../pages/Dashboard';
import CreateSale  from '../pages/Users/CreateSale';
import Profile from '../pages/Authenticate/Profile';
import ChangePassword from '../pages/Authenticate/ChangePassword';
import UserList from '../pages/Users';
import ResendEmail from '../pages/Users/ResendEmail';
import RenewPassword from '../pages/Authenticate/RenewPassword';
import DirectLogin from '../pages/Authenticate/DirectLogin';
import Error from '../pages/Authenticate/Error';
import RegisterHidden from '../pages/RegisterHidden';

//import ProductList from '../pages/ProductList';
import Product from '../pages/ProductListAdmin/Detail';
import AddProduct from '../pages/ProductListAdmin/AddProduct';
import EditProduct from '../pages/ProductListAdmin/EditProduct';
import ProductListAdmin from '../pages/ProductListAdmin';
import ProductListSaler from '../pages/ProductListSaler';
import POS from '../pages/PointOfSales';

// Import Orders
import Orders from '../pages/Orders';
import OrderDetail from '../pages/Orders/OrderDetail';

// Import Customers
import Customers from '../pages/Customers';
import CustomerDetail from '../pages/Customers/Detail';
import CustomerHistory from '../pages/Customers/History';
// Layouts
//import {HeaderOnly} from '../components/Layout';
import {POSLayout} from '../components/Layout';


export const publicRouters = [
    { path: '/forget', element: ForgetPassword, layout: null},
    { path: '/login', element: Login, layout: null},
    { path: '/direct', element: DirectLogin, layout: null},
    { path: '/*', element: Error, layout: null},
    { path: '/register_admin', element: RegisterHidden, layout: null},
];

export const privateRouters = [
    { path: '/', element: Dashboard},
    { path: '/dashboard', element: Dashboard},
    { path: '/logout', element: Logout, layout: null},
    { path: '/setting', element: Setting},
    { path: '/profile', element: Profile},
    { path: '/change-password', element: ChangePassword},
    {path: '/renew-password', element: RenewPassword, layout: null},
];


export const adminRouters = [
    { path: '/users', element: UserList},
    { path: '/users/create', element: CreateSale},
    { path: '/users/resend-email', element: ResendEmail},
    { path: '/products', element: ProductListAdmin},
    { path: '/products/manage', element: ProductListAdmin},
    { path: '/products/add', element: AddProduct},
    { path: '/products/:barcode', element: Product},
    { path: '/products/edit/:barcode', element: EditProduct},
    { path: '/orders', element: Orders},
    { path: 'orders/:order_number', element: OrderDetail},
    { path: '/customers', element: Customers},
    { path: 'customers/:id', element: CustomerDetail},
    { path: 'customers/history/:id', element: CustomerHistory},
    
];

export const salerRouters = [
    { path: '/point-of-sale', element: POS, layout: POSLayout},
    { path: '/products', element: ProductListSaler},
    { path: '/products/:barcode', element: Product},
    { path: '/orders', element: Orders},
    { path: 'orders/:order_number', element: OrderDetail},
    { path: '/customers', element: Customers},
    { path: 'customers/:id', element: CustomerDetail},
    { path: 'customers/history/:id', element: CustomerHistory},
];

export const customerRouters = [];

