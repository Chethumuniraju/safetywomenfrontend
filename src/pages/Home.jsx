import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS


const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100 bg-light">
      <h1 className="mb-4 fw-bold text-primary">Select Your Role</h1>
      <div className="d-flex gap-3">
        <button className="btn btn-success px-4 py-2" onClick={() => navigate("/login/police")}>
          🚔 Police
        </button>
        <button className="btn btn-danger px-4 py-2" onClick={() => navigate("/login/admin")}>
          🛠️ Admin
        </button>
      </div>
    </div>
  );
};

export default Home;
