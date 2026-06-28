import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

export function getAllVehicles() {
    return api.get("/vehicles");
}

export function getVehicleById(id) {
    return api.get(`/vehicles/${id}`);
}

export function createVehicle(vehicle) {
    return api.post("/vehicles", vehicle);
}

export function updateVehicle(id, vehicle) {
    return api.put(`/vehicles/${id}`, vehicle);
}

export function deleteVehicle(id) {
    return api.delete(`/vehicles/${id}`);
}

export default api;