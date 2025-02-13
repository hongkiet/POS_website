import { useState, useEffect } from "react";
import axios from "axios";
import LoadingImg from "../../../components/Layout/components/LoadingImg";
function AddNew() {
    const [barcode, setBarcode] = useState("");
    const [quantity, setQuantity] = useState("");
    const [name, setName] = useState("");
    const [import_price, setImportPrice] = useState("");
    const [retail_price, setRetailPrice] = useState("");
    const [category, setCategory] = useState("");
    const [creation_date, setCreationDate] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);


    const handleSubmit = async (e) =>{
        e.preventDefault();
        const formData = new FormData();
        formData.append("barcode", barcode);
        formData.append("quantity", quantity);
        formData.append("name", name);
        formData.append("import_price", import_price);
        formData.append("retail_price", retail_price);
        formData.append("category", category);
        formData.append("creation_date", creation_date);
        formData.append("description", description);
        formData.append("image", image);
        postToServer(formData);


    }
    

    const postToServer = async (product) => {
        setLoading(true);
        setError(null);
        try {
          const response = await axios.post("/api/products/add", product, {
            headers: {
              'Authorization': localStorage.getItem('token')
            }
          });
          const res = response.data;
          if(res.code === 0){
            const id = res.data.barcode;
            window.location.href = `/products/${id}`;
          }else{
            setError(res.message);
          }
          setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    }



    useEffect(() => {
        if(image){
            const previewImg = URL.createObjectURL(image);
            document.querySelector("#image-preview").setAttribute("src", previewImg);
        }
    }, [image]);
    return ( 
        <div className="card">
            <div className="card-header text-center text-uppercase">
                <h3>Add a new Product</h3>
            </div>
            <div className="card-body">
                <form>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>
                                    <span className="badge badge-dark">Barcode</span>
                                </label>
                                <input
                                    onChange={(e) => setBarcode(e.target.value)}
                                    value={barcode}
                                    type="text"
                                    className="form-control"
                                    id="barcode"
                                    placeholder="Enter the barcode"
                                />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>
                                    <span className="badge badge-primary">Quantity</span>
                                </label>
                                <input
                                    onChange={(e) => setQuantity(e.target.value)}
                                    value={quantity}
                                    type="number"
                                    className="form-control"
                                    id="quantity"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label>
                            <span className="badge badge-success">Name</span>
                        </label>
                        <input
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            type="text"
                            className="form-control"
                            id="name"
                            placeholder="Enter the name"
                        />
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>
                                    <span className="badge badge-secondary">Import price</span>
                                </label>
                                <input
                                    onChange={(e) => setImportPrice(e.target.value)}
                                    value={import_price}
                                    type="number"
                                    className="form-control"
                                    id="import-price"
                                    placeholder="Enter the import price"
                                />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>
                                    <span className="badge badge-warning">Retail price</span>
                                </label>
                                <input
                                    onChange={(e) => setRetailPrice(e.target.value)}
                                    value={retail_price}
                                    type="number"
                                    className="form-control"
                                    id="retail-price"
                                    placeholder="Enter the retail price"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>
                                    <span className="badge badge-secondary">Category</span>
                                </label>
                                <input
                                    onChange={(e) => setCategory(e.target.value)}
                                    value={category}
                                    type="text"
                                    className="form-control"
                                    id="category"
                                    placeholder="Enter the category"
                                />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>
                                    <span className="badge badge-secondary">Creation Date</span>
                                </label>
                                <input
                                    onChange={(e) => setCreationDate(e.target.value)}
                                    value={creation_date}
                                    type="date"
                                    className="form-control"
                                    id="creation-date"
                                />
                            </div>
                        </div>
                    </div> 
                    <div className="form-group">
                        <label>
                            <span className="badge badge-info">Description</span>
                        </label>
                        <textarea
                            onChange={(e) => setDescription(e.target.value)}
                            value={description}
                            className="form-control"
                            id="description"
                            rows="3"
                            placeholder="Type the description"
                        ></textarea>
                    </div>
                    <div className="form-group">
                       <div className="row">
                        <div className="col">
                            <label>
                                <span className="badge badge-danger">Image</span>
                            </label>
                            <input
                                onChange={(e) => setImage(e.target.files[0])}
                                type="file"
                                className="form-control-file"
                                id="image"
                                name="image"
                            />
                        </div>
                        <div className="col">
                            <img
                                id="image-preview"
                                src="https://via.placeholder.com/150"
                                alt="preview"
                                className="img-fluid"   
                                height={350}
                                width={350}
                            />
                        </div>
                       </div>
                    </div>
                    <button onClick={e => handleSubmit(e)} type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
            {(error || loading) && <div className="card-footer">
                {loading && (
                    <div className="text-center">
                        <LoadingImg />
                    </div>
                )}
                {error &&(
                    <div class="alert alert-success">
                        <strong>Error!</strong> {error}
                    </div>
                )}                
            </div>}
        </div>
    );
}

export default AddNew;