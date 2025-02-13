function ResetModal() {
    return ( 
        <div class="modal fade" id="resetModal">
            <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
            
                <div class="modal-header">
                    <h4 class="modal-title">Reset Confirmation</h4>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                
                <div class="modal-body">
                    Do you want to reset the cart?
                </div>
                
                <div class="modal-footer">
                    <button id="btn-rs__cart" type="button" class="btn btn-danger" data-dismiss="modal">Yes</button>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                </div>
                
            </div>
            </div>
        </div>
    );
}

export default ResetModal;