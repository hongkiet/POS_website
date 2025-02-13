import Search from "./searchComponent";
import Barcode from "./barcodeComponent";
import { useState, useEffect } from 'react';

function FindProducts({AddToCart, searchProducts}) {
    return ( 
        <div className="row">
            <div className="col-12 bg-light py-5 shadow-sm">
                <ul className="nav nav-tabs justify-content-center" role="tablist">
                    <li className="nav-item">
                        <a className="nav-link active" data-toggle="tab" href="#search">Search</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" data-toggle="tab" href="#barcode">Barcode</a>
                    </li>
                </ul>

                <div className="tab-content">
                    <div className="tab-pane container active" id="search">
                        <Search searchProducts={searchProducts}/>
                    </div>
                    <div className="tab-pane container fade" id="barcode">
                        <Barcode AddToCart={AddToCart}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FindProducts;