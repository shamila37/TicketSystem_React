import { useEffect, useState } from "react";
import { deleteCustomer, listCustomers } from "../../services/CustomerService";
import { useNavigate } from "react-router-dom";

const ListCustomerComponents = () => {
  // const dummyData = [
  //     {
  //         "id": 1,
  //         "firstname": "Shamila",
  //         "lastname": "Gunarathna",
  //         "email": "shamila@gmail.com"
  //     },
  //     {
  //         "id": 2,
  //         "firstname": "Shamila1",
  //         "lastname": "Gunarathna1",
  //         "email": "shamila1@gmail.com"
  //     },
  //     {
  //         "id": 3,
  //         "firstname": "Shamila2",
  //         "lastname": "Gunarathna2",
  //         "email": "shamila2@gmail.com"
  //     }
  // ]

  const [customers, setCustomers] = useState([]);
  const navigator = useNavigate();

  useEffect(() => {
    getAllCustomers();
  }, []);

  function getAllCustomers() {
    listCustomers()
      .then((response) => {
        setCustomers(response.data);
      })
      .catch((error) => {
        console.error("Error while fetching customers: " + error);
      });
  }

  function addNewCustomer() {
    navigator("/add-customer");
  }

  function updateCustomer(id: any) {
    navigator(`/edit-customer/${id}`);
  }

  function removeCustomer(id: any) {
    console.log(id);
    deleteCustomer(id)
      .then((response) => {
        getAllCustomers();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div className="container">
      <h2 style={{ color: "yellowgreen" }}>List of customers</h2>
      <br />
      <button className="btn btn-primary mb-2" onClick={addNewCustomer}>
        {" "}
        Add customer
      </button>

      <table className="table table-striped table-success">
        <thead>
          <tr>
            <th>Customer Id</th>
            <th>Customer First Name</th>
            <th>Customer Last Name</th>
            <th>Customer Email Id</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            // dummyData.map(customer =>             // For run dummy data
            customers.map((customer) => (
              <tr key={customer.id}>
                <td>{customer.id}</td>
                <td>{customer.firstName}</td>
                <td>{customer.lastName}</td>
                <td>{customer.email}</td>
                <td>
                  <button
                    className="btn btn-info"
                    onClick={() => updateCustomer(customer.id)}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => removeCustomer(customer.id)}
                    style={{ marginLeft: "10px" }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
};

export default ListCustomerComponents;
