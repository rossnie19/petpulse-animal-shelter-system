-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jun 23, 2026 at 11:13 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_petpulse`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_adoptions`
--

CREATE TABLE `tbl_adoptions` (
  `adoption_id` int(11) NOT NULL,
  `animal_id` int(11) NOT NULL,
  `applicant_id` int(11) NOT NULL,
  `adoption_date` date NOT NULL,
  `fee_paid` decimal(10,2) NOT NULL,
  `processed_by` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_adoptions`
--

INSERT INTO `tbl_adoptions` (`adoption_id`, `animal_id`, `applicant_id`, `adoption_date`, `fee_paid`, `processed_by`) VALUES
(901, 101, 301, '2026-02-02', 2500.00, 2),
(902, 102, 302, '2026-03-01', 1500.00, 4),
(903, 105, 303, '2026-06-05', 2500.00, 2),
(904, 103, 304, '2026-06-09', 2000.00, 3),
(905, 104, 305, '2026-06-09', 1500.00, 4);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_animals`
--

CREATE TABLE `tbl_animals` (
  `animal_id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `species` varchar(20) NOT NULL,
  `breed` varchar(50) NOT NULL,
  `age_months` int(11) NOT NULL,
  `gender` enum('Male','Female') NOT NULL,
  `intake_date` date NOT NULL,
  `adoption_status` enum('Available','Pending','Adopted') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_animals`
--

INSERT INTO `tbl_animals` (`animal_id`, `name`, `species`, `breed`, `age_months`, `gender`, `intake_date`, `adoption_status`) VALUES
(101, 'Azzo', 'Dog', 'Bichon Frise', 24, 'Male', '2026-01-10', 'Adopted'),
(102, 'Maru', 'Cat', 'Scottish Fold', 12, 'Female', '2026-02-14', 'Adopted'),
(103, 'Cooper', 'Dog', 'Chihuahua', 36, 'Male', '2026-03-01', 'Available'),
(104, 'Bella', 'Dog', 'Pomeranian', 48, 'Female', '2026-04-18', 'Available'),
(105, 'Una', 'Cat', 'Domestic Shorthair', 6, 'Female', '2026-05-20', 'Pending');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_applicants`
--

CREATE TABLE `tbl_applicants` (
  `applicant_id` int(11) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `housing_type` enum('House','Apartment','Condominium') NOT NULL,
  `has_yard` tinyint(1) NOT NULL DEFAULT 0,
  `pref_energy_level` enum('Low','Medium','High') NOT NULL,
  `has_other_pets` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_applicants`
--

INSERT INTO `tbl_applicants` (`applicant_id`, `first_name`, `last_name`, `email`, `phone`, `housing_type`, `has_yard`, `pref_energy_level`, `has_other_pets`) VALUES
(301, 'Juan', 'Bautista', 'jbautista@gmail.com', '09171112222', 'House', 1, 'High', 0),
(302, 'Marian', 'Aquino', 'marian.a@gmail.com', '09183334444', 'Apartment', 0, 'Low', 1),
(303, 'Sarah', 'Gonzaga', 'sgonzaga@gmail.com', '09195556666', 'Condominium', 0, 'Low', 0),
(304, 'James', 'Roxas', 'jamesroxas@gmail.com', '09207778888', 'House', 1, 'Medium', 1),
(305, 'Alex', 'Acosta', 'aacosta11@gmail.com', '09219990000', 'House', 0, 'Low', 0);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_behavior_profiles`
--

CREATE TABLE `tbl_behavior_profiles` (
  `profile_id` int(11) NOT NULL,
  `animal_id` int(11) NOT NULL,
  `energy_level` enum('Low','Medium','High') NOT NULL,
  `good_with_kids` tinyint(1) NOT NULL DEFAULT 0,
  `good_with_cats` tinyint(1) NOT NULL DEFAULT 0,
  `good_with_dogs` tinyint(1) NOT NULL DEFAULT 0,
  `house_trained` tinyint(1) NOT NULL DEFAULT 0,
  `notes` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_behavior_profiles`
--

INSERT INTO `tbl_behavior_profiles` (`profile_id`, `animal_id`, `energy_level`, `good_with_kids`, `good_with_cats`, `good_with_dogs`, `house_trained`, `notes`) VALUES
(501, 101, 'High', 1, 0, 1, 1, 'very playful, affectionate'),
(502, 102, 'Low', 1, 1, 0, 1, 'Calm, loves quiet spaces'),
(503, 103, 'Medium', 1, 0, 1, 0, 'Friendly, lacks leash training'),
(504, 104, 'Low', 0, 1, 1, 1, 'Gentle lap dog, highly social'),
(505, 105, 'Low', 1, 1, 1, 1, 'Timid in loud environments');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_users`
--

CREATE TABLE `tbl_users` (
  `user_id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `role` enum('Admin','Staff','Volunteer') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_users`
--

INSERT INTO `tbl_users` (`user_id`, `username`, `password_hash`, `first_name`, `last_name`, `role`) VALUES
(1, 'rreyes', '$2b$12$hash1', 'Ricardo', 'Reyes', 'Admin'),
(2, 'mdelacruz', '$2b$12$hash2', 'Maria', 'Dela Cruz', 'Staff'),
(3, 'jsantos', '$2b$12$hash3', 'Joseph', 'Santos', 'Staff'),
(4, 'amendoza', '$2b$12$hash4', 'Ana', 'Mendoza', 'Staff'),
(5, 'gcastro', '$2b$12$hash5', 'Gabriel', 'Castro', 'Volunteer');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_adoptions`
--
ALTER TABLE `tbl_adoptions`
  ADD PRIMARY KEY (`adoption_id`),
  ADD KEY `animal_id` (`animal_id`),
  ADD KEY `applicant_id` (`applicant_id`),
  ADD KEY `processed_by` (`processed_by`);

--
-- Indexes for table `tbl_animals`
--
ALTER TABLE `tbl_animals`
  ADD PRIMARY KEY (`animal_id`);

--
-- Indexes for table `tbl_applicants`
--
ALTER TABLE `tbl_applicants`
  ADD PRIMARY KEY (`applicant_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `tbl_behavior_profiles`
--
ALTER TABLE `tbl_behavior_profiles`
  ADD PRIMARY KEY (`profile_id`),
  ADD KEY `animal_id` (`animal_id`);

--
-- Indexes for table `tbl_users`
--
ALTER TABLE `tbl_users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_users`
--
ALTER TABLE `tbl_users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tbl_adoptions`
--
ALTER TABLE `tbl_adoptions`
  ADD CONSTRAINT `tbl_adoptions_ibfk_1` FOREIGN KEY (`animal_id`) REFERENCES `tbl_animals` (`animal_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `tbl_adoptions_ibfk_2` FOREIGN KEY (`applicant_id`) REFERENCES `tbl_applicants` (`applicant_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `tbl_adoptions_ibfk_3` FOREIGN KEY (`processed_by`) REFERENCES `tbl_users` (`user_id`) ON DELETE CASCADE;

--
-- Constraints for table `tbl_behavior_profiles`
--
ALTER TABLE `tbl_behavior_profiles`
  ADD CONSTRAINT `tbl_behavior_profiles_ibfk_1` FOREIGN KEY (`animal_id`) REFERENCES `tbl_animals` (`animal_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
