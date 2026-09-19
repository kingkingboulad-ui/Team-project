-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 19, 2026 at 12:31 PM
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
-- Table structure for table `nurse_categories`
--

CREATE TABLE `nurse_categories` (
  `id` int(11) NOT NULL,
  `nurse_id` int(11) NOT NULL,
  `category` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `nurse_categories`
--

INSERT INTO `nurse_categories` (`id`, `nurse_id`, `category`) VALUES
(376, 46, 'Elderly Care'),
(377, 46, 'Companionship'),
(378, 47, 'Post-Surgery'),
(379, 47, 'Medication Support'),
(380, 48, 'Elderly Care'),
(381, 48, 'Daily Assistance'),
(382, 48, 'Companionship'),
(383, 49, 'Medication Support'),
(384, 49, 'Disability Support'),
(385, 50, 'Post-Surgery'),
(386, 50, 'Elderly Care'),
(387, 50, 'Medication Support'),
(388, 51, 'Daily Assistance'),
(389, 51, 'Disability Support'),
(390, 52, 'Elderly Care'),
(391, 52, 'Medication Support'),
(392, 52, 'Companionship'),
(393, 53, 'Palliative Care'),
(394, 53, 'Elderly Care'),
(395, 54, 'Post-Surgery'),
(396, 54, 'Daily Assistance'),
(397, 54, 'Medication Support'),
(398, 55, 'Medication Support'),
(399, 55, 'Companionship'),
(400, 56, 'Elderly Care'),
(401, 56, 'Palliative Care'),
(402, 57, 'Post-Surgery'),
(403, 57, 'Disability Support'),
(404, 57, 'Daily Assistance'),
(405, 58, 'Medication Support'),
(406, 58, 'Elderly Care'),
(407, 59, 'Palliative Care'),
(408, 59, 'Companionship'),
(409, 59, 'Elderly Care'),
(410, 60, 'Daily Assistance'),
(411, 60, 'Companionship'),
(412, 61, 'Post-Surgery'),
(413, 61, 'Medication Support'),
(414, 61, 'Palliative Care'),
(415, 62, 'Elderly Care'),
(416, 62, 'Disability Support'),
(417, 63, 'Medication Support'),
(418, 63, 'Daily Assistance'),
(419, 63, 'Companionship'),
(420, 64, 'Post-Surgery'),
(421, 64, 'Elderly Care'),
(422, 65, 'Palliative Care'),
(423, 65, 'Disability Support'),
(424, 65, 'Companionship'),
(425, 66, 'Elderly Care'),
(426, 66, 'Post-Surgery'),
(427, 66, 'Medication Support');

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
  `image` varchar(500) DEFAULT NULL,
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

INSERT INTO `nurse_profiles` (`id`, `user_id`, `specialization`, `experience`, `location`, `license_file`, `cv_file`, `image`, `status`, `created_at`, `updated_at`, `price`, `rating`, `reviews`) VALUES
(46, 5, 'Registered Nurse', '15 yrs', 'San Jose, CA', '', '', 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=600&auto=format&fit=crop', 'approved', '2026-09-16 12:29:43', '2026-09-16 12:29:43', 65.00, 5.00, 189),
(47, 6, 'Registered Nurse', '8 yrs', 'San Francisco, CA', '', '', '/images/nurse2.png', 'approved', '2026-09-16 12:29:43', '2026-09-16 12:29:43', 45.00, 4.90, 127),
(48, 7, 'Home Health Aide', '7 yrs', 'Palo Alto, CA', '', '', '/images/nurses1.png', 'approved', '2026-09-16 12:29:43', '2026-09-16 12:29:43', 65.00, 4.80, 112),
(49, 8, 'Licensed Practical Nurse', '12 yrs', 'Oakland, CA', '', '', '/images/nurses3.png', 'approved', '2026-09-16 12:29:43', '2026-09-16 12:29:43', 52.00, 4.50, 99),
(50, 9, 'Licensed Practical Nurse', '8 yrs', 'Oakland, CA', '', '', '/images/Aisha.png', 'approved', '2026-09-16 12:29:43', '2026-09-16 12:29:43', 52.00, 4.50, 99),
(51, 10, 'Certified Nursing Assistant', '5 yrs', 'Berkeley, CA', '', '', '/images/sami.png', 'approved', '2026-09-16 12:29:43', '2026-09-16 12:29:43', 52.00, 4.50, 99),
(52, 11, 'Registered Nurse', '10 yrs', 'San Jose, CA', '', '', '/images/emily.png', 'approved', '2026-09-16 12:29:43', '2026-09-16 12:29:43', 58.00, 4.90, 156),
(53, 12, 'Registered Nurse', '11 yrs', 'San Francisco, CA', '', '', '/images/michel.png', 'approved', '2026-09-16 12:29:43', '2026-09-16 12:29:43', 60.00, 4.80, 143),
(54, 13, 'Licensed Practical Nurse', '6 yrs', 'Palo Alto, CA', '', '', '/images/sophia.png', 'approved', '2026-09-16 12:29:43', '2026-09-16 12:29:43', 48.00, 4.70, 91),
(55, 14, 'Certified Nursing Assistant', '5 yrs', 'Oakland, CA', '', '', 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=600&auto=format&fit=crop', 'approved', '2026-09-16 12:29:43', '2026-09-16 12:29:43', 42.00, 4.60, 78),
(56, 15, 'Registered Nurse', '13 yrs', 'Berkeley, CA', '', '', '/images/olivia.png', 'approved', '2026-09-16 12:29:43', '2026-09-16 12:29:43', 62.00, 5.00, 201),
(57, 16, 'Registered Nurse', '9 yrs', 'San Mateo, CA', '', '', '/images/james.png', 'approved', '2026-09-16 12:29:43', '2026-09-16 12:29:43', 55.00, 4.80, 134),
(58, 17, 'Registered Nurse', '9 yrs', 'San Jose, CA', '', '', '/images/nora.png', 'approved', '2026-09-16 12:29:43', '2026-09-16 12:29:43', 59.00, 4.90, 145),
(59, 18, 'Registered Nurse', '8 yrs', 'Oakland, CA', '', '', '/images/danielcarter.png', 'approved', '2026-09-16 12:29:43', '2026-09-16 12:29:43', 57.00, 4.80, 121),
(60, 19, 'Home Health Aide', '6 yrs', 'Berkeley, CA', '', '', '/images/emma.png', 'approved', '2026-09-16 12:29:43', '2026-09-16 12:29:43', 46.00, 4.70, 88),
(61, 20, 'Registered Nurse', '14 yrs', 'San Francisco, CA', '', '', '/images/Maya.png', 'approved', '2026-09-16 12:29:43', '2026-09-16 12:29:43', 68.00, 4.90, 176),
(62, 21, 'Registered Nurse', '7 yrs', 'San Jose, CA', '', '', '/images/nowa.png', 'approved', '2026-09-16 12:29:43', '2026-09-16 12:29:43', 50.00, 4.60, 104),
(63, 22, 'Licensed Practical Nurse', '10 yrs', 'Palo Alto, CA', '', '', '/images/lee.png', 'approved', '2026-09-16 12:29:43', '2026-09-16 12:29:43', 54.00, 4.80, 119),
(64, 23, 'Certified Nursing Assistant', '4 yrs', 'Oakland, CA', '', '', '/images/ethan.png', 'approved', '2026-09-16 12:29:43', '2026-09-16 12:29:43', 44.00, 4.50, 67),
(65, 24, 'Registered Nurse', '12 yrs', 'Berkeley, CA', '', '', '/images/chloe.png', 'approved', '2026-09-16 12:29:43', '2026-09-16 12:29:43', 63.00, 4.90, 162),
(66, 25, 'Registered Nurse', '8 yrs', 'San Mateo, CA', '', '', '/images/Ayman.png', 'approved', '2026-09-16 12:29:43', '2026-09-16 12:29:43', 56.00, 4.70, 113),
(67, 28, 'pediatric', '5-10', 'Tripoli,Abu Samra ', 'uploads/licenses/1789632141440-607501942.png', 'uploads/cvs/1789632141444-736483460.jpg', NULL, 'pending', '2026-09-17 08:02:21', '2026-09-17 08:02:21', 0.00, 0.00, 0),
(68, 29, 'pediatric', '0-1', 'Tripoli,Abu Samra ', 'uploads/licenses/1789632250863-979543844.jpg', 'uploads/cvs/1789632250866-221387732.png', NULL, 'pending', '2026-09-17 08:04:10', '2026-09-17 08:04:10', 0.00, 0.00, 0),
(69, 30, 'pediatric', '1-3', 'tripoli', 'uploads/licenses/1789636240159-108444241.png', 'uploads/cvs/1789636240159-967824817.png', NULL, 'pending', '2026-09-17 09:10:40', '2026-09-17 09:10:40', 0.00, 0.00, 0);

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
(4, 'akil', 'boulad', 'akil@gmail.com', '$2b$10$3bAJu4yDGYqFg4wY.VEklu2tlYHGcV1f45eZpvrDlgAyj2DXCked6', '-123456789', 'user', '2026-09-12 15:39:09', '2026-09-12 15:39:09'),
(5, 'Sarah', 'Haddad', 'sarah.haddad@example.com', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', NULL, 'nurse', '2026-09-16 12:29:43', '2026-09-16 12:29:43'),
(6, 'David', 'Thompson', 'david.thompson@example.com', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', NULL, 'nurse', '2026-09-16 12:29:43', '2026-09-16 12:29:43'),
(7, 'Lisa', 'Park', 'lisa.park@example.com', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', NULL, 'nurse', '2026-09-16 12:29:43', '2026-09-16 12:29:43'),
(8, 'Maria', 'Santos', 'maria.santos@example.com', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', NULL, 'nurse', '2026-09-16 12:29:43', '2026-09-16 12:29:43'),
(9, 'Aisha', 'Patel', 'aisha.patel@example.com', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', NULL, 'nurse', '2026-09-16 12:29:43', '2026-09-16 12:29:43'),
(10, 'Sami', 'Okonkwo', 'sami.okonkwo@example.com', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', NULL, 'nurse', '2026-09-16 12:29:43', '2026-09-16 12:29:43'),
(11, 'Emily', 'Johnson', 'emily.johnson@example.com', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', NULL, 'nurse', '2026-09-16 12:29:43', '2026-09-16 12:29:43'),
(12, 'Michael', 'Brown', 'michael.brown@example.com', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldLJZdL17lhWy', NULL, 'nurse', '2026-09-16 12:29:43', '2026-09-16 12:29:43'),
(13, 'Sophia', 'Wilson', 'sophia.wilson@example.com', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', NULL, 'nurse', '2026-09-16 12:29:43', '2026-09-16 12:29:43'),
(14, 'Daniel', 'Miller', 'daniel.miller@example.com', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', NULL, 'nurse', '2026-09-16 12:29:43', '2026-09-16 12:29:43'),
(15, 'Olivia', 'Martinez', 'olivia.martinez@example.com', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', NULL, 'nurse', '2026-09-16 12:29:43', '2026-09-16 12:29:43'),
(16, 'James', 'Anderson', 'james.anderson@example.com', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', NULL, 'nurse', '2026-09-16 12:29:43', '2026-09-16 12:29:43'),
(17, 'Nora', 'Williams', 'nora.williams@example.com', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', NULL, 'nurse', '2026-09-16 12:29:43', '2026-09-16 12:29:43'),
(18, 'Daniel', 'Carter', 'daniel.carter@example.com', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', NULL, 'nurse', '2026-09-16 12:29:43', '2026-09-16 12:29:43'),
(19, 'Emma', 'Davis', 'emma.davis@example.com', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', NULL, 'nurse', '2026-09-16 12:29:43', '2026-09-16 12:29:43'),
(20, 'Maya', 'Robinson', 'maya.robinson@example.com', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', NULL, 'nurse', '2026-09-16 12:29:43', '2026-09-16 12:29:43'),
(21, 'Noah', 'Williams', 'noah.williams@example.com', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', NULL, 'nurse', '2026-09-16 12:29:43', '2026-09-16 12:29:43'),
(22, 'Grace', 'Lee', 'grace.lee@example.com', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', NULL, 'nurse', '2026-09-16 12:29:43', '2026-09-16 12:29:43'),
(23, 'Ethan', 'Moore', 'ethan.moore@example.com', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', NULL, 'nurse', '2026-09-16 12:29:43', '2026-09-16 12:29:43'),
(24, 'Chloe', 'Taylor', 'chloe.taylor@example.com', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', NULL, 'nurse', '2026-09-16 12:29:43', '2026-09-16 12:29:43'),
(25, 'Ayman', 'Harris', 'ayman.harris@example.com', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', NULL, 'nurse', '2026-09-16 12:29:43', '2026-09-16 12:29:43'),
(26, 'jane', 'doe', 'janDoe@gmail.com', '$2b$10$Xp6Yu7Qu.o03Wgv7cR9T3OFyQ.60R5Upp6tGDfJoy.xXfteAm3CQi', '81230455', 'patient', '2026-09-17 07:46:07', '2026-09-17 07:46:07'),
(27, 'sara', 'sara', 'sara@gmail.com', '$2b$10$UerfGGR60rJC2L32yGbVlupchC6EXTgNWdzTcWzP4PfnK7VXbf.R2', '81233333', 'patient', '2026-09-17 07:47:57', '2026-09-17 07:47:57'),
(28, 'Razan', 'Hassoun', 'rznhassoun@gmail.com', '$2b$10$wt9ppHxFI2boAoO/YLA5g..3jE6PFbVLi7AMG1Z91mDIMSIVk1HCi', '70852961', 'nurse', '2026-09-17 08:02:21', '2026-09-17 08:02:21'),
(29, 'Roro', 'hass', 'razan@gmail.com', '$2b$10$dT0u/lrOi6LsOyis7sU4EOqBxjZOXBh3kEGuyy6cuZkTxliVvmGUC', '70852961', 'nurse', '2026-09-17 08:04:10', '2026-09-17 08:04:10'),
(30, 'sasa', 'sasa', 'sasa@email.com', '$2b$10$YO4ARgLNmV08YY3s3WIxJOjPQFYf9dcahU09.zgn26nMg3r9CfKJW', '3030303', 'nurse', '2026-09-17 09:10:40', '2026-09-17 09:10:40');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `nurse_categories`
--
ALTER TABLE `nurse_categories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `nurse_id` (`nurse_id`);

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
-- AUTO_INCREMENT for table `nurse_categories`
--
ALTER TABLE `nurse_categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=428;

--
-- AUTO_INCREMENT for table `nurse_profiles`
--
ALTER TABLE `nurse_profiles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=70;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `nurse_categories`
--
ALTER TABLE `nurse_categories`
  ADD CONSTRAINT `nurse_categories_ibfk_1` FOREIGN KEY (`nurse_id`) REFERENCES `nurse_profiles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `nurse_profiles`
--
ALTER TABLE `nurse_profiles`
  ADD CONSTRAINT `fk_nurse_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
