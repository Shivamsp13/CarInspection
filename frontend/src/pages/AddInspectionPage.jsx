import { useNavigate } from "react-router-dom";

import InspectionForm from "../components/InspectionForm";

import {
    createInspection,
    uploadInspectionPhoto,
} from "../api/inspectionApi";

function AddInspectionPage() {

    const navigate = useNavigate();

    const handleCreateInspection = async (inspection) => {

        try {

            const photo = inspection.photo;

            delete inspection.photo;

            const response = await createInspection(inspection);

            const inspectionId = response.data.id;

            if (photo) {

                await uploadInspectionPhoto(
                    inspectionId,
                    photo
                );

            }

            navigate("/inspections");

        } catch {

            alert("Failed to create inspection.");

        }

    };

    return (

        <div>

            <InspectionForm
                onSubmit={handleCreateInspection}
            />

        </div>

    );

}

export default AddInspectionPage;