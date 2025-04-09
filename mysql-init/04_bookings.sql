USE testdb;

CREATE TABLE IF NOT EXISTS bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    doctor_id INT NOT NULL,
    booking_date VARCHAR(255) NOT NULL DEFAULT '2023-10-01',
    booking_time VARCHAR(255) NOT NULL DEFAULT '09:00 AM',
    booking_status VARCHAR(50) DEFAULT 'pending',
    booking_note VARCHAR(255) NULL,
    booking_created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    booking_updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    booking_feedback VARCHAR(255) NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (doctor_id) REFERENCES doctors(id) ON DELETE CASCADE
);
