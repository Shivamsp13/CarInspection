package com.company.car_inspection.controller;

import com.company.car_inspection.dto.InspectionRequest;
import com.company.car_inspection.dto.InspectionResponse;
import com.company.car_inspection.service.InspectionService;
import com.company.car_inspection.service.VehicleService;
import jakarta.validation.Valid;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/inspections")
public class InspectionController {

    private final InspectionService inspectionService;
    private final VehicleService vehicleService;


    public InspectionController(
            InspectionService inspectionService,VehicleService vehicleService) {
        this.vehicleService=vehicleService;
        this.inspectionService = inspectionService;
    }

    @GetMapping("/{id}/inspections")
    public List<InspectionResponse> getVehicleInspections(
            @PathVariable Long id) {
        return inspectionService.getInspectionsByVehicle(id);
    }

    @GetMapping
    public List<InspectionResponse> getAllInspections() {

        return inspectionService.getAllInspections();
    }

    @GetMapping("/{id}")
    public InspectionResponse getInspectionById(
            @PathVariable Long id) {

        return inspectionService.getInspectionById(id);
    }

    @PostMapping
    public InspectionResponse createInspection(
            @Valid @RequestBody InspectionRequest request) {

        return inspectionService.createInspection(request);
    }

    @PutMapping("/{id}")
    public InspectionResponse updateInspection(
            @PathVariable Long id,
            @Valid @RequestBody InspectionRequest request) {

        return inspectionService.updateInspection(id, request);
    }

    @DeleteMapping("/{id}")
    public String deleteInspection(
            @PathVariable Long id) {

        inspectionService.deleteInspection(id);

        return "Inspection deleted successfully";
    }

    @PatchMapping("/{id}/submit")
    public InspectionResponse submitInspection(
            @PathVariable Long id) {

        return inspectionService.submitInspection(id);
    }

    @PostMapping(
            value = "/{id}/photo",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public InspectionResponse uploadPhoto(
            @PathVariable Long id,
            @RequestParam("file") MultipartFile file)
            throws IOException {

        return inspectionService.uploadPhoto(id, file);
    }

    @GetMapping("/{id}/photo")
    public ResponseEntity<byte[]> getInspectionPhoto(
            @PathVariable Long id)
            throws IOException {

        byte[] photo = inspectionService.getInspectionPhoto(id);

        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_JPEG)
                .body(photo);
    }
}