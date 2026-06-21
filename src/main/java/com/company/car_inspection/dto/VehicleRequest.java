package com.company.car_inspection.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class VehicleRequest {

    @NotBlank(message = "VIN is required")
    @Size(min = 17, max = 17,
            message = "VIN must be exactly 17 characters")
    private String vin;

    @NotBlank(message = "Make is required")
    private String make;

    @NotBlank(message = "Model is required")
    private String model;

    @NotNull(message = "Year is required")
    private Integer year;

    private String color;

    private Integer odometerKm;

    @NotBlank(message = "Status is required")
    private String status;
}