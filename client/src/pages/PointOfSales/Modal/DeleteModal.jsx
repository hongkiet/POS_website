function DeleteModal() {
    return ( 
        <div class="modal fade" id="deleteModal">
            <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
            
                <div class="modal-header">
                    <h4 class="modal-title">Delete Confirmation</h4>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                
                <div class="modal-body">
                    Do you want to remove <strong id="rm__name-product">product.name</strong> from the cart?
                </div>
                
                <div class="modal-footer">
                    <button id="btn-rm__cartItem" type="button" class="btn btn-danger" data-dismiss="modal">Yes</button>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                </div>
                
            </div>
            </div>
        </div>
    );
}

export default DeleteModal;