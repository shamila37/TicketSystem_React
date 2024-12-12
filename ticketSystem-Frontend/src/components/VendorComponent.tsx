import { useEffect, useState } from "react";
import { createVendor, getVendor, updateVendor } from "../services/VendorService";
import { useNavigate, useParams } from "react-router-dom";

const VendorComponent = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState('');

  const {id} = useParams();

  const navigator = useNavigate();

  useEffect(() => {

    if(id){
      getVendor(id).then((response) => {
        setFirstName(response.data.firstName);
        setLastName(response.data.lastName);
        setEmail(response.data.email);
      }).catch(error => {
        console.error(error);
      });
    }

  }, [id]);

  function saveOrUpdateVendor(e: { preventDefault: () => void }) {
    e.preventDefault();

    setErrorMessage('');

    const vendor = { firstName, lastName, email };
    console.log(vendor);

    if (!firstName || !lastName || !email) {
      setErrorMessage('All fields are required!');
      return;
    }

    if(id){
      updateVendor(id, vendor).then((response) => {
        console.log(response.data);
        navigator('/vendors')
      }).catch(error => {
        console.error(error);
      })
    } else {
      createVendor(vendor).then((response) => {
        console.log(response.data);
        navigator('/vendors');
      }).catch(error => {
        console.error(error);
      })
    }

  }

  function pageTitle(){
    if(id){
      return <h2 className="text-center">Update Vendor</h2>
    }else{
      return <h2 className="text-center">Add Vendor</h2>
    }
  }

  return (
    <div className="container">
      <br />
      <div className="row">
        <div className="card col-md-6 offset-md-3 offset-md-3" style={{backgroundColor: "#79c269"}}>
          <br />
          {
            pageTitle()
          }
          <div className="card-body">
            <form onSubmit={saveOrUpdateVendor}>
              <div className="form-group mb-2">
                <label className="form-lable">First Name:</label>
                <input
                  type="text"
                  placeholder="Enter vendor first name"
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
                  placeholder="Enter vendor last name"
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
                  placeholder="Enter vendor email"
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

export default VendorComponent