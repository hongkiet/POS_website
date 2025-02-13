import Num2VND from '../../../components/Num2VND';
function ProductItem({product, AddToCart}) {

    const handleAddToCart = (product) => {
        const storedCart = localStorage.getItem('cart');
        const cart = storedCart ? JSON.parse(storedCart) : [];

        if(cart.length === 0) {
            cart.push({
                ...product,
                amount: 1,
            });
            localStorage.setItem('cart', JSON.stringify(cart));
        }else{
            // insert a new product into cart if it dupplicates add amount to 1
            let flag = false;
            for(let i = 0; i < cart.length; i++){
                if(cart[i].barcode === product.barcode){
                    cart[i].amount += 1;
                    flag = true;
                    break;
                }
            }

            if(!flag){
                cart.push({
                    ...product,
                    amount: 1,
                });
            }

            localStorage.setItem('cart', JSON.stringify(cart));
            
        }

        AddToCart();
    }

    let name;
    if (product.name.length > 32) {
        name = product.name.slice(0, 32) + '...';
    } else {
        name = product.name;
    }
    return ( 
        <div className="col-sm-12 col-md-6 col-lg-3 p-2">
            <div className="card border-rounded">
                <div className="card-body product__item">
                    <div className="text-right mb-2">
                        <a title='Click here to view more detail' className="btn btn-sm btn-primary" target='_blank' href={'/products/'+product.barcode}>
                            <i className="fa-solid fa-circle-info"></i>
                        </a>
                    </div>
                    <div className="text-center">
                        <img src={product.image} alt="Image" width={'100'} height={'100'} />
                    </div>
                    <div className="card__title mt-2">
                        <h5 title={product.name}>{name}</h5>
                    </div>
                    <div className="text-center text-danger">
                        <span>{Num2VND(product.retail_price)}</span>
                    </div>
                </div>
                <div className="card-footer text-center">
                    <button className="btn btn-success"
                     onClick={() => handleAddToCart(product)}
                    >Add to cart
                        <i className="fa-solid fa-cart-plus ml-1"></i>
                    </button>
                </div>
            </div>                
        </div>
    );
}

export default ProductItem;