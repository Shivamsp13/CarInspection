import { useNavigate } from "react-router-dom";
import VehicleForm from "../components/VehicleForm";
import { createVehicle } from "../api/vehicleApi";

function AddVehiclePage() {

    const navigate = useNavigate();

    const handleCreateVehicle = (vehicle) => {

        createVehicle(vehicle)

            .then(() => {

                navigate("/vehicles");
            })

            .catch(() => {

                alert("Failed to create vehicle.");

            });

    };

    return (

        <div>

            <h1>Add Vehicle</h1>

            <VehicleForm onSubmit={handleCreateVehicle} />

        </div>

    );

}

export default AddVehiclePage;