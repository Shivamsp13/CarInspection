import { useNavigate } from "react-router-dom";

function HomePage() {

    const navigate = useNavigate();

    return (
        <div>

            <h1>Car Inspection System</h1>

            <p>Welcome to the Car Inspection Management System.</p>

            <button onClick={() => navigate("/vehicles")}>
                Vehicles
            </button>

            <button onClick={() => navigate("/inspections")}>
                Inspections
            </button>

        </div>
    );
}

export default HomePage;