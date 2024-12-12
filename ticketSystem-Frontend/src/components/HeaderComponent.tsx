import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// export default HeaderComponent;

const HeaderComponent = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    userType: "",
  });

  useEffect(() => {
    const firstName = localStorage.getItem("firstName");
    const userType = localStorage.getItem("userType");

    if (firstName && userType) {
      setUserInfo({ firstName, userType });
    }

    setLoading(false); // Set loading to false after attempting to load data
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Optionally show a loading spinner or message
  }

  const handleSignOut = () => {
    localStorage.removeItem("firstName");
    localStorage.removeItem("userType");
    setUserInfo({ firstName: "", userType: "" });  // Reset userInfo state
    navigate("/");
  };

  return (
    <div>
      <header>
        <nav className="navbar navbar-light">
          <a
            style={{ color: "#E9F1FA", fontSize: "30px" }}
            className="navbar-brand"
            href="http://localhost:5173/home"
          >
            EVENT TICKET BOOKING SYSTEM
          </a>
          {userInfo.firstName && userInfo.userType && (
            <div className="d-flex align-items-center">
              <span
                style={{
                  color: "#E9F1FA",
                  marginRight: "15px",
                  fontWeight: "bold",
                }}
              >
                {userInfo.firstName} ({userInfo.userType})
              </span>
              <button
                className="btn btn-danger"
                style={{ marginLeft: "10px" }}
                onClick={handleSignOut}
              >
                Sign Out
              </button>
            </div>
          )}
        </nav>
      </header>
    </div>
  );
};
export default HeaderComponent;

