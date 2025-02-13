import axios from "axios";
import { useEffect, useState, useRef, Fragment } from "react";
import $ from 'jquery';
import LoadingImg from '../../../components/Layout/components/LoadingImg';
function Profile() {
  	const token = window.localStorage.getItem("token");
	const [user, setUser] = useState({});
	const [name, setName] = useState(null);
	const [image, setImage] = useState(null);
	const [url, setUrl] = useState(null);
	const [update, setUpdated] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
  // Fetch user for first time
  useEffect(() => {
    handleFetchUser();
  }, [image]);

  const handleFetchUser = async () => {
	axios
      .get("/api/account/", { headers: { Authorization: token } })
      .then((response) => {
        const res = response.data;
        setUser(res.data);
		setName(res.data.name);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handleChangeImg = async (file) => {
	setImage(file);
	setUrl(URL.createObjectURL(file));
	setUpdated(true);
  }

  const handleChangeName = async (name) =>{
	setName(name);
	setUpdated(true);
  }

  const handleCancelUpdate = () => {
	setName(user.name);
	setUpdated(false);
	setUrl(null);
  }

	const handleUpdate = () => {
		setLoading(true);
		setError(null);

		const formData = new FormData();
		formData.append("name", name);
		formData.append("file", image);
		formData.append("username", user.username);

		for (const [key, value] of formData.entries()) {
			console.log(`${key}: ${value}`);
		}

		axios.patch("/api/account/", formData, {
			headers: {
				Authorization: token,
			}
		})
			.then((response) => {
				const res = response.data;
				if(res.code === 0){
					$('#profileModal').modal();
					localStorage.removeItem('token');
					setUpdated(false);
				}else{
					setError(res.message);
				}
				setLoading(false);
				setUpdated(false);
			})
			.catch((error) => {
				setLoading(false);
				setUpdated(false);
				setError(error.message);
			});
	}
  	return (
		<Fragment>
			<div className="card">
				<div className="card-header bg-main text-main">
					<h4>Profile Information</h4>
				</div>
				<div className="card-body">
					<div className="mt-2">
					<div className="row p-5 ">
						<div className="col-md-4 d-flex flex-column rounded justify-content-center border border-primary p-5">
						<div className="text-center mb-4 ">
							<img
							src={url? url : user.image}
							alt="Avatar"
							className="img-fluid rounded-circle "
							width="150"
							height="150"
							/>
						</div>
						{/* Input for updating avatar */}
						<div class="file-input-container mx-auto btn btn-sm">
							<input
								name="file"
								type="file"
								accept="image/*"
								class="file-input btn"
								onChange={(e) => handleChangeImg(e.target.files[0])}
								
							/>
							<label for="file" class="file-button">Update avatar <i className="fa-solid fa-pen-to-square"></i></label>
						</div>
						</div>
						<div className="col-md-8 px-5">
						<div className="d-flex align-items-center mb-4">
							<input
								value={name? name : user.name}
								onChange={(e) => handleChangeName(e.target.value)}
								className="mb-0 p-1 pr-3 input-cus-name"
							/>
						</div>
						<h5>
							<span className="p-2 mr-2 badge badge-secondary">Username</span>
							<span className="p-2 badge badge-info">{user.username}</span>
						</h5>
						<h5>
							<span className="p-2 mr-2 badge badge-secondary">Email</span>
							<span className="p-2 badge badge-info">{user.email}</span>
						</h5>
						<h5>
							<span className="p-2 mr-2 badge badge-secondary">Role</span>
							<span className="p-2 badge badge-info">{user.role}</span>
						</h5>
						<h5>
							<span className="p-2 mr-2 badge badge-secondary">Status</span>
							<span className="p-2 badge badge-info">{user.status}</span>
						</h5>
						</div>
					</div>
					</div>
				</div>
				{/* Check update state */}
				{update && (
					<div className="card-footer">
						<div className="row">
							<Fragment>
							<div className="col">
								{/* Empty column to push buttons to the right */}
							</div>
							<div className="col-auto">
								<button
									type="button"
									className="btn btn-warning mr-2 my-1"
									onClick={handleUpdate}
									disabled={loading}
								>

									<span>Update</span>
								</button>
								<button
									type="button"
									className="btn btn-primary my-1"
									onClick={handleCancelUpdate}
									disabled={loading}
								>
								<i className="fa-solid fa-ban mr-1"></i>Cancel
								</button>
							</div>
							</Fragment>
						</div>
					</div>
				)}
				{loading && (
					<div className="text-center">
						<LoadingImg />
					</div>
				)}
				{error && (
					<div className="alert alert-danger text-center">
						{error}
					</div>
				)}
			</div>
			{/* <!-- The Modal --> */}
			<div class="modal" id="profileModal">
				<div class="modal-dialog">
					<div class="modal-content">

					<div class="modal-header bg-main text-main">
						<h4 class="modal-title">Profile Notification</h4>
						<button type="button" class="close" data-dismiss="modal">&times;</button>
					</div>

					<div class="modal-body">
						Your account has been updated successfully! <br />
						<strong>Please login again to see the changes.</strong>
					</div>

					<div class="modal-footer">
						<a href='/logout' class="btn btn-danger">Logout</a>
					</div>

					</div>
				</div>
			</div>

		</Fragment>
  );
}

export default Profile;
