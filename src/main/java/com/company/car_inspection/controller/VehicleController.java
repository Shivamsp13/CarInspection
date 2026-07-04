package com.company.car_inspection.controller;

import com.company.car_inspection.dto.VehicleRequest;
import com.company.car_inspection.dto.VehicleResponse;
import com.company.car_inspection.service.VehicleService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vehicles")
public class VehicleController {

    private final VehicleService vehicleService;

    public VehicleController(VehicleService vehicleService) {
        this.vehicleService = vehicleService;
    }

    @GetMapping
    public List<VehicleResponse> getAllVehicles() {
        return vehicleService.getAllVehicles();
    }

    @GetMapping("/{id}")
    public VehicleResponse getVehicleById(@PathVariable Long id) {
        return vehicleService.getVehicleById(id);
    }

    @PostMapping
    public VehicleResponse createVehicle(
            @Valid @RequestBody VehicleRequest request) {

        return vehicleService.createVehicle(request);
    }

    @PutMapping("/{id}")
    public VehicleResponse updateVehicle(
            @PathVariable Long id,
            @Valid @RequestBody VehicleRequest request) {

        return vehicleService.updateVehicle(id, request);
    }

    @DeleteMapping("/{id}")
    public String deleteVehicle(@PathVariable Long id) {

        vehicleService.deleteVehicle(id);
        return "Vehicle deleted successfully";

    }

    @GetMapping("/search")
    public List<VehicleResponse> searchVehicles(

            @RequestParam(required = false) String make,

            @RequestParam(required = false) String model,

            @RequestParam(required = false) String status
    ) {

        return vehicleService.searchVehicles(
                make == null ? "" : make,
                model == null ? "" : model,
                status == null ? "" : status
        );
    }
}