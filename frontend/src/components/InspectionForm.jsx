import { useEffect, useState } from "react";

import {
    Box,
    Button,
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Stack,
    TextField,
    Typography,
} from "@mui/material";

import { getAllVehicles } from "../api/vehicleApi";

function InspectionForm({ onSubmit, initialData }) {

    const [vehicles, setVehicles] = useState([]);

    const [vehicleId, setVehicleId] = useState(initialData?.vehicleId || "");
    const [inspectorName, setInspectorName] = useState(initialData?.inspectorName || "");
    const [inspectionDate, setInspectionDate] = useState(initialData?.inspectionDate || "");
    const [overallCondition, setOverallCondition] = useState(initialData?.overallCondition || "");
    const [notes, setNotes] = useState(initialData?.notes || "");
    // const [status, setStatus] = useState(initialData?.status || "DRAFT");

    const [photo, setPhoto] = useState(null);

    const [errors, setErrors] = useState({});

    useEffect(() => {

        getAllVehicles()

            .then((response) => {

                setVehicles(response.data);

            })

            .catch(() => {

                alert("Failed to load vehicles.");

            });

    }, []);

    const validateForm = () => {

        const newErrors = {};

        if (!vehicleId) {

            newErrors.vehicleId = "Vehicle is required";

        }

        if (!inspectorName.trim()) {

            newErrors.inspectorName = "Inspector Name is required";

        }

        if (!inspectionDate) {

            newErrors.inspectionDate = "Inspection Date is required";

        }

        if (!overallCondition) {

            newErrors.overallCondition = "Overall Condition is required";

        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;

    };

    const handleSubmit = (e) => {

        e.preventDefault();

        if (!validateForm()) {

            return;

        }

        onSubmit({

            vehicleId: Number(vehicleId),
            inspectorName,
            inspectionDate,
            overallCondition,
            notes,
            photo,

        });

    };

    return (

        <Box
            display="flex"
            justifyContent="center"
            mt={4}
        >

            <Paper
                elevation={3}
                sx={{
                    width: 650,
                    p: 4,
                }}
            >

                <Typography
                    variant="h5"
                    gutterBottom
                >
                    Inspection Details
                </Typography>

                <Box
                    component="form"
                    onSubmit={handleSubmit}
                >

                    <Stack spacing={3}>

                        <FormControl
                            fullWidth
                            error={!!errors.vehicleId}
                        >

                            <InputLabel>
                                Vehicle
                            </InputLabel>

                            <Select
                                value={vehicleId}
                                label="Vehicle"
                                onChange={(e) =>
                                    setVehicleId(e.target.value)
                                }
                            >

                                {vehicles.map((vehicle) => (

                                    <MenuItem
                                        key={vehicle.id}
                                        value={vehicle.id}
                                    >

                                        {vehicle.make} {vehicle.model} (ID: {vehicle.id})

                                    </MenuItem>

                                ))}

                            </Select>

                            <FormHelperText>
                                {errors.vehicleId}
                            </FormHelperText>

                        </FormControl>

                        <TextField
                            label="Inspector Name"
                            value={inspectorName}
                            onChange={(e) =>
                                setInspectorName(e.target.value)
                            }
                            error={!!errors.inspectorName}
                            helperText={errors.inspectorName}
                            fullWidth
                        />

                        <TextField
                            label="Inspection Date"
                            type="date"
                            value={inspectionDate}
                            onChange={(e) =>
                                setInspectionDate(e.target.value)
                            }
                            InputLabelProps={{
                                shrink: true,
                            }}
                            error={!!errors.inspectionDate}
                            helperText={errors.inspectionDate}
                            fullWidth
                        />

                        <FormControl
                            fullWidth
                            error={!!errors.overallCondition}
                        >

                            <InputLabel>
                                Overall Condition
                            </InputLabel>

                            <Select
                                value={overallCondition}
                                label="Overall Condition"
                                onChange={(e) =>
                                    setOverallCondition(e.target.value)
                                }
                            >

                                <MenuItem value="EXCELLENT">
                                    Excellent
                                </MenuItem>

                                <MenuItem value="GOOD">
                                    Good
                                </MenuItem>

                                <MenuItem value="FAIR">
                                    Fair
                                </MenuItem>

                                <MenuItem value="POOR">
                                    Poor
                                </MenuItem>

                            </Select>

                            <FormHelperText>
                                {errors.overallCondition}
                            </FormHelperText>

                        </FormControl>

                        <TextField
                            label="Notes"
                            multiline
                            rows={4}
                            value={notes}
                            onChange={(e) =>
                                setNotes(e.target.value)
                            }
                            fullWidth
                        />

                        {/* <FormControl fullWidth>

                            <InputLabel>
                                Status
                            </InputLabel>

                            <Select
                                value={status}
                                label="Status"
                                onChange={(e) =>
                                    setStatus(e.target.value)
                                }
                            >

                                <MenuItem value="DRAFT">
                                    Draft
                                </MenuItem>

                                <MenuItem value="SUBMITTED">
                                    Submitted
                                </MenuItem>

                                <MenuItem value="APPROVED">
                                    Approved
                                </MenuItem>

                            </Select>

                        </FormControl> */}

                        <Button
                            variant="outlined"
                            component="label"
                        >
                            Upload Inspection Photo

                            <input
                                type="file"
                                accept="image/*"
                                hidden
                                onChange={(e) =>
                                    setPhoto(e.target.files[0])
                                }
                            />

                        </Button>

                        {photo && (

                            <Typography
                                variant="body2"
                            >
                                Selected File: {photo.name}
                            </Typography>

                        )}

                        <Button
                            type="submit"
                            variant="contained"
                            size="large"
                        >
                            Save Inspection
                        </Button>

                    </Stack>

                </Box>

            </Paper>

        </Box>

    );

}

export default InspectionForm;