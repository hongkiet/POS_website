import HeaderPOS from '../components/HeaderPOS';
import { Fragment } from 'react';
function POSLayout({children, user}) {
    return (
        <Fragment>
            <HeaderPOS user={user}/>
            <container>
                <div className='content mt-5'>
                    {children}
                </div>
            </container>
        </Fragment>
    );
}

export default POSLayout;