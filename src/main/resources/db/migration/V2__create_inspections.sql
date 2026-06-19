CREATE TABLE inspections (
                            id BIGSERIAL PRIMARY KEY,

                             vehicle_id BIGINT NOT NULL,

                             inspector_name VARCHAR(200) NOT NULL,

                             inspection_date DATE NOT NULL,

                             overall_condition VARCHAR(20) NOT NULL,

                             notes TEXT,

                             photo_s3_key VARCHAR(500),

                             status VARCHAR(20) NOT NULL,

                             created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

                             updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

                             CONSTRAINT fk_inspection_vehicle
                                 FOREIGN KEY (vehicle_id)
                                     REFERENCES vehicles(id)
                                     ON DELETE CASCADE
);