import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import VehicleForm from "../components/VehicleForm";

import {
    getVehicleById,
    updateVehicle
} from "../api/vehicleApi";

function EditVehiclePage() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [vehicle, setVehicle] = useState(null);

    useEffect(() => {

        getVehicleById(id)

            .then((response) => {

                setVehicle(response.data);

            });

    }, [id]);

    const handleUpdateVehicle = (updatedVehicle) => {

        updateVehicle(id, updatedVehicle)

            .then(() => {

                navigate("/vehicles");

            });

    };

    if (!vehicle) {

        return <h2>Loading...</h2>;

    }

    return (

        <div>

            <h1>Edit Vehicle</h1>

            <VehicleForm

                initialData={vehicle}

                onSubmit={handleUpdateVehicle}

            />

        </div>

    );

}

export default EditVehiclePage;