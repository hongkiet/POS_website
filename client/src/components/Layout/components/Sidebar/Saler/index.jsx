import { Fragment } from "react";
import ItemSidebar from "../item";
function SalerSideBar() {
    return (
        <Fragment>
            {/* <!-- -------- Non Dropdown List Item ------- --> */}
            <ItemSidebar title="Dashboard" url="/dashboard" icon="fa-solid fa-home"/>
            <ItemSidebar title="Products" url="/products" icon="fa-solid fa-box"/>
            <ItemSidebar title="POS" url="/point-of-sale" icon="fa-solid fa-calculator"/>
            <ItemSidebar title="Orders" url="/orders" icon="fa-solid fa-shopping-cart"/>
            <ItemSidebar title="Customers" url="/customers" icon="fa-solid fa-users"/>
        </Fragment>
    );
}

export default SalerSideBar;