import { useEffect, useState } from "react";
import { deleteVendor, listVendors } from "../../services/VendorService";
import { useNavigate } from "react-router-dom";

const ListVendorComponents = () => {
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

  const [vendors, setVendors] = useState([]);
  const navigator = useNavigate();

  useEffect(() => {
    getAllVendors();
  }, []);

  function getAllVendors() {
    listVendors()
      .then((response) => {
        setVendors(response.data);
      })
      .catch((error) => {
        console.error("Error while fetching vendors: " + error);
      });
  }

  function addNewVendor() {
    navigator("/add-vendor");
  }

  function updateVendor(id: any) {
    navigator(`/edit-vendor/${id}`);
  }

  function removeVendor(id: any) {
    console.log(id);
    deleteVendor(id)
      .then((response) => {
        getAllVendors();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div className="container">
      <h2 style={{ color: "yellowgreen" }}>List of vendors</h2>
      <br />
      <button className="btn btn-primary mb-2" onClick={addNewVendor}>
        {" "}
        Add vendor
      </button>

      <table className="table table-striped table-hover table-bordered table-success">
        <thead>
          <tr>
            <th>Vendor Id</th>
            <th>Vendor First Name</th>
            <th>Vendor Last Name</th>
            <th>Vendor Email Id</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            // dummyData.map(vendor =>             // Use for run the dummy data to check
            vendors.map((vendor) => (
              <tr key={vendor.id}>
                <td>{vendor.id}</td>
                <td>{vendor.firstName}</td>
                <td>{vendor.lastName}</td>
                <td>{vendor.email}</td>
                <td>
                  <button
                    className="btn btn-info"
                    onClick={() => updateVendor(vendor.id)}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => removeVendor(vendor.id)}
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

export default ListVendorComponents;
