package com.company.car_inspection.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class VehicleResponse {

    private Long id;

    private String vin;

    private String make;

    private String model;

    private Integer year;

    private String color;

    private Integer odometerKm;

    private String status;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}