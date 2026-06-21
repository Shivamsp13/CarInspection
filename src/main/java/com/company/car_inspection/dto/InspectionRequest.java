package com.company.car_inspection.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class InspectionRequest {

    @NotNull(message = "Vehicle ID is required")
    private Long vehicleId;

    @NotBlank(message = "Inspector name is required")
    private String inspectorName;

    @NotNull(message = "Inspection date is required")
    private LocalDate inspectionDate;

    @NotBlank(message = "Overall condition is required")
    private String overallCondition;

    private String notes;

    private String status;
}