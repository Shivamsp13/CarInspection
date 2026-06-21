package com.company.car_inspection.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
public class InspectionResponse {

    private Long id;

    private Long vehicleId;

    private String inspectorName;

    private LocalDate inspectionDate;

    private String overallCondition;

    private String notes;

    private String photoS3Key;

    private String status;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}