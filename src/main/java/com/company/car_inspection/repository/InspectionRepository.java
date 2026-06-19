package com.company.car_inspection.repository;

import com.company.car_inspection.entity.Inspection;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InspectionRepository extends JpaRepository<Inspection, Long> {

    List<Inspection> findByVehicleId(Long vehicleId);

}