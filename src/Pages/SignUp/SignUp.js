import React, { useState } from 'react';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';

const Signup = () => {
    const [signUpError, setSignUPError] = useState('');
    const { createUser,signInWithGoogle,updateUser} = useContext(AuthContext)
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || '/'
    
    const { register, handleSubmit, formState: { errors } } = useForm();
    
    const handleSignUp = (data) => {
        console.log(data);
        //notun kore sign up korle signup error empty
        setSignUPError('');
        createUser(data.email, data.password)
        .then(result => {
            const user = result.user;
            console.log(user);
            toast.success('User created successfully')
            const userInfo = {
                displayName:data.name
            }
            updateUser(userInfo)
                .then(() => { })
            .catch(err=>console.log(err))
            navigate(from, { replace: true })
        })
        .catch(error => {
            console.log(error)
            setSignUPError(error.message)
        });
    }

   


    const handleGoogleSignIn = () => {
        signInWithGoogle().then(result => {
          console.log(result.user)
          navigate(from, { replace: true })
        })
      }

    return (
        <div className='h-[600px] flex justify-center items-center'>
            <div className='w-96 p-5 border border-warning rounded-md'>
                <h1 className='text-3xl font-bold text-center'>Sign Up</h1>
                <form onSubmit={handleSubmit((handleSignUp))}>
                    <label className='text-center'> 
                    <p className='text-center mt-2'> What type of account?</p>        
    <div>
                            <input className='mx-1' type="radio" value="Seller" {...register("User", { required: 'please select one'})} />
      Seller
    </div>
                </label>
                <label className='text-center'>
    <div>
      <input className='mx-1' type="radio" value="Normal" {...register("User",{ required: 'please select one'})}  />
     Normal
    </div>
                    </label>
                    {errors.User && <p className='text-red-600 text-left' role="alert">{errors.User?.message}</p>} 
                <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="name" {...register("name",{ required: "Name is required" })}
                            className="input input-bordered border-warning" />
                        {errors.name && <p className='text-red-600 text-left' role="alert">{errors.name?.message}</p>}
                    </div >
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" {...register("email", { required: "Email Address is required" })} className="input input-bordered border-warning" />
                        {errors.email && <p className='text-red-600 text-left' role="alert">{errors.email?.message}</p>}
                    </div >
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" {...register(
                            "password",
                            {
                                required: "Password is required",
                                minLength: { value: 6, message: 'password must be 6 characters long' },
                                pattern: {value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d$@$!%*#?&]{6,}$/, message:'password must be strong'}
                            },
                        )}
                            className="input input-bordered border-warning" />
                        {errors.password && <p className='text-red-600 text-left' role="alert">{errors.password?.message}</p>}
                        {signUpError && <p className='text-red-600'>{signUpError}</p>}
                    </div>
                    <input className='btn btn-warning w-full mt-5' type="submit" value='Sign Up' />
                   
                    <p className='text-center'>Already have an account?  <Link to='/login' className='text-primary font-semibold underline'>please Login</Link> </p>
                    <div className="divider">OR</div>
                    <button onClick={handleGoogleSignIn} className='btn btn-outline btn-primary w-full text-black '>Continue with Google</button>
                </form>
            </div>
        </div>
    );
};

export default Signup;