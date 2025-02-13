import React, { useEffect } from 'react';
import $ from 'jquery'; // Import jQuery

function ToastAlert({ type, message }) {
    const currentTime = new Date().getTime();
    const stringTime = new Date(currentTime).toLocaleTimeString();
    const getType = type.toLowerCase().trim();

    useEffect(() => {
        // Use jQuery to select the toast element and trigger the Bootstrap toast
        $('.toast').toast('show');
    }, []);

    return (
        <div className="toast-custome">
            <div className="toast" data-autohide="false">
                <div className="toast-header">
                    <strong className={`mr-auto ${getType === "error" ? "text-danger" : "text-primary"}`}>{type}</strong>
                    <small className="text-muted">{stringTime}</small>
                    <button type="button" className="ml-2 mb-1 close" data-dismiss="toast">&times;</button>
                </div>
                <div className="toast-body">
                    {message}
                </div>
            </div>
        </div>
    );
}

export default ToastAlert;
