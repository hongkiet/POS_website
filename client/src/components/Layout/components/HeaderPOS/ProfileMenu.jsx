import ItemProfile from "./ProfileMenuItem";
function ProfileMenu() {
    return ( 
        <ul className="navbar-nav position-absolute menu__profile">
            <ItemProfile url={'/profile'} title={'Profile'} icon={'fa-solid fa-address-card'}/>
            <ItemProfile url={'/change-password'} title={'Change Password'} icon={'fa-solid fa-repeat'}/>
            <ItemProfile url={'/logout'} title={'Logout'} icon={'fa-solid fa-right-from-bracket'}/>
		</ul>
     );
}

export default ProfileMenu;