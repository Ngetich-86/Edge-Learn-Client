import { useDispatch } from "react-redux";
import { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginSuccess } from "../../features/users/userSlice";
import Navbar from "../../components/Navbar";
// import { login } from "../../features/login/loginAPI";
import { loginAPI } from "../../features/login/loginAPI";
// Define the form data type
type FormData = {
  email: string,
  password: string
};

// Define the validation schema using yup
const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login] = loginAPI.useLoginUserMutation();
  const [isLoggingIn, setIsLoggingIn] = useState(false); // login loader state

  const {
      register,
      handleSubmit,
      formState: { errors },
  } = useForm<FormData>({ resolver: yupResolver(schema) });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
      console.log("Submitting data:", data);
      try {
          setIsLoggingIn(true); // Show logging in loader
          const response = await login(data).unwrap(); // Unwrap the promise to get the actual data

          if (response) {
              dispatch(loginSuccess(response));
              toast.success("Login successful");
              setTimeout(() => {
                  navigate('/dashboard_page/profile');
              }, 1000);
          } else {
              toast.error("Invalid credentials");
          }
      } catch (err) {
          toast.error("Invalid credentials");
          console.error("API error:", err); // error
      } finally {
          setIsLoggingIn(false); // Hide loader
      }
  };

  return (
    <>
      <ToastContainer />
      <Navbar />
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* {error && <p className="text-red-500">{error}</p>} */}
        <div className="hero bg-base-200 min-h-screen">
          <div className="hero-content flex-col lg">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl font-bold">Login Now!</h1>
              <p className="py-6">Login to access all the features for free</p>
            </div>
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
              <div className="card-body">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                                type="email"
                                placeholder="Email"
                                className="input input-bordered"
                                {...register("email")}
                            />
                            <p className="text-red-500">{errors.email?.message}</p>
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
                </div>
                <p>
                  Don't have an account? <Link to="/register">Sign Up</Link>
                </p>
                <div className="form-control mt-6">
                  <button type="submit" className="btn btn-primary bg-success"
                   disabled={isLoggingIn}
                   >
                    {isLoggingIn ? 'Logging in...' : 'Login Now'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default Login;
