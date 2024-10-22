import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate, Link } from 'react-router-dom';
// import Navbar from '../../components/Navbar';
import { toast, ToastContainer } from 'react-toastify';
import { userAPI } from "../../features/users/userAPI";
import Navbar from "../../components/Navbar";

// Validation schema using yup
const schema = yup.object().shape({
  first_name: yup.string().required("First name is required"),
  last_name: yup.string().required("Last name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone_number: yup.string().required("Phone number is required"),
  password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords must match")
      .required("Confirm password is required"),
  track: yup.array().of(yup.string()).min(1, "Select at least one track"),
});


const Register = () => {
  const navigate = useNavigate();
    const [createUser] = userAPI.useCreateUserMutation();
    const [isLoading, setIsLoading] = useState(false); // Loader state
    
    const {
      register,
      handleSubmit,
      formState: { errors },
      watch,
      setValue,
    } = useForm({ resolver: yupResolver(schema) });
  
    const onSubmit = async (data: any) => {
      setIsLoading(true); // Start the loader
      try {
        const response = await createUser({ ...data });
        console.log("Response data:", response); // success
  
        if (response.error) {
          if ("data" in response.error) {
            toast.error(
              (response.error.data as { msg: string }).msg ||
                "Registration failed"
            );
          } else {
            toast.error("Registration failed");
          }
        } else {
          toast.success("Registration successful");
          setTimeout(() => {
            navigate("/login");
          }, 1000);
        }
      } catch (err: any) {
        toast.error("An unexpected error occurred");
      } finally {
        setIsLoading(false); // Stop the loader
      }
}



  return (
    <>
    <Navbar />
      <ToastContainer />
      <form onSubmit={handleSubmit(onSubmit)} className="card-body gap-6" noValidate>
        {/* {error && <p className="text-red-500">{error}</p>} */}
        <div className="hero bg-base-200 min-h-screen">
          <div className="hero-content flex-col lg">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl font-bold">Register Now</h1>
              <p className="py-6">Sign up to access all the features for free</p>
            </div>
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
              <div className="card-body">
                <div className="form-control">
                  <input
                                    type="text"
                                    placeholder="First Name"
                                    className="input input-bordered"
                                    {...register("first_name")}
                                />
                                <p className="text-red-500">{errors.first_name?.message}</p>
                </div>
                <div className="form-control lg:mr-8 lg:min-w-[40%]">
                                <input
                                    type="text"
                                    placeholder="Last Name"
                                    className="input input-bordered"
                                    {...register("last_name")}
                                />
                                <p className="text-red-500">{errors.last_name?.message}</p>
                            </div>
                            <div className="form-control lg:min-w-[40%]">
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className="input input-bordered"
                                    {...register("email")}
                                />
                                <p className="text-red-500">{errors.email?.message}</p>
                            </div>
                            <div className="form-control lg:mr-8 lg:min-w-[40%]">
                                <input
                                    type="text"
                                    placeholder="Phone Number"
                                    className="input input-bordered"
                                    {...register("phone_number")}
                                />
                                <p className="text-red-500">{errors.phone_number?.message}</p>
                            </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                                type="password"
                                placeholder="Password"
                                className="input input-bordered"
                                {...register("password")}
                            />
                            <p className="text-red-500">{errors.password?.message}</p>
                            <div className="form-control">
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                className="input input-bordered"
                                {...register("confirmPassword")}
                            />
                            <p className="text-red-500">{errors.confirmPassword?.message}</p>
                        </div>
                  <label className="label">
                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                  </label>
                </div>
                <p>Already have an account? <Link to="/login">Login Now</Link></p>
                <div className="form-control mt-6">
                  <button type="submit" className="btn btn-primary bg-success">Sign Up</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default Register;

//==========================================================================
// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import { useNavigate, Link } from 'react-router-dom';
// import { toast, ToastContainer } from 'react-toastify';
// import { userAPI } from "../../features/users/userAPI"; 
// import Navbar from "../../components/Navbar";

// const schema = yup.object().shape({
//   first_name: yup.string().required("First name is required"),
//   last_name: yup.string().required("Last name is required"),
//   email: yup.string().email("Invalid email").required("Email is required"),
//   phone_number: yup.string().required("Phone number is required"),
//   course: yup.string().required("Course is required"),
//   other_course: yup.string(), // Make other_course optional
//   year_of_study: yup.string().required("Year of Study is required"),
//   password: yup
//       .string()
//       .min(6, "Password must be at least 6 characters")
//       .required("Password is required"),
//   confirmPassword: yup
//       .string()
//       .oneOf([yup.ref("password")], "Passwords must match")
//       .required("Confirm password is required"),
//   track: yup.array().of(yup.string()).min(1, "Select at least one track"),
// });

// const Register = () => {
//   const navigate = useNavigate();
//   const [createUser] = userAPI.useCreateUserMutation();
//   const [isLoading, setIsLoading] = useState(false); // Loader state
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     watch,
//     setValue,
//   } = useForm({ resolver: yupResolver(schema) });

//   const onSubmit = async (data: any) => {
//     setIsLoading(true); // Start the loader
//     try {
//       const response = await createUser({ ...data });
//       console.log("Response data:", response); // success

//       if (response.error) {
//         if ("data" in response.error) {
//           toast.error(
//             (response.error.data as { msg: string }).msg ||
//               "Registration failed"
//           );
//         } else {
//           toast.error("Registration failed");
//         }
//       } else {
//         toast.success("Registration successful");
//         setTimeout(() => {
//           navigate("/login");
//         }, 1000);
//       }
//     } catch (err: any) {
//       toast.error("An unexpected error occurred");
//     } finally {
//       setIsLoading(false); // Stop the loader
//     }
//   };

//   return (
//     <>
//     <ToastContainer />
//     <Navbar />
//       <form onSubmit={handleSubmit(onSubmit)} className="card-body gap-6" noValidate>
//         <div className="hero bg-base-200 min-h-screen">
//           <div className="hero-content flex-col lg">
//             <div className="text-center lg:text-left">
//               <h1 className="text-5xl font-bold">Register Now</h1>
//               {/* <p className="py-6">Sign up to access all the features for free</p> */}
//             </div>
//             <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
//               <div className="card-body">
//                 <div className="form-control">
//                   <label className="label">
//                     <span className="label-text">First Name</span>
//                   </label>
//                   <input
//                     type="text"
//                     placeholder="First Name"
//                     className="input input-bordered"
//                     {...register("first_name")}
//                   />
//                 </div>
//                 <div className="form-control lg:mr-8 lg:min-w-[40%]">
//                   <input
//                     type="text"
//                     placeholder="Last Name"
//                     className="input input-bordered"
//                     {...register("last_name")}
//                   />
//                 </div>
//                 <div className="form-control lg:min-w-[40%]">
//                   <input
//                     type="email"
//                     placeholder="Email"
//                     className="input input-bordered"
//                     {...register("email")}
//                   />
//                 </div>
//                 <div className="form-control lg:mr-8 lg:min-w-[40%]">
//                   <input
//                     type="text"
//                     placeholder="Phone Number"
//                     className="input input-bordered"
//                     {...register("phone_number")}
//                   />
//                 </div>

//                 <div className="form-control">
//                   <label className="label">
//                     <span className="label-text">Password</span>
//                   </label>
//                   <input
//                     type="password"
//                     placeholder="Password"
//                     className="input input-bordered"
//                     {...register("password")}
//                   />
//                 </div>
//                 <p>
//                   Already have an account?{" "}
//                   <Link to="/login">Login Now</Link>
//                 </p>
//                 <div className="form-control mt-6">
//                   <button type="submit" className="btn btn-primary bg-success">
//                     Sign Up
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </form>
//     </>
//   );
// };

// export default Register;
