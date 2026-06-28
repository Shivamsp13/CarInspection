import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    getAllVehicles,
    deleteVehicle,
} from "../api/vehicleApi";

import StatusBadge from "../components/StatusBadge";

import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Container,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
    Stack,
} from "@mui/material";

function VehiclesPage() {

    const navigate = useNavigate();

    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [searchText, setSearchText] = useState("");

    useEffect(() => {

        getAllVehicles()

            .then((response) => {

                setVehicles(response.data);

            })

            .catch(() => {

                setError("Failed to load vehicles.");

            })

            .finally(() => {

                setLoading(false);

            });

    }, []);

    const handleDeleteVehicle = (id) => {

        const confirmed = window.confirm(
            "Are you sure you want to delete this vehicle?"
        );

        if (!confirmed) {
            return;
        }

        deleteVehicle(id)

            .then(() => {

                setVehicles((previousVehicles) =>
                    previousVehicles.filter(
                        (vehicle) => vehicle.id !== id
                    )
                );

            })

            .catch(() => {

                alert("Failed to delete vehicle.");

            });

    };

    const filteredVehicles = vehicles.filter((vehicle) => {

        const search = searchText.toLowerCase();

        return (

            vehicle.vin.toLowerCase().includes(search) ||

            vehicle.make.toLowerCase().includes(search) ||

            vehicle.model.toLowerCase().includes(search) ||

            vehicle.status.toLowerCase().includes(search)

        );

    });

    if (loading) {

        return (

            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="80vh"
            >

                <CircularProgress />

            </Box>

        );

    }

    if (error) {

        return (

            <Container sx={{ mt: 4 }}>

                <Alert severity="error">

                    {error}

                </Alert>

            </Container>

        );

    }

    return (

        <Container sx={{ mt: 4 }}>

            <Typography
                variant="h4"
                gutterBottom
            >
                Vehicle Management
            </Typography>

            <Stack
                direction="row"
                spacing={2}
                justifyContent="space-between"
                sx={{ mb: 3 }}
            >

                <TextField
                    label="Search Vehicles"
                    placeholder="VIN, Make, Model or Status"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    sx={{ width: 400 }}
                />

                <Button
                    variant="contained"
                    onClick={() => navigate("/vehicles/new")}
                >
                    Add Vehicle
                </Button>

            </Stack>

            <Paper elevation={3}>

                <TableContainer>

                    <Table>

                        <TableHead>

                            <TableRow>

                                <TableCell>ID</TableCell>

                                <TableCell>VIN</TableCell>

                                <TableCell>Make</TableCell>

                                <TableCell>Model</TableCell>

                                <TableCell>Year</TableCell>

                                <TableCell>Color</TableCell>

                                <TableCell>Odometer</TableCell>

                                <TableCell>Status</TableCell>

                                <TableCell>Created At</TableCell>

                                <TableCell>Updated At</TableCell>

                                <TableCell align="center">

                                    Actions

                                </TableCell>

                            </TableRow>

                        </TableHead>

                        <TableBody>

                            {filteredVehicles.length > 0 ? (

                                filteredVehicles.map((vehicle) => (

                                    <TableRow key={vehicle.id} hover>

                                        <TableCell>{vehicle.id}</TableCell>

                                        <TableCell>{vehicle.vin}</TableCell>

                                        <TableCell>{vehicle.make}</TableCell>

                                        <TableCell>{vehicle.model}</TableCell>

                                        <TableCell>{vehicle.year}</TableCell>

                                        <TableCell>{vehicle.color}</TableCell>

                                        <TableCell>{vehicle.odometerKm}</TableCell>

                                        <TableCell>

                                            <StatusBadge
                                                status={vehicle.status}
                                            />

                                        </TableCell>

                                        <TableCell>

                                            {new Date(
                                                vehicle.createdAt
                                            ).toLocaleString()}

                                        </TableCell>

                                        <TableCell>

                                            {new Date(
                                                vehicle.updatedAt
                                            ).toLocaleString()}

                                        </TableCell>

                                        <TableCell align="center">

                                            <Stack
                                                direction="row"
                                                spacing={1}
                                                justifyContent="center"
                                            >

                                                <Button
                                                    variant="outlined"
                                                    size="small"
                                                    onClick={() =>
                                                        navigate(
                                                            `/vehicles/${vehicle.id}/edit`
                                                        )
                                                    }
                                                >
                                                    Edit
                                                </Button>

                                                <Button
                                                    variant="contained"
                                                    color="error"
                                                    size="small"
                                                    onClick={() =>
                                                        handleDeleteVehicle(
                                                            vehicle.id
                                                        )
                                                    }
                                                >
                                                    Delete
                                                </Button>

                                            </Stack>

                                        </TableCell>

                                    </TableRow>

                                ))

                            ) : (

                                <TableRow>

                                    <TableCell
                                        colSpan={11}
                                        align="center"
                                    >

                                        No vehicles found.

                                    </TableCell>

                                </TableRow>

                            )}

                        </TableBody>

                    </Table>

                </TableContainer>

            </Paper>

        </Container>

    );

}

export default VehiclesPage;