import $ from "jquery";
import axios from "axios";
function DeleteModal({ refreshUsers }) {
  const handleDeleteUser = () => {
    const userId = document.getElementById("id-delete").textContent;
    axios.delete(`/api/users/${userId}`,{
		headers: {
			Authorization: localStorage.getItem("token"),
		},
    })
      .then((response) => {
			const res = response.data;
			if(res.code === 0){
				$("#deleteModal").modal("hide");
				refreshUsers();
			}else{
				console.log(res.message);
			}
      })
      .catch((error) => {
        	console.error("Error deleting user", error);
      });
  };
  return (
    <div class="modal fade" id="deleteModal">
      <div class="modal-dialog">
        <div class="modal-content">
			<div class="modal-header">
				<h4 class="modal-title">Delete Confirmation</h4>
				<button type="button" class="close" data-dismiss="modal">
				&times;
				</button>
			</div>

			<div class="modal-body" id="modal-body-userlist">
					Are you sure that do you want to delete the user:{" "}
					<strong id="username-delete"></strong> ( ID:{" "}
					<strong id="id-delete"></strong> )
			</div>

			<div class="modal-footer">
				<button
				type="button"
				class="btn btn-danger"
				onClick={handleDeleteUser}
				>
					Yes
				</button>
				<button
				type="button"
				class="btn btn-secondary"
				data-dismiss="modal"
				>
					Cancel
				</button>
			</div>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
