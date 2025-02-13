import { useState } from 'react';
import axios from 'axios'; 


function Search({searchProducts}) {
    const [terms, setTerms] = useState("");

    const handleSearchTerms = async () =>{
        axios.get(`/api/pos/search-products?terms=`+terms,
        {headers: { 'Authorization': localStorage.getItem('token')}}
        ).then(response => {
            const res = response.data;
            if(res.code === 0){
                searchProducts(res.data);
            }else{
                alert(res.message);
            }
        }).catch(error => {
            console.log(error.message);
        })
        
    }


    const handleEnter = async (e) =>{
        if(e.key === "Enter"){
            handleSearchTerms();
        }
    }
    return ( 
        <div className="input-group">
            <div className="form-outline w-100">
                <label className="form-label">Search or type barcode</label>
                <div className="d-flex w-100">
                    <input
                        type="search"
                        className="form-control w-100"
                        onChange={(e) => setTerms(e.target.value.trim())}
                        onKeyDown={(e) => handleEnter(e)}
                    />
                    <button type="button" className="btn btn-primary" onClick={handleSearchTerms}>
                        <i className="fas fa-search"></i>
                    </button>
                </div>
            </div>
        </div>
        
    );
}

export default Search;