import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../contexts/AuthProvider';

const BookingModal = ({ productModals,setProductModals }) => {
    const { item_name, item_img, seller_name, resale_price } = productModals;
    const { user } = useContext(AuthContext);


    const handleBooking = event => {
        event.preventDefault();
        const form = event.target;
        const location = form.location.value;
        const name = form.name.value;
        const email = form.email.value;
        const phone = form.phone.value;
        
        const booking = {
            itemName: item_name,
            seller_name:seller_name,
            Username: name,
            imageUrl: item_img,
            price:resale_price,
            email,
            phone,
            location
        }


        fetch('https://icebox-server.vercel.app/bookings', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(booking)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.acknowledged) {
                    setProductModals(null);
                toast.success('the item is booked')
                }
            })



        console.log(booking);
       
        
    }
    return (
        <>
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold">{item_name}</h3>
                    <p className="">Seller Name: {seller_name}</p>
                    <p className=' text-primary'>Price: {resale_price}</p>
                    <img src={item_img} alt="" width={100}/>
                    <form onSubmit={handleBooking} className='grid grid-cols-1 gap-3 mt-10'>
                    <input name="name" type="text" defaultValue={user?.displayName} disabled placeholder="Your Name" className="input w-full input-bordered" />
                        <input name="email" type="email" defaultValue={user?.email} disabled placeholder="Email Address" className="input w-full input-bordered" />
                        <input name="phone" type="text" placeholder="Phone Number" className="input w-full input-bordered" />
                        <input name="location" type="text" placeholder="Location" className="input w-full input-bordered" />
                        <br />
                        <input className='btn btn-warning w-full' type="submit" value="Submit" />
                   </form>
                </div>
            </div>
        </>
    );
};

export default BookingModal;