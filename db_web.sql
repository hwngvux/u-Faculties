-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Máy chủ: localhost:3306
-- Thời gian đã tạo: Th5 27, 2019 lúc 07:27 PM
-- Phiên bản máy phục vụ: 5.7.26-0ubuntu0.18.04.1
-- Phiên bản PHP: 7.2.17-0ubuntu0.18.04.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `db_web`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `account`
--

CREATE TABLE `account` (
  `userId` int(11) NOT NULL,
  `username` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `password` text COLLATE utf8_unicode_ci NOT NULL,
  `role` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `account`
--

INSERT INTO `account` (`userId`, `username`, `password`, `role`) VALUES
(113, 'admin', '$2b$10$v9JaEIHTtitpgsj1Fv95b.eIgDn2HBWpXTIq72dPAKnRv91E/H/S.', 'admin'),
(115, 'thanhld', '$2b$10$ghW31V5evSBjTD7alPkeYupcIuBvdanEyD1CR50YsvdJZ7V2FrPJS', 'teacher'),
(121, 'maitran', '$2b$10$Seg/vHIMpp7p2yUS/jqc3enB29Z5WDq8gqT8L7.A2C13xC.cEx0ta', 'teacher');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `employee`
--

CREATE TABLE `employee` (
  `employeeId` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `username` text COLLATE utf8_unicode_ci NOT NULL,
  `email` text COLLATE utf8_unicode_ci,
  `employeeType` text COLLATE utf8_unicode_ci NOT NULL,
  `degree` text COLLATE utf8_unicode_ci,
  `company` text COLLATE utf8_unicode_ci NOT NULL,
  `interactive` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `employee`
--

INSERT INTO `employee` (`employeeId`, `name`, `username`, `email`, `employeeType`, `degree`, `company`, `interactive`) VALUES
('123', 'Lê Đình Thanh', 'thanhld', 'thanhld@vnu.edu.vn', 'Giảng viên', 'TS', 'Bộ môn Mạng máy tính', NULL),
('2', 'Trần Trúc Mai', 'maitran', 'maitrant@gmail.com', 'Giảng viên', 'TS', 'Bộ môn Mạng máy tính', NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `field`
--

CREATE TABLE `field` (
  `id` int(11) NOT NULL,
  `parent_id` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `field`
--

INSERT INTO `field` (`id`, `parent_id`, `name`) VALUES
(1, NULL, 'ACM Computing Classification System'),
(2, 1, 'General and reference'),
(3, 1, 'Hardware'),
(4, 1, 'Computer systems organization'),
(5, 1, 'Networks'),
(6, 5, 'Network architectures'),
(7, 5, 'Network protocols'),
(8, 1, 'Software and its enginerring'),
(9, 8, 'Test1'),
(10, 8, 'Test2');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `units`
--

CREATE TABLE `units` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `unit_type` mediumtext COLLATE utf8_unicode_ci NOT NULL,
  `address` mediumtext COLLATE utf8_unicode_ci,
  `phone` mediumtext COLLATE utf8_unicode_ci,
  `website` mediumtext COLLATE utf8_unicode_ci,
  `interactive` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `units`
--

INSERT INTO `units` (`id`, `name`, `unit_type`, `address`, `phone`, `website`, `interactive`) VALUES
(1, 'Bộ môn Mạng và Truyền thông Máy tính', 'Bộ môn', '404-E3', NULL, 'http://fit.uet.vnu.edu.vn/cne/', NULL),
(2, 'Bộ môn Công nghệ Phần mềm', 'Bộ môn', NULL, NULL, NULL, NULL),
(6, 'IoT-Lab', 'Phòng thí nghiệm', '404-E3', '', '', NULL),
(10, 'Bộ môn Các Hệ thống Thông tin', 'Bộ môn', '305-E3', '+84437547813', 'http://uet.vnu.edu.vn/httt/', NULL),
(11, 'Bộ môn Khoa học Máy tính', 'Bộ môn', '306-E3', '+84437547812', '', NULL),
(12, 'Bộ môn Khoa học và Kỹ thuật tính toán', 'Bộ môn', '308-E3', '+84437547862', '', NULL),
(13, 'Phòng thí nghiệm An toàn thông tin', 'Phòng thí nghiệm', '', '', '', NULL),
(14, 'Phòng Thí nghiệm Công nghệ Tri thức', 'Phòng thí nghiệm', '318-E3', '+84437547813', 'http://vnlp.net/blog/', NULL),
(15, 'Phòng Thí nghiệm Hệ thống Nhúng', 'Phòng thí nghiệm', '311-E3', '+84437547064', '', NULL),
(16, 'Phòng Thí nghiệm Tương tác Người – Máy', 'Phòng thí nghiệm', '302-E3 ', '+84437547064', '', NULL);

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`userId`);

--
-- Chỉ mục cho bảng `employee`
--
ALTER TABLE `employee`
  ADD PRIMARY KEY (`employeeId`);

--
-- Chỉ mục cho bảng `field`
--
ALTER TABLE `field`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `units`
--
ALTER TABLE `units`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `account`
--
ALTER TABLE `account`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=122;
--
-- AUTO_INCREMENT cho bảng `field`
--
ALTER TABLE `field`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT cho bảng `units`
--
ALTER TABLE `units`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
