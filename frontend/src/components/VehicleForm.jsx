import { useState } from "react";

import {
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Stack,
    TextField,
    Typography,
} from "@mui/material";

function VehicleForm({ onSubmit, initialData }) {

    const [vin, setVin] = useState(initialData?.vin || "");
    const [make, setMake] = useState(initialData?.make || "");
    const [model, setModel] = useState(initialData?.model || "");
    const [year, setYear] = useState(initialData?.year || "");
    const [color, setColor] = useState(initialData?.color || "");
    const [odometerKm, setOdometerKm] = useState(initialData?.odometerKm || "");
    const [status, setStatus] = useState(initialData?.status || "PENDING");

    const [errors, setErrors] = useState({});

    const validateForm = () => {

        const newErrors = {};

        if (!vin.trim()) {

            newErrors.vin = "VIN is required";

        } else if (vin.length !== 17) {

            newErrors.vin = "VIN must be exactly 17 characters";

        }

        if (!make.trim()) {

            newErrors.make = "Make is required";

        }

        if (!model.trim()) {

            newErrors.model = "Model is required";

        }

        if (!year) {

            newErrors.year = "Year is required";

        }

        if (odometerKm !== "" && Number(odometerKm) < 0) {

            newErrors.odometerKm =
                "Odometer cannot be negative";

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

            vin,
            make,
            model,
            year: Number(year),
            color,
            odometerKm:
                odometerKm === ""
                    ? null
                    : Number(odometerKm),
            status,

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
                    width: 600,
                    p: 4,
                }}
            >

                <Typography
                    variant="h5"
                    gutterBottom
                >
                    Vehicle Details
                </Typography>

                <Box
                    component="form"
                    onSubmit={handleSubmit}
                >

                    <Stack spacing={3}>

                        <TextField
                            label="VIN"
                            value={vin}
                            onChange={(e) =>
                                setVin(e.target.value)
                            }
                            error={!!errors.vin}
                            helperText={errors.vin}
                            fullWidth
                        />

                        <TextField
                            label="Make"
                            value={make}
                            onChange={(e) =>
                                setMake(e.target.value)
                            }
                            error={!!errors.make}
                            helperText={errors.make}
                            fullWidth
                        />

                        <TextField
                            label="Model"
                            value={model}
                            onChange={(e) =>
                                setModel(e.target.value)
                            }
                            error={!!errors.model}
                            helperText={errors.model}
                            fullWidth
                        />

                        <TextField
                            label="Year"
                            type="number"
                            value={year}
                            onChange={(e) =>
                                setYear(e.target.value)
                            }
                            error={!!errors.year}
                            helperText={errors.year}
                            fullWidth
                        />

                        <TextField
                            label="Color"
                            value={color}
                            onChange={(e) =>
                                setColor(e.target.value)
                            }
                            fullWidth
                        />

                        <TextField
                            label="Odometer (km)"
                            type="number"
                            value={odometerKm}
                            onChange={(e) =>
                                setOdometerKm(e.target.value)
                            }
                            error={!!errors.odometerKm}
                            helperText={errors.odometerKm}
                            fullWidth
                        />

                        <FormControl fullWidth>

                            <InputLabel>Status</InputLabel>

                            <Select
                                value={status}
                                label="Status"
                                onChange={(e) =>
                                    setStatus(e.target.value)
                                }
                            >

                                <MenuItem value="PENDING">
                                    Pending
                                </MenuItem>

                                <MenuItem value="IN_PROGRESS">
                                    In Progress
                                </MenuItem>

                                <MenuItem value="COMPLETED">
                                    Completed
                                </MenuItem>

                            </Select>

                        </FormControl>

                        <Button
                            type="submit"
                            variant="contained"
                            size="large"
                        >
                            Save Vehicle
                        </Button>

                    </Stack>

                </Box>

            </Paper>

        </Box>

    );

}

export default VehicleForm;