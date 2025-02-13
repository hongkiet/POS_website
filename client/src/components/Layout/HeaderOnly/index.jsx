import Header from '../components/Header';
function HeaderOnly({children, user}) {
    return (
        <div>
            <Header user={user}/>
            <container>
                <div className='content'>
                    {children}
                </div>
            </container>
        </div>
    );
}

export default HeaderOnly;