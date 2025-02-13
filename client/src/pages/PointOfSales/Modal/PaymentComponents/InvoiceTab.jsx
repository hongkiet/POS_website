import ProductTab from "./ProductTab";
import html2canvas from 'html2canvas';
import jsPDF from "jspdf";
import { useEffect, useState } from "react";
import Num2VND from "../../../../components/Num2VND";
function InvoiceTab({invoice}) {

    useEffect(() => {
    }, [invoice]); 

    const downloadPDF = ()=>{
        const capture = document.querySelector('.capture-invoice');
        html2canvas(capture)
            .then((canvas) => {
                const imgData = canvas.toDataURL('img/png');
                const doc = new jsPDF('p','px','a4');
                const componentWidth = doc.internal.pageSize.getWidth();
                console.log(componentWidth);
                const componentHeight = doc.internal.pageSize.getHeight();
                doc.addImage(imgData, 'PNG', 0, 0, componentWidth, componentHeight);
                doc.save(`invoice-${invoice.order.order_number}.pdf`);
            })
    }

    return ( 
        <div class="modal fade" id="invoiceModal">
            <div class="modal-dialog modal-xl">
                <div class="modal-content">
                
                    <div class="modal-header bg-main text-light">
                        <div class="modal-title">
                            <h4>Invoice Information</h4>
                        </div>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    </div>
                    
                    <div class="modal-body capture-invoice">
                        <div className="row">
                            <div className="col">
                                <h2 className="text-uppercase"><strong>Invoice</strong></h2>
                                <img
                                    width={100} 
                                    src="https://firebasestorage.googleapis.com/v0/b/nodejs-final-8bdf4.appspot.com/o/919825.png?alt=media&token=29bd9385-a5f1-4e95-ab7b-86747f4d62f9"/>
                            </div>
                            <div className="col">
                                <p><strong>Invoice Number</strong>: {invoice&&invoice.order.order_number}</p>
                                <p><strong>Invoice Date:</strong> {invoice&& new Date(invoice.order.created_date).toDateString()}</p>
                            </div>
                        </div>
                        <div className="row mt-4">
                            <div className="col">
                                <p><strong>Billing Information</strong></p>

                                <div className="form-group">
                                    <label><strong>Company</strong></label>
                                    <br />
                                    <span>NodeJS POS Inc.</span>
                                </div>
                                <div className="form-group">
                                    <label><strong>Name Staff</strong></label>
                                    <br />
                                    <span>{invoice&&invoice.staff.name}</span>
                                </div>
                                <div className="form-group">
                                    <label><strong>Email</strong></label>
                                    <br />
                                    <span>{invoice&&invoice.staff.email}</span>
                                </div>
                                <div className="form-group">
                                    <label><strong>Address</strong></label>
                                    <br />
                                    <span>19 Nguyen Huu Tho, P. Tan Phong, D.7, Ho Chi Minh City</span>
                                </div>
                            </div>
                            <div className="col">
                                <p><strong>Customer Information</strong></p>
                                
                                <div className="form-group">
                                    <label><strong>Full of name</strong></label>
                                    <br />
                                    <span>{invoice&&invoice.customer.name}</span>
                                </div>
                                <div className="form-group">
                                    <label><strong>Phone</strong></label>
                                    <br />
                                    <span>{invoice&&invoice.customer.phone}</span>
                                </div>
                                <div className="form-group">
                                    <label><strong>Address</strong></label>
                                    <br />
                                    <span>{invoice&&invoice.customer.address}</span>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <div className="text-center">
                                    <h3>Order Information</h3>
                                </div>
                                {invoice&&<ProductTab cart={invoice.orderDetail.products}>
                                    <table className="table table-sm table-bordered w-25 ml-auto m-3">
                                        <tbody>
                                            <tr>
                                                <th>Subtotal</th>
                                                <td>{Num2VND(invoice&&invoice.order.sub_total)}</td>
                                            </tr>
                                            <tr>
                                                <th>Tax rate</th>
                                                <td>{invoice&&invoice.order.taxrate} %</td>
                                            </tr>
                                            <tr>
                                                <th>Tax fee</th>
                                                <td>{Num2VND(invoice&&invoice.order.taxfee)}</td>
                                            </tr>
                                            <tr>
                                                <th>Cash</th>
                                                <td>{Num2VND(invoice&&invoice.order.cash)}</td>
                                            </tr>
                                            <tr>
                                                <th>Change</th>
                                                <td>{Num2VND(invoice&&invoice.order.change)}</td>
                                            </tr>
                                            <tr>
                                                <th>Total of quantity</th>
                                                <td>{invoice&&invoice.order.quantity}</td>
                                            </tr>
                                            <tr>
                                                <th>Total</th>
                                                <td>{Num2VND(invoice&&invoice.order.total)}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </ProductTab>}
                            </div>
                        </div>
                    </div>
                    
                    <div class="modal-footer">
                        <button onClick={downloadPDF} type="button" class="btn btn-primary">Download as PDF</button>
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        
        </div>
    );
}

export default InvoiceTab;