CREATE TABLE vehicles (
                          id BIGSERIAL PRIMARY KEY,
                          vin VARCHAR(17) NOT NULL UNIQUE,
                          make VARCHAR(100) NOT NULL,
                          model VARCHAR(100) NOT NULL,
                          manufacture_year INTEGER NOT NULL,
                          color VARCHAR(50),
                          odometer_km INTEGER,
                          status VARCHAR(20) NOT NULL,
                          created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                          updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);