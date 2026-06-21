package com.company.car_inspection.service;

import com.company.car_inspection.dto.InspectionRequest;
import com.company.car_inspection.dto.InspectionResponse;
import com.company.car_inspection.entity.Inspection;
import com.company.car_inspection.entity.Vehicle;
import com.company.car_inspection.exception.ResourceNotFoundException;
import com.company.car_inspection.repository.InspectionRepository;
import com.company.car_inspection.repository.VehicleRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InspectionService {

    private final InspectionRepository inspectionRepository;
    private final VehicleRepository vehicleRepository;

    public InspectionService(
            InspectionRepository inspectionRepository,
            VehicleRepository vehicleRepository) {

        this.inspectionRepository = inspectionRepository;
        this.vehicleRepository = vehicleRepository;
    }

    public List<InspectionResponse> getAllInspections() {

        return inspectionRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    public InspectionResponse getInspectionById(Long id) {

        Inspection inspection = inspectionRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Inspection not found with id: " + id
                        ));

        return mapToResponse(inspection);
    }

    public List<InspectionResponse> getInspectionsByVehicle(Long vehicleId) {

        return inspectionRepository.findByVehicleId(vehicleId)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    public InspectionResponse createInspection(
            InspectionRequest request) {

        Vehicle vehicle = vehicleRepository.findById(
                        request.getVehicleId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Vehicle not found with id: "
                                        + request.getVehicleId()
                        ));

        Inspection inspection = new Inspection();

        inspection.setVehicle(vehicle);
        inspection.setInspectorName(request.getInspectorName());
        inspection.setInspectionDate(request.getInspectionDate());
        inspection.setOverallCondition(request.getOverallCondition());
        inspection.setNotes(request.getNotes());
        inspection.setStatus(request.getStatus());

        Inspection savedInspection =
                inspectionRepository.save(inspection);

        return mapToResponse(savedInspection);
    }

    public InspectionResponse updateInspection(
            Long id,
            InspectionRequest request) {

        Inspection inspection =
                inspectionRepository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Inspection not found with id: " + id
                                ));

        Vehicle vehicle = vehicleRepository.findById(
                        request.getVehicleId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Vehicle not found with id: "
                                        + request.getVehicleId()
                        ));

        inspection.setVehicle(vehicle);
        inspection.setInspectorName(request.getInspectorName());
        inspection.setInspectionDate(request.getInspectionDate());
        inspection.setOverallCondition(request.getOverallCondition());
        inspection.setNotes(request.getNotes());
        inspection.setStatus(request.getStatus());

        Inspection updatedInspection =
                inspectionRepository.save(inspection);

        return mapToResponse(updatedInspection);
    }

    public void deleteInspection(Long id) {

        Inspection inspection =
                inspectionRepository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Inspection not found with id: " + id
                                ));

        inspectionRepository.delete(inspection);
    }
    public InspectionResponse submitInspection(Long id) {

        Inspection inspection = inspectionRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Inspection not found with id: " + id
                        ));

        inspection.setStatus("SUBMITTED");

        Inspection savedInspection =
                inspectionRepository.save(inspection);

        return mapToResponse(savedInspection);
    }

    public InspectionResponse uploadPhoto(
            Long id,
            String photoS3Key) {

        Inspection inspection = inspectionRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Inspection not found with id: " + id
                        ));

        inspection.setPhotoS3Key(photoS3Key);

        Inspection savedInspection =
                inspectionRepository.save(inspection);

        return mapToResponse(savedInspection);
    }

    private InspectionResponse mapToResponse(
            Inspection inspection) {

        InspectionResponse response =
                new InspectionResponse();

        response.setId(inspection.getId());
        response.setVehicleId(
                inspection.getVehicle().getId());
        response.setInspectorName(
                inspection.getInspectorName());
        response.setInspectionDate(
                inspection.getInspectionDate());
        response.setOverallCondition(
                inspection.getOverallCondition());
        response.setNotes(
                inspection.getNotes());
        response.setPhotoS3Key(
                inspection.getPhotoS3Key());
        response.setStatus(
                inspection.getStatus());
        response.setCreatedAt(
                inspection.getCreatedAt());
        response.setUpdatedAt(
                inspection.getUpdatedAt());

        return response;
    }
}