import axios from "axios";

const api = axios.create({

    baseURL: import.meta.env.VITE_API_URL,

});

export const getAllInspections = () =>
    api.get("/inspections");

export const getInspectionById = (id) =>
    api.get(`/inspections/${id}`);

export const createInspection = (inspection) =>
    api.post("/inspections", inspection);

export const updateInspection = (id, inspection) =>
    api.put(`/inspections/${id}`, inspection);

export const deleteInspection = (id) =>
    api.delete(`/inspections/${id}`);

export const submitInspection = (id) =>
    api.patch(`/inspections/${id}/submit`);

export const getVehicleInspections = (vehicleId) =>
    api.get(`/inspections/${vehicleId}/inspections`);

export const uploadInspectionPhoto = (id, file) => {

    const formData = new FormData();

    formData.append("file", file);

    return api.post(
        `/inspections/${id}/photo`,
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );

};