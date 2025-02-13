import { Fragment } from "react";
import ItemSidebar from "../item";
import ItemDropDown from "../itemdropdown";
function AdminSideBar() {
    return ( 
        <Fragment>
            <ItemSidebar title="Dashboard" url="/dashboard" icon="fa-solid fa-house"/>
            <ItemSidebar title="User Management" url="/users" icon="fa-solid fa-users">
                <ItemDropDown title="User List" url="/users" icon="fa-solid fa-rectangle-list"/>
                <ItemDropDown title="Create Account" url="/users/create" icon="fa-solid fa-plus"/>
                <ItemDropDown title="Re-send Email" url="/users/resend-email" icon="fa-solid fa-paper-plane"/>
            </ItemSidebar>
            <ItemSidebar title="Product Management" url="/products/manage" icon="fa-solid fa-box">
                <ItemDropDown title="Product List" url="/products" icon="fa-solid fa-cube"/>
                <ItemDropDown title="Add a new" url="/products/add" icon="fa-solid fa-plus"/>
            </ItemSidebar>
            <ItemSidebar title="Customers" url="/customers" icon="fa-solid fa-user-tie"/>
            <ItemSidebar title="Orders" url="/orders" icon="fa-solid fa-shopping-cart"/>
        </Fragment>
     );
}

export default AdminSideBar;