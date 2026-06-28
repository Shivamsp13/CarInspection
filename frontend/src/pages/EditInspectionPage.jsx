import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import InspectionForm from "../components/InspectionForm";

import {
    getInspectionById,
    updateInspection,
} from "../api/inspectionApi";

function EditInspectionPage() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [inspection, setInspection] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        getInspectionById(id)

            .then((response) => {

                setInspection(response.data);

            })

            .catch(() => {

                alert("Failed to load inspection.");

            })

            .finally(() => {

                setLoading(false);

            });

    }, [id]);

    const handleUpdateInspection = (updatedInspection) => {

        updateInspection(id, updatedInspection)

            .then(() => {

                navigate("/inspections");

            })

            .catch(() => {

                alert("Failed to update inspection.");

            });

    };

    if (loading) {

        return <h2>Loading...</h2>;

    }

    return (

        <div>

            <InspectionForm
                initialData={inspection}
                onSubmit={handleUpdateInspection}
            />

        </div>

    );

}

export default EditInspectionPage;