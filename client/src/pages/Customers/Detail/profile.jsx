function Profile({customer}) {
    return ( 
        <div class="card py-5">
            <div class="card-body">
                <div className="row text-left">
                    <div className="col-sm-12 col-md-6">
                        <div className="">
                        <img class="card-img-top" style={{'width':'400'}} src={customer&&customer.image} alt="Card image"/>
                    </div>
                    </div>
                    <div className="col-sm-12 col-md-6">
                        <div className="form-group">
                            <label className="text-secondary"><strong>Full of name</strong></label>
                            <h4>{customer&&customer.name}</h4>
                        </div>
                        <div className="form-group">
                            <label className="text-secondary"><strong>Phone</strong></label>
                            <h4>{customer&&customer.phone}</h4>
                        </div>
                        <div className="form-group">
                            <label className="text-secondary"><strong>Address</strong></label>
                            <h4>{customer&&customer.address}</h4>
                        </div>
                        <div className="form-group">
                            <label className="text-secondary"><strong>Creation date</strong></label>
                            <h4>{customer&& new Date(customer.creation_date).toDateString()}</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;