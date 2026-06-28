import Chip from "@mui/material/Chip";

function StatusBadge({ status }) {

    switch (status) {

        case "PENDING":
            return (
                <Chip
                    label="Pending"
                    color="warning"
                    size="small"
                />
            );

        case "IN_PROGRESS":
            return (
                <Chip
                    label="In Progress"
                    color="info"
                    size="small"
                />
            );

        case "COMPLETED":
            return (
                <Chip
                    label="Completed"
                    color="success"
                    size="small"
                />
            );

        default:
            return (
                <Chip
                    label={status}
                    size="small"
                />
            );

    }

}

export default StatusBadge;