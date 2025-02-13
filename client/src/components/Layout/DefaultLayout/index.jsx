import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { Fragment } from 'react';
function DefaultLayout({children, user}) {
    return (
        <Fragment>
            <div className="row m-0">
                <div className="col-12 p-0">
                    <Header user={user}/>
                </div>
            </div>
            <div className='row m-0 p-0' id="container">
                <div className="col-1">
                    <Sidebar role={user.role}/>
                </div>
                <div className="col-12 pt-3 pl-5">
                    <div className='content ml-5'>
                        <div className="card shadow-sm p-4 mb-4 bg-white">
                            <div className="card-body">
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default DefaultLayout;