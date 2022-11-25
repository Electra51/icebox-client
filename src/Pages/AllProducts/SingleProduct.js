import React from 'react';

const SingleProduct = ({ oneProduct }) => {
    const { item_img, item_name, location, original_price, resale_price, seller_name, year_of_use } = oneProduct;
    
    return (
        <div>
           <div className="card w-96 bg-base-100 shadow-xl">
  <figure className="px-10 pt-10">
    <img src={item_img} alt="Shoes" className="rounded-xl" />
  </figure>
  <div className="card-body items-center text-center">
    <h2 className="card-title">{ item_name}</h2>
                    <p className=''>original_price: {original_price}</p>
                    <p className=''>resale_price: {resale_price}</p>
                    <p className=''>seller_name: {seller_name}</p>
                    <p className=''>location: {location}</p>
                    <p className=''>year_of_use: {year_of_use}</p>
    <div className="card-actions">
      <button className="btn btn-primary">Book Now</button>
    </div>
  </div>
</div> 
        </div>
    );
};

export default SingleProduct;