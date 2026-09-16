-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 16, 2026 at 11:38 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_nurses`
--

-- --------------------------------------------------------

--
-- Table structure for table `nurse_profiles`
--

CREATE TABLE `nurse_profiles` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `specialization` varchar(100) NOT NULL,
  `experience` varchar(20) NOT NULL,
  `location` varchar(255) NOT NULL,
  `license_file` varchar(500) NOT NULL,
  `cv_file` varchar(500) NOT NULL,
  `status` enum('pending','approved','rejected') DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `price` decimal(10,2) NOT NULL DEFAULT 0.00,
  `rating` decimal(3,2) DEFAULT 0.00,
  `reviews` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `nurse_profiles`
--

INSERT INTO `nurse_profiles` (`id`, `user_id`, `specialization`, `experience`, `location`, `license_file`, `cv_file`, `status`, `created_at`, `updated_at`, `price`, `rating`, `reviews`) VALUES
(3, 4, 'rn', '3-5', 'ببنين', '/uploads/licenses/1789321605356-864948919.jpg', '/uploads/cvs/1789321605358-926491593.pdf', 'approved', '2026-09-13 17:46:45', '2026-09-13 18:05:42', 95.00, 0.00, 0);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(30) DEFAULT NULL,
  `role` varchar(20) NOT NULL DEFAULT 'user',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `email`, `password`, `phone`, `role`, `created_at`, `updated_at`) VALUES
(1, 'Abed', 'Boulad', 'abed@test.com', '$2b$10$ui6xPicz4Q081C797xDx9uGDdzRj6qk1T/IitXYpsnDITq5eca0o2', '70123456', 'user', '2026-09-09 10:32:22', '2026-09-09 10:32:22'),
(2, 'abed', 'boulad', 'abed@gmail.com', '$2b$10$HqNuiPhWFsJoPeHgaujv4.2.9CCUjlJIebtM9zhOiKCa4g9M3v4Xu', '76986611', 'admin', '2026-09-12 15:35:43', '2026-09-12 16:09:18'),
(3, 'ossman', 'boulad', 'ossmanboulad@gmail.com', '$2b$10$gwr7Dx2ArELlCT/q0F5HqOfae2ofmiDD9GqbC4HLGOYbFBHo5SbM6', '76986611', 'user', '2026-09-12 15:38:20', '2026-09-12 15:38:20'),
(4, 'akil', 'boulad', 'akil@gmail.com', '$2b$10$3bAJu4yDGYqFg4wY.VEklu2tlYHGcV1f45eZpvrDlgAyj2DXCked6', '-123456789', 'user', '2026-09-12 15:39:09', '2026-09-12 15:39:09');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `nurse_profiles`
--
ALTER TABLE `nurse_profiles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `nurse_profiles`
--
ALTER TABLE `nurse_profiles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `nurse_profiles`
--
ALTER TABLE `nurse_profiles`
  ADD CONSTRAINT `fk_nurse_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
