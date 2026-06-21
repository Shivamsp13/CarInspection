package com.company.car_inspection.service;

import com.company.car_inspection.dto.VehicleRequest;
import com.company.car_inspection.dto.VehicleResponse;
import com.company.car_inspection.entity.Vehicle;
import com.company.car_inspection.exception.ResourceNotFoundException;
import com.company.car_inspection.repository.VehicleRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VehicleService {

    private final VehicleRepository vehicleRepository;

    public VehicleService(VehicleRepository vehicleRepository) {
        this.vehicleRepository = vehicleRepository;
    }

    public List<VehicleResponse> getAllVehicles() {

        return vehicleRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    public VehicleResponse getVehicleById(Long id) {

        Vehicle vehicle = vehicleRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Vehicle not found with id: " + id
                        ));

        return mapToResponse(vehicle);
    }

    public VehicleResponse createVehicle(VehicleRequest request) {

        Vehicle vehicle = new Vehicle();

        vehicle.setVin(request.getVin());
        vehicle.setMake(request.getMake());
        vehicle.setModel(request.getModel());
        vehicle.setYear(request.getYear());
        vehicle.setColor(request.getColor());
        vehicle.setOdometerKm(request.getOdometerKm());
        vehicle.setStatus(request.getStatus());

        Vehicle savedVehicle = vehicleRepository.save(vehicle);

        return mapToResponse(savedVehicle);
    }

    public VehicleResponse updateVehicle(Long id, VehicleRequest request) {

        Vehicle vehicle = vehicleRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Vehicle not found with id: " + id
                        ));

        vehicle.setVin(request.getVin());
        vehicle.setMake(request.getMake());
        vehicle.setModel(request.getModel());
        vehicle.setYear(request.getYear());
        vehicle.setColor(request.getColor());
        vehicle.setOdometerKm(request.getOdometerKm());
        vehicle.setStatus(request.getStatus());

        Vehicle updatedVehicle = vehicleRepository.save(vehicle);

        return mapToResponse(updatedVehicle);
    }

    public void deleteVehicle(Long id) {

        Vehicle vehicle = vehicleRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Vehicle not found with id: " + id
                        ));

        vehicleRepository.delete(vehicle);
    }

    public List<VehicleResponse> searchVehicles(
            String make,
            String model,
            String status) {

        return vehicleRepository
                .findByMakeContainingIgnoreCaseAndModelContainingIgnoreCaseAndStatusContainingIgnoreCase(
                        make,
                        model,
                        status
                )
                .stream()
                .map(this::mapToResponse)
                .toList();
    }


    private VehicleResponse mapToResponse(Vehicle vehicle) {

        VehicleResponse response = new VehicleResponse();

        response.setId(vehicle.getId());
        response.setVin(vehicle.getVin());
        response.setMake(vehicle.getMake());
        response.setModel(vehicle.getModel());
        response.setYear(vehicle.getYear());
        response.setColor(vehicle.getColor());
        response.setOdometerKm(vehicle.getOdometerKm());
        response.setStatus(vehicle.getStatus());
        response.setCreatedAt(vehicle.getCreatedAt());
        response.setUpdatedAt(vehicle.getUpdatedAt());

        return response;
    }
}