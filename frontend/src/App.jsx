import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import VehiclesPage from "./pages/VehiclesPage";
import AddVehiclePage from "./pages/AddVehiclePage";
import EditVehiclePage from "./pages/EditVehiclePage";
import InspectionsPage from "./pages/InspectionsPage";
import AddInspectionPage from "./pages/AddInspectionPage";
import EditInspectionPage from "./pages/EditInspectionPage";
import InspectionDetailPage from "./pages/InspectionDetailPage";

function App() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />

            <Route path="/vehicles" element={<VehiclesPage />} />

            <Route path="/vehicles/new" element={<AddVehiclePage />} />

            <Route path="/vehicles/:id/edit" element={<EditVehiclePage />} />

            <Route path="/inspections" element={<InspectionsPage />} />

            <Route
                path="/inspections/new"
                element={<AddInspectionPage />}
            />

            <Route
                path="/inspections/:id/edit"
                element={<EditInspectionPage />}
            />

            <Route
                path="/inspections/:id"
                element={<InspectionDetailPage />}
            />
        </Routes>
    );
}

export default App;