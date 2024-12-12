import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCustomer } from "../services/CustomerService";
import { createVendor } from "../services/VendorService";

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    userType: "customer",
  });

  const navigate = useNavigate();

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log("Form Data before submit:", formData);
    try {
      if (isSignUp) {
        if (formData.userType === "customer") {
          await createCustomer({
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            password: formData.password,
          });
          alert("Customer Sign-Up Successful!");
          localStorage.setItem("firstName", formData.firstName);
          localStorage.setItem("userType", "customer");
          navigate("/home");
        } else if (formData.userType === "vendor") {
          await createVendor({
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            password: formData.password,
          });
          alert("Vendor Sign-Up Successful!");
          localStorage.setItem("firstName", formData.firstName);
          localStorage.setItem("userType", "vendor");
          navigate("/viewEvents");
        }
        setIsSignUp(false);
      } else {
        const loginEndpoint =
          formData.userType === "customer"
            ? "http://localhost:8080/api/customers/login"
            : "http://localhost:8080/api/vendors/login";

        const loginResponse = await axios.post(loginEndpoint, {
          email: formData.email,
          password: formData.password,
        });

        console.log(`${formData.userType} Login Response:`, loginResponse.data);
        alert(`${formData.userType} Login Successful!`);
        localStorage.setItem("firstName", formData.firstName);
        localStorage.setItem("userType", formData.userType);
        navigate(
          formData.userType === "customer" ? "/home" : "/viewEvents"
        );
      }
    } catch (error: any) {
      console.error("Error:", error.response?.data || error.message);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div
          className="card col-md-6 offset-md-3"
          style={{ backgroundColor: "#79c269" }}
        >
          <h2>{isSignUp ? "Sign Up" : "Login"}</h2>
          <form onSubmit={handleSubmit}>
            {isSignUp && (
              <>
                <div className="mb-3">
                  <label className="form-label">First Name</label>
                  <input
                    type="text"
                    placeholder="Enter first name"
                    name="firstName"
                    className="form-control"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Last Name</label>
                  <input
                    type="text"
                    placeholder="Enter last name"
                    name="lastName"
                    className="form-control"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">User Type</label>
                  <select
                    name="userType"
                    className="form-select"
                    value={formData.userType}
                    onChange={handleChange}
                    required
                  >
                    <option value="customer">Customer</option>
                    <option value="vendor">Vendor</option>
                  </select>
                </div>
              </>
            )}
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                placeholder="Enter email"
                name="email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                placeholder="Enter password"
                name="password"
                className="form-control"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <button type="submit" className="btn btn-primary">
                {isSignUp ? "Sign Up" : "Login"}
              </button>
              <p className="mb-0">
                {isSignUp
                  ? "Already have an account?"
                  : "Don't have an account?"} {" "}
                <button
                  type="button"
                  className="btn btn-link p-0"
                  onClick={() => setIsSignUp(!isSignUp)}
                >
                  {isSignUp ? "Login here" : "Sign Up here"}
                </button>
              </p>
            </div>
            <br />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;