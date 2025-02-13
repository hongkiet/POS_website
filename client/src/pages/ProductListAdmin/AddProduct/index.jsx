import { Fragment } from "react";
import AddNew from './add-new';
import AddwBarcode from "./add-with-barcode";
function AddProduct() {
    return (
        <Fragment>
            <ul className="nav nav-tabs justify-content-center">
                <li className="nav-item">
                    <a className="nav-link active" data-toggle="tab" href="#addnew">Add a new</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" data-toggle="tab" href="#withbarcode">Add with barcode</a>
                </li>
            </ul>

            <div className="tab-content mt-3">
                <div className="tab-pane container active" id="addnew">
                    <AddNew />
                </div>
                <div className="tab-pane container fade" id="withbarcode">
                    <AddwBarcode />
                </div>
            </div>
        </Fragment>
    );
}

export default AddProduct;