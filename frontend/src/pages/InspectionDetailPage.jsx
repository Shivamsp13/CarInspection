import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getInspectionById } from "../api/inspectionApi";

import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    CircularProgress,
    Container,
    Divider,
    Stack,
    Typography,
} from "@mui/material";

function InspectionDetailPage() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [inspection, setInspection] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    useEffect(() => {

        getInspectionById(id)

            .then((response) => {

                setInspection(response.data);

            })

            .catch(() => {

                setError("Failed to load inspection.");

            })

            .finally(() => {

                setLoading(false);

            });

    }, [id]);

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

        <Container maxWidth="md" sx={{ mt: 4 }}>

            <Card elevation={3}>

                <CardContent>

                    <Typography
                        variant="h4"
                        gutterBottom
                    >
                        Inspection Details
                    </Typography>

                    <Divider sx={{ mb: 3 }} />

                    <Stack spacing={2}>

                        <Typography>

                            <strong>ID:</strong> {inspection.id}

                        </Typography>

                        <Typography>

                            <strong>Vehicle ID:</strong> {inspection.vehicleId}

                        </Typography>

                        <Typography>

                            <strong>Inspector:</strong> {inspection.inspectorName}

                        </Typography>

                        <Typography>

                            <strong>Inspection Date:</strong> {inspection.inspectionDate}

                        </Typography>

                        <Typography>

                            <strong>Overall Condition:</strong> {inspection.overallCondition}

                        </Typography>

                        <Typography>

                            <strong>Status:</strong> {inspection.status}

                        </Typography>

                        <Typography>

                            <strong>Notes:</strong>

                        </Typography>

                        <Typography>

                            {inspection.notes || "No notes available."}

                        </Typography>

                        <Typography>

                            <strong>Created At:</strong>{" "}
                            {new Date(inspection.createdAt).toLocaleString()}

                        </Typography>

                        <Typography>

                            <strong>Updated At:</strong>{" "}
                            {new Date(inspection.updatedAt).toLocaleString()}

                        </Typography>

                        {inspection.photoS3Key && (

                            <Box>

                                <Typography
                                    variant="h6"
                                    gutterBottom
                                >
                                    Photo
                                </Typography>

                                <img
                                    src={`${import.meta.env.VITE_API_URL}/inspections/${inspection.id}/photo`}
                                    alt="Inspection"
                                    style={{
                                        maxWidth: "100%",
                                        borderRadius: "8px",
                                    }}
                                />

                            </Box>

                        )}

                        <Button
                            variant="contained"
                            onClick={() =>
                                navigate("/inspections")
                            }
                        >
                            Back
                        </Button>

                    </Stack>

                </CardContent>

            </Card>

        </Container>

    );

}

export default InspectionDetailPage;