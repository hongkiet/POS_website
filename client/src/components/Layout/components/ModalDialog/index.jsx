function ModalDialog({onValueChange, title, children, button_title}) {
  
	const closeModal = () => onValueChange(false);

    return ( 
        <div className="modal d-flex align-items-center" style={{ display: 'block'}}>
          <div className="modal-dialog shadow-lg p-3 mb-5 bg-white rounded">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">{title}</h4>
                <button type="button" className="close" onClick={closeModal}>
                  &times;
                </button>
              </div>
              <div className="modal-body">
                {children}
              </div>
              <div className="modal-footer">
				<a type="button" className="btn btn-danger" href='/logout'>
                    {button_title}
                </a>
              </div>
            </div>
          </div>
        </div>
    );
}

export default ModalDialog;