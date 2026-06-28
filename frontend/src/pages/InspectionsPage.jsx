import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    getAllInspections,
    deleteInspection,
    submitInspection,
} from "../api/inspectionApi";

import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Container,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from "@mui/material";

function InspectionsPage() {

    const navigate = useNavigate();

    const [inspections, setInspections] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [searchText, setSearchText] = useState("");

    useEffect(() => {

        getAllInspections()

            .then((response) => {

                setInspections(response.data);

            })

            .catch(() => {

                setError("Failed to load inspections.");

            })

            .finally(() => {

                setLoading(false);

            });

    }, []);

    const handleDeleteInspection = (id) => {

        const confirmed = window.confirm(
            "Are you sure you want to delete this inspection?"
        );

        if (!confirmed) {

            return;

        }

        deleteInspection(id)

            .then(() => {

                setInspections((previousInspections) =>
                    previousInspections.filter(
                        (inspection) => inspection.id !== id
                    )
                );

            })

            .catch(() => {

                alert("Failed to delete inspection.");

            });

    };

    const handleSubmitInspection = async (id) => {

    try {

        const response = await submitInspection(id);

        setInspections((previousInspections) =>
            previousInspections.map((inspection) =>

                inspection.id === id
                    ? response.data
                    : inspection

            )
        );

    } catch {

        alert("Failed to submit inspection.");

    }

};

    const filteredInspections = inspections.filter((inspection) => {

        const search = searchText.toLowerCase();

        return (

            inspection.inspectorName.toLowerCase().includes(search) ||

            inspection.overallCondition.toLowerCase().includes(search) ||

            inspection.status.toLowerCase().includes(search)

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
                Inspection Management
            </Typography>

            <Stack
                direction="row"
                spacing={2}
                justifyContent="space-between"
                sx={{ mb: 3 }}
            >

                <TextField
                    label="Search Inspections"
                    value={searchText}
                    onChange={(e) =>
                        setSearchText(e.target.value)
                    }
                    sx={{ width: 350 }}
                />

                <Button
                    variant="contained"
                    onClick={() =>
                        navigate("/inspections/new")
                    }
                >
                    Add Inspection
                </Button>

            </Stack>

            <Paper elevation={3}>

                <TableContainer>

                    <Table>

                        <TableHead>

                            <TableRow>

                                <TableCell>ID</TableCell>

                                <TableCell>Vehicle ID</TableCell>

                                <TableCell>Inspector</TableCell>

                                <TableCell>Date</TableCell>

                                <TableCell>Condition</TableCell>

                                <TableCell>Status</TableCell>

                                <TableCell align="center">

                                    Actions

                                </TableCell>

                            </TableRow>

                        </TableHead>

                        <TableBody>

                            {filteredInspections.length > 0 ? (

                                filteredInspections.map((inspection) => (

                                    <TableRow
                                        key={inspection.id}
                                        hover
                                    >

                                        <TableCell>
                                            {inspection.id}
                                        </TableCell>

                                        <TableCell>
                                            {inspection.vehicleId}
                                        </TableCell>

                                        <TableCell>
                                            {inspection.inspectorName}
                                        </TableCell>

                                        <TableCell>
                                            {inspection.inspectionDate}
                                        </TableCell>

                                        <TableCell>
                                            {inspection.overallCondition}
                                        </TableCell>

                                        <TableCell>
                                            {inspection.status}
                                        </TableCell>

                                        <TableCell
                                            align="center"
                                        >

                                            <Stack
                                                direction="row"
                                                spacing={1}
                                                justifyContent="center"
                                            >

                                                <Button
                                                    variant="outlined"
                                                    size="small"
                                                    onClick={() =>
                                                        navigate(`/inspections/${inspection.id}`)
                                                    }
                                                >
                                                    View
                                                </Button>

                                                <Button
                                                    variant="outlined"
                                                    size="small"
                                                    onClick={() =>
                                                        navigate(`/inspections/${inspection.id}/edit`)
                                                    }
                                                >
                                                    Edit
                                                </Button>

                                                {inspection.status === "DRAFT" && (

                                                    <Button
                                                        variant="contained"
                                                        color="success"
                                                        size="small"
                                                        onClick={() =>
                                                            handleSubmitInspection(
                                                                inspection.id
                                                            )
                                                        }
                                                    >
                                                        Submit
                                                    </Button>

                                                )}

                                                <Button
                                                    variant="contained"
                                                    color="error"
                                                    size="small"
                                                    onClick={() =>
                                                        handleDeleteInspection(
                                                            inspection.id
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
                                        colSpan={7}
                                        align="center"
                                    >

                                        No inspections found.

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

export default InspectionsPage;