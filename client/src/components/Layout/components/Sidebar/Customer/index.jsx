import { Fragment } from "react";
import ItemSidebar from "../item";
function CustomerSideBar() {
    return ( 
        <Fragment>
            <ul className="sidebar-list">
                {/* <!-- -------- Non Dropdown List Item ------- --> */}
                <ItemSidebar title="Dashboard" url="/dashboard" icon="fa-solid fa-home"/>
                <ItemSidebar title="Product" url="/product" icon="fa-solid fa-box"/>
                <ItemSidebar title="Order" url="/order" icon="fa-solid fa-shopping-cart"/>
                <ItemSidebar title="Customer" url="/customer" icon="fa-solid fa-users"/>
                <ItemSidebar title="Setting" url="/setting" icon="fa-solid fa-gear"/>
            </ul>
        </Fragment>
     );
}

export default CustomerSideBar;