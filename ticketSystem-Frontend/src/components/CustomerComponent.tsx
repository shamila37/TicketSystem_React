import { useEffect, useState } from "react";
import { createCustomer, getCustomer, updateCustomer } from "../services/CustomerService";
import { useNavigate, useParams } from "react-router-dom";

const CustomerComponent = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState('');

  const {id} = useParams();

  const navigator = useNavigate();

  useEffect(() => {

    if(id){
      getCustomer(id).then((response) => {
        setFirstName(response.data.firstName);
        setLastName(response.data.lastName);
        setEmail(response.data.email);
      }).catch(error => {
        console.error(error);
      });
    }

  }, [id]);

  //   function handleFirstName(e: { target: { value: SetStateAction<string> } }) {
  //     setFirstName(e.target.value);
  //   }

  //   function handleLastName(e: { target: { value: SetStateAction<string> } }) {
  //     setLastName(e.target.value);
  //   }

  //   function handleEmail(e: { target: { value: SetStateAction<string> } }) {
  //     setEmail(e.target.value);
  //   }

  function saveOrUpdateCustomer(e: { preventDefault: () => void }) {
    e.preventDefault();

    setErrorMessage('');

    const customer = { firstName, lastName, email };
    console.log(customer);

    if (!firstName || !lastName || !email) {
      setErrorMessage('All fields are required!');
      return;
    }

    if(id){
      updateCustomer(id, customer).then((response) => {
        console.log(response.data);
        navigator('/customers')
      }).catch(error => {
        console.error(error);
      })
    } else {
      createCustomer(customer).then((response) => {
        console.log(response.data);
        navigator('/customers');
      }).catch(error => {
        console.error(error);
      })
    }

  }

  function pageTitle(){
    if(id){
      return <h2 className="text-center">Update Customer</h2>
    }else{
      return <h2 className="text-center">Add Customer</h2>
    }
  }

  return (
    <div className="container">
      <br />
      <div className="row">
        <div className="card col-md-6 offset-md-3 offset-md-3">
          {
            pageTitle()
          }
          <div className="card-body">
            <form onSubmit={saveOrUpdateCustomer}>
              <div className="form-group mb-2">
                <label className="form-lable">First Name:</label>
                <input
                  type="text"
                  placeholder="Enter customer first name"
                  name="firstName"
                  value={firstName}
                  className="form-control"
                  //   onChange={handleFirstName}
                  onChange={(e) => setFirstName(e.target.value)}
                ></input>
              </div>

              <div className="form-group mb-2">
                <label className="form-lable">Last Name:</label>
                <input
                  type="text"
                  placeholder="Enter customer last name"
                  name="lastName"
                  value={lastName}
                  className="form-control"
                  //   onChange={handleLastName}
                  onChange={(e) => setLastName(e.target.value)}
                ></input>
              </div>

              <div className="form-group mb-2">
                <label className="form-lable">Email:</label>
                <input
                  type="text"
                  placeholder="Enter customer email"
                  name="email"
                  value={email}
                  className="form-control"
                  //   onChange={handleEmail}
                  onChange={(e) => setEmail(e.target.value)}
                ></input>
              </div>
              <br />

              <button className="btn btn-success">
                Submit
              </button>
            </form>

            {/* Visible the error message */}
            {errorMessage && (
              <div style={{ color: 'red', marginTop: '10px' }}>
                {errorMessage}
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerComponent;
