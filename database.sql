-- ==========================================
-- BREALLS RESORTS - MYSQL DATABASE SCHEMA
-- ==========================================

CREATE DATABASE IF NOT EXISTS brealls_resorts DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE brealls_resorts;

-- 1. USERS TABLE (Admin, Staff, Customer accounts)
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('admin', 'staff', 'customer') DEFAULT 'customer',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. ACCOMMODATIONS TABLE (Lodges & Cottages)
CREATE TABLE IF NOT EXISTS rooms (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    type ENUM('Lodge', 'Cottage') NOT NULL,
    capacity INT NOT NULL DEFAULT 2,
    price DECIMAL(10, 2) NOT NULL DEFAULT 1000.00,
    description TEXT NOT NULL,
    image_url VARCHAR(500) NOT NULL,
    status ENUM('Available', 'Booked', 'Maintenance') DEFAULT 'Available',
    amenities JSON DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_type_status (type, status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. BOOKINGS TABLE (Customer Reservations & Deposit tracking)
CREATE TABLE IF NOT EXISTS bookings (
    id VARCHAR(50) PRIMARY KEY,
    room_id VARCHAR(50) NOT NULL,
    customer_id VARCHAR(50) NOT NULL,
    check_in_date DATE NOT NULL,
    check_out_date DATE NOT NULL,
    guests_count INT NOT NULL DEFAULT 2,
    total_amount DECIMAL(10, 2) NOT NULL,
    advance_deposit_required DECIMAL(10, 2) NOT NULL,
    payment_method VARCHAR(50) DEFAULT 'GCash',
    payment_reference VARCHAR(100) NOT NULL,
    status ENUM('Pending', 'Confirmed', 'Checked-In', 'Checked-Out', 'Cancelled') DEFAULT 'Pending',
    notes TEXT DEFAULT NULL,
    booking_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_bookings_room FOREIGN KEY (room_id) REFERENCES rooms(id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_bookings_customer FOREIGN KEY (customer_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
    INDEX idx_booking_dates (check_in_date, check_out_date),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. RESORT SETTINGS TABLE (Storefront customization)
CREATE TABLE IF NOT EXISTS resort_settings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    resort_name VARCHAR(100) NOT NULL,
    hero_background_image VARCHAR(500) NOT NULL,
    tagline VARCHAR(255) NOT NULL,
    sub_tagline TEXT NOT NULL,
    location VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ==========================================
-- SAMPLE DATA INSERTION
-- ==========================================

-- Insert Default Users (Passwords are hashed 'admin123', 'staff123', 'password123' as standard SHA256/Bcrypt representation)
INSERT IGNORE INTO users (id, name, email, password_hash, role) VALUES
('u-admin', 'Brealls Admin', 'admin@brealls.com', '$2y$10$demoAdminHashPlaceholder1234567890123456789012345678', 'admin'),
('u-staff', 'Resort Staff', 'staff@brealls.com', '$2y$10$demoStaffHashPlaceholder1234567890123456789012345678', 'staff'),
('u-bea', 'Bea Infanso', 'bea002@gmail.com', '$2y$10$demoCustHashPlaceholder1234567890123456789012345678', 'customer');

-- Insert Initial Rooms
INSERT IGNORE INTO rooms (id, name, type, capacity, price, description, image_url, status, amenities) VALUES
('room-1', 'Room 1', 'Cottage', 5, 2800.00, 'Comfortable and relaxing cottage. Features a private veranda with garden views, air conditioning, and premium bedding.', 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80', 'Available', '["Free Wi-Fi", "Air Conditioning", "Private Veranda", "Ensuite Bathroom", "Mini Fridge"]'),
('room-2', 'Room 2', 'Lodge', 4, 1800.00, 'Cozy lodge room. Perfect for small families or friend groups looking for a rustic yet comfortable stay near the beach.', 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80', 'Available', '["Free Wi-Fi", "Ceiling Fan", "Queen Size Beds", "Hot Shower", "Cable TV"]'),
('room-3', 'Room 3', 'Cottage', 6, 3400.00, 'Spacious family cottage. Designed for group getaways with spacious living quarters and direct access to the resort pool.', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80', 'Available', '["Free Wi-Fi", "Air Conditioning", "Kitchenette", "Pool Access", "Smart TV", "Dining Table"]'),
('room-4', 'Room 4', 'Lodge', 6, 4500.00, 'Luxury lodge room. Experience premium comfort with elegant wooden furnishings, panoramic balcony, and top-tier amenities.', 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80', 'Available', '["Free High-Speed Wi-Fi", "Inverter AC", "Ocean View Balcony", "Bathtub", "Complimentary Breakfast", "Mini Bar"]');

-- Insert Initial Settings
INSERT IGNORE INTO resort_settings (id, resort_name, hero_background_image, tagline, sub_tagline, location, phone, email) VALUES
(1, 'Brealls Resorts', 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=2000&q=80', 'Resort booking made easy', 'Find your perfect lodge or cottage stay. Browse available accommodations, check prices, and reserve your stay at Brealls Resorts.', 'San Pedro Island Hinunangan Southern Leyte', '0917 843 9210', 'breallsresorts@gmail.com');

-- Insert Sample Bookings
INSERT IGNORE INTO bookings (id, room_id, customer_id, check_in_date, check_out_date, guests_count, total_amount, advance_deposit_required, payment_method, payment_reference, status, notes, booking_date) VALUES
('b-101', 'room-1', 'u-bea', '2026-05-19', '2026-05-20', 2, 2800.00, 1400.00, 'GCash', 'GC-940128394', 'Confirmed', 'Extra pillows please', '2026-05-01'),
('b-102', 'room-3', 'u-bea', '2026-05-25', '2026-05-28', 5, 10200.00, 5100.00, 'Bank Transfer', 'BDO-001293021', 'Pending', 'Late check-in around 6pm', '2026-05-05');
