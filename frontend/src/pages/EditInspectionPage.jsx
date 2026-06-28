import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import InspectionForm from "../components/InspectionForm";

import {
    getInspectionById,
    updateInspection,
    uploadInspectionPhoto,
    deleteInspectionPhoto
} from "../api/inspectionApi";

function EditInspectionPage() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [inspection, setInspection] = useState(null);

    const [loading, setLoading] = useState(true);
    const handleDeletePhoto = () => {

        deleteInspectionPhoto(id)
            .then((response) => {

                setInspection(response.data);

                alert("Photo deleted successfully.");

            })
            .catch(() => {

                alert("Failed to delete photo.");

            });

    };

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

                if (updatedInspection.photo) {

                    return uploadInspectionPhoto(
                        id,
                        updatedInspection.photo
                    );

                }

                return Promise.resolve();

            })

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
                onDeletePhoto={handleDeletePhoto}
            />

        </div>

    );

}

export default EditInspectionPage;