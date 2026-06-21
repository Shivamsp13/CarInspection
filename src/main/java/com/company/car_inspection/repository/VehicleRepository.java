package com.company.car_inspection.repository;

import com.company.car_inspection.entity.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.List;

public interface VehicleRepository extends JpaRepository<Vehicle, Long> {

    Optional<Vehicle> findByVin(String vin);

    List<Vehicle> findByMakeContainingIgnoreCaseAndModelContainingIgnoreCaseAndStatusContainingIgnoreCase(
            String make,
            String model,
            String status
    );

}