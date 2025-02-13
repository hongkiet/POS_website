import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ItemSidebar from './item';
//import ItemDropDown from './itemdropdown';
import '../../../GlobalStyle/index.css';
import AdminSideBar from './Admin';
import SalerSideBar from './Saler';
import CustomerSideBar from './Customer';
function Sidebar({role}) {
  
  const [admin, setAdmin] = useState(null);
  const [saler, setSaler] = useState(null);
  const [customer, setCustomer] = useState(null);
	const toggleSidebar = () => {
		const sidebar = document.querySelector(".sidebar");
		sidebar.classList.toggle("close");
	};

  useEffect(() => {
    if(role === 'Administrator') {
      setAdmin(<AdminSideBar/>);
    }else if(role === 'Sale person'){
      setSaler(<SalerSideBar />);
    }else if(role === 'Customer'){
      setCustomer(<CustomerSideBar />);
    }
  }, []);

  return (
    <div className="sidebar-container bg-main-highlight shadow-sm">
      <div className="sidebar close bg-main-highlight shadow">
        {/* <!-- ========== Logo ============  --> */}
        <div className="logo-box" onClick={toggleSidebar}>
            <i className="fa-solid fa-bars"></i>
            <Link className="logo-name" to="/">NODEJS FINAL</Link>
        </div>


        {/* <!-- ========== List ============  --> */}
        <ul className="sidebar-list">
            {/* <!-- -------- Non Dropdown List Item ------- --> */}
            {admin}
            {saler}
            {customer}
            {/* Public items */}
            <ItemSidebar title="Setting" url="/setting" icon="fa-solid fa-gear"/>
        </ul>
    </div>
    </div>
  );
}
export default Sidebar;
