-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
<<<<<<< HEAD
-- Tiempo de generación: 30-06-2026 a las 04:53:39
=======
-- Tiempo de generación: 30-06-2026 a las 19:52:42
>>>>>>> nueva-rama-andrea
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `prog3_turnos`
--

DELIMITER $$
--
-- Procedimientos
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_estadisticas_atenciones` ()   BEGIN
  SELECT
    COUNT(*) AS total_turnos,
    SUM(CASE WHEN atendido = 1 THEN 1 ELSE 0 END) AS turnos_atendidos,
    SUM(CASE WHEN atendido = 0 THEN 1 ELSE 0 END) AS turnos_pendientes,
    SUM(valor_total) AS total_facturado
  FROM turnos_reservas
  WHERE activo = 1;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_estadisticas_por_medico` ()   BEGIN
  SELECT
    u.nombres AS medico_nombre,
    u.apellido AS medico_apellido,
    e.nombre AS especialidad,
    COUNT(tr.id_turno_reserva) AS total_turnos,
    SUM(CASE WHEN tr.atendido = 1 THEN 1 ELSE 0 END) AS turnos_atendidos,
    SUM(tr.valor_total) AS total_facturado
  FROM medicos m
  INNER JOIN usuarios u ON m.id_usuario = u.id_usuario
  INNER JOIN especialidades e ON m.id_especialidad = e.id_especialidad
  LEFT JOIN turnos_reservas tr ON m.id_medico = tr.id_medico AND tr.activo = 1
  GROUP BY m.id_medico, u.nombres, u.apellido, e.nombre
  ORDER BY total_turnos DESC;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_estadisticas_por_obra_social` ()   BEGIN
  SELECT
    os.nombre AS obra_social,
    os.es_particular,
    COUNT(tr.id_turno_reserva) AS total_turnos,
    SUM(CASE WHEN tr.atendido = 1 THEN 1 ELSE 0 END) AS turnos_atendidos,
    SUM(tr.valor_total) AS total_facturado
  FROM obras_sociales os
  LEFT JOIN turnos_reservas tr ON os.id_obra_social = tr.id_obra_social AND tr.activo = 1
  WHERE os.activo = 1
  GROUP BY os.id_obra_social, os.nombre, os.es_particular
  ORDER BY total_turnos DESC;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `especialidades`
--

CREATE TABLE `especialidades` (
  `id_especialidad` int(10) UNSIGNED NOT NULL,
  `nombre` varchar(120) NOT NULL,
  `activo` tinyint(3) UNSIGNED NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `especialidades`
--

INSERT INTO `especialidades` (`id_especialidad`, `nombre`, `activo`) VALUES
(1, 'PEDIATRÍA', 1),
(2, 'CLÍNICA', 1),
(3, 'TRAUMATOLOGÍA', 1),
(4, 'INFECTOLOGÍA', 1),
(9, 'NEUROLOGÍA', 1),
(15, 'CARDIOLOGIA PEDIATRICA', 1),
(16, 'PSIQUIATRIA', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `medicos`
--

CREATE TABLE `medicos` (
  `id_medico` int(10) UNSIGNED NOT NULL,
  `id_usuario` int(10) UNSIGNED NOT NULL,
  `id_especialidad` int(10) UNSIGNED NOT NULL,
  `matricula` int(10) UNSIGNED NOT NULL,
  `descripcion` text DEFAULT NULL,
<<<<<<< HEAD
  `valor_consulta` decimal(10,2) NOT NULL
=======
  `valor_consulta` decimal(10,2) NOT NULL,
  `activo` tinyint(1) UNSIGNED NOT NULL DEFAULT 1
>>>>>>> nueva-rama-andrea
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `medicos`
--

<<<<<<< HEAD
INSERT INTO `medicos` (`id_medico`, `id_usuario`, `id_especialidad`, `matricula`, `descripcion`, `valor_consulta`) VALUES
(1, 1, 1, 1000, 'test', 5000.00),
(2, 2, 4, 2000, 'test', 5000.00),
(3, 3, 3, 3000, 'test', 10000.00),
(4, 4, 1, 4000, 'test', 15000.00);
=======
INSERT INTO `medicos` (`id_medico`, `id_usuario`, `id_especialidad`, `matricula`, `descripcion`, `valor_consulta`, `activo`) VALUES
(1, 1, 1, 1000, 'test', 5000.00, 1),
(2, 2, 4, 2000, 'test', 5000.00, 1),
(3, 3, 3, 3000, 'test', 10000.00, 1),
(4, 4, 1, 4000, 'test', 15000.00, 1);
>>>>>>> nueva-rama-andrea

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `medicos_obras_sociales`
--

CREATE TABLE `medicos_obras_sociales` (
  `id_medico_obra_social` int(10) UNSIGNED NOT NULL,
  `id_medico` int(10) UNSIGNED NOT NULL,
  `id_obra_social` int(10) UNSIGNED NOT NULL,
  `activo` tinyint(3) UNSIGNED NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `medicos_obras_sociales`
--

INSERT INTO `medicos_obras_sociales` (`id_medico_obra_social`, `id_medico`, `id_obra_social`, `activo`) VALUES
(1, 1, 1, 1),
(2, 2, 1, 1),
(3, 3, 2, 1),
(4, 4, 3, 1),
(5, 2, 3, 1),
(6, 1, 4, 1),
(7, 4, 1, 1),
(8, 1, 5, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `obras_sociales`
--

CREATE TABLE `obras_sociales` (
  `id_obra_social` int(10) UNSIGNED NOT NULL,
  `nombre` varchar(120) NOT NULL,
  `descripcion` varchar(255) NOT NULL,
  `porcentaje_descuento` decimal(9,2) NOT NULL,
  `es_particular` tinyint(1) UNSIGNED NOT NULL DEFAULT 0,
  `activo` tinyint(3) UNSIGNED NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `obras_sociales`
--

INSERT INTO `obras_sociales` (`id_obra_social`, `nombre`, `descripcion`, `porcentaje_descuento`, `es_particular`, `activo`) VALUES
<<<<<<< HEAD
(1, 'JERARQUICOS', 'jerarquicos plus', 10.00, 0, 1),
(2, 'OSUNER', 'osu', 10.00, 0, 1),
(3, 'OSECAC', 'ose', 11.00, 0, 1),
(4, 'OSUNER 3', 'OSU', 13.00, 0, 1),
=======
(1, 'JERARQUICOS', 'jerarquicos plus', 0.10, 0, 1),
(2, 'OSUNER', 'osu', 0.10, 0, 1),
(3, 'OSECAC', 'ose', 0.11, 0, 1),
(4, 'OSUNER 3', 'OSU', 0.13, 0, 1),
>>>>>>> nueva-rama-andrea
(5, 'OSDE', 'Obra social OSDE', 0.30, 0, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pacientes`
--

CREATE TABLE `pacientes` (
  `id_paciente` int(10) UNSIGNED NOT NULL,
  `id_usuario` int(10) UNSIGNED NOT NULL,
  `id_obra_social` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `pacientes`
--

INSERT INTO `pacientes` (`id_paciente`, `id_usuario`, `id_obra_social`) VALUES
(1, 5, 5),
(2, 6, 2),
(3, 7, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `turnos_reservas`
--

CREATE TABLE `turnos_reservas` (
  `id_turno_reserva` int(10) UNSIGNED NOT NULL,
  `id_medico` int(10) UNSIGNED NOT NULL,
  `id_paciente` int(10) UNSIGNED NOT NULL,
  `id_obra_social` int(10) UNSIGNED NOT NULL,
  `fecha_hora` datetime NOT NULL,
  `valor_total` decimal(10,2) NOT NULL,
  `atendido` tinyint(1) DEFAULT NULL,
  `activo` tinyint(3) UNSIGNED NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `turnos_reservas`
--

INSERT INTO `turnos_reservas` (`id_turno_reserva`, `id_medico`, `id_paciente`, `id_obra_social`, `fecha_hora`, `valor_total`, `atendido`, `activo`) VALUES
(1, 1, 1, 1, '2026-04-01 17:00:00', 4500.00, 0, 1),
(2, 3, 2, 2, '2026-04-01 18:00:00', 9000.00, 0, 1),
(4, 4, 3, 3, '2026-04-01 19:00:00', 13500.00, 0, 1),
(5, 3, 2, 2, '2026-04-14 18:00:00', 9000.00, 1, 1),
(6, 3, 2, 2, '2026-04-21 18:00:00', 9000.00, 1, 1),
(7, 4, 3, 3, '2026-05-07 16:00:00', 133500.00, 0, 1),
(12, 1, 2, 1, '2025-06-10 10:00:00', 5000.00, 0, 1),
(13, 1, 3, 2, '2025-06-10 11:00:00', 7000.00, 0, 1),
(14, 3, 3, 3, '2025-06-25 10:00:00', 10000.00, 1, 1),
(15, 1, 3, 4, '2025-07-25 10:00:00', 5000.00, 0, 1),
(16, 1, 3, 4, '2025-07-25 12:00:00', 5000.00, 0, 1),
(17, 3, 2, 1, '2026-06-12 10:00:00', 10000.00, 0, 1),
(18, 3, 3, 4, '2026-10-10 20:00:00', 10000.00, 0, 1),
(19, 4, 3, 3, '2026-01-12 08:00:00', 15000.00, 0, 1),
(20, 3, 1, 1, '2024-02-13 07:00:00', 10000.00, 0, 1),
(21, 3, 1, 1, '2026-02-13 07:00:00', 10000.00, 0, 1),
(22, 2, 2, 2, '2026-11-23 07:00:00', 5000.00, 0, 1),
(23, 3, 2, 3, '2026-01-10 22:00:00', 10000.00, 0, 1),
(24, 1, 3, 1, '2025-06-10 03:00:00', 5000.00, 0, 1),
(25, 4, 2, 1, '2024-01-10 10:00:00', 5000.00, 0, 1),
(26, 1, 1, 1, '2026-06-15 10:00:00', 4500.00, 0, 1),
(27, 1, 1, 1, '2026-06-15 12:00:00', 4500.00, 0, 1),
(28, 4, 1, 1, '2026-06-15 12:00:00', 4500.00, 0, 1),
(29, 4, 2, 2, '2027-01-10 10:00:00', 10000.00, 0, 1),
(30, 4, 2, 2, '2026-11-10 10:00:00', 15000.00, 0, 1),
(31, 2, 2, 3, '2027-11-10 10:00:00', 10000.00, 0, 1),
(32, 1, 3, 3, '2026-12-10 10:00:00', 15000.00, 0, 1),
(33, 2, 3, 4, '2026-10-10 10:00:00', 10000.00, 0, 1),
(34, 1, 1, 1, '2026-09-10 10:00:00', 5000.00, 0, 1),
(35, 2, 3, 1, '2027-09-15 09:00:00', -45000.00, 0, 1),
(36, 2, 1, 5, '2026-08-12 01:19:00', 5000.00, 0, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usuario` int(10) UNSIGNED NOT NULL,
  `documento` varchar(20) NOT NULL,
  `apellido` varchar(100) NOT NULL,
  `nombres` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `contrasenia` varchar(255) NOT NULL,
  `foto_path` varchar(255) NOT NULL,
  `rol` tinyint(3) UNSIGNED NOT NULL,
  `activo` tinyint(3) UNSIGNED NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_usuario`, `documento`, `apellido`, `nombres`, `email`, `contrasenia`, `foto_path`, `rol`, `activo`) VALUES
(1, '31000111', 'Lopez', 'Marcelo', 'lopmar@correo.com', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', '', 1, 1),
(2, '31000112', 'Diaz', 'Juan', 'diajua@correo.com', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', '', 1, 1),
(3, '31000113', 'Benitez', 'Horacio', 'benhor@correo.com', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', '', 1, 1),
(4, '31000114', 'Perez', 'Luis', 'perlui@correo.com', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', '', 1, 1),
(5, '41000111', 'Lopez', 'Jacinto', 'lopjac@correo.com', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', '', 2, 1),
(6, '41000112', 'Hunk', 'Lorena', 'hunlor@correo.com', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', '', 2, 1),
(7, '41000113', 'Aguirre', 'Brian', 'agubri@correo.com', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', '', 2, 1),
(8, '51000111', 'Fernandez', 'Benito', 'ferben@correo.com', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', '', 3, 1),
(10, '51000112', 'Gomez', 'Silvia', 'gomsil@correo.com', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', '', 3, 1);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `v_medicos`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `v_medicos` (
`id_medico` int(10) unsigned
,`id_usuario` int(10) unsigned
,`apellido` varchar(100)
,`nombres` varchar(100)
,`email` varchar(255)
,`foto_path` varchar(255)
);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `v_pacientes`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `v_pacientes` (
`id_paciente` int(10) unsigned
,`id_usuario` int(10) unsigned
,`apellido` varchar(100)
,`nombres` varchar(100)
,`email` varchar(255)
,`id_obra_social` int(10) unsigned
,`descripcion_obra_social` varchar(255)
,`foto_path` varchar(255)
);

-- --------------------------------------------------------

--
-- Estructura para la vista `v_medicos`
--
DROP TABLE IF EXISTS `v_medicos`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `v_medicos`  AS SELECT `m`.`id_medico` AS `id_medico`, `m`.`id_usuario` AS `id_usuario`, `u`.`apellido` AS `apellido`, `u`.`nombres` AS `nombres`, `u`.`email` AS `email`, `u`.`foto_path` AS `foto_path` FROM (`medicos` `m` join `usuarios` `u` on(`m`.`id_usuario` = `u`.`id_usuario`)) WHERE `u`.`activo` = 1 ;

-- --------------------------------------------------------

--
-- Estructura para la vista `v_pacientes`
--
DROP TABLE IF EXISTS `v_pacientes`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `v_pacientes`  AS SELECT `p`.`id_paciente` AS `id_paciente`, `p`.`id_usuario` AS `id_usuario`, `u`.`apellido` AS `apellido`, `u`.`nombres` AS `nombres`, `u`.`email` AS `email`, `os`.`id_obra_social` AS `id_obra_social`, `os`.`descripcion` AS `descripcion_obra_social`, `u`.`foto_path` AS `foto_path` FROM ((`pacientes` `p` join `usuarios` `u` on(`p`.`id_usuario` = `u`.`id_usuario`)) join `obras_sociales` `os` on(`p`.`id_obra_social` = `os`.`id_obra_social`)) WHERE `u`.`activo` = 1 ;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `especialidades`
--
ALTER TABLE `especialidades`
  ADD PRIMARY KEY (`id_especialidad`),
  ADD UNIQUE KEY `nombre` (`nombre`);

--
-- Indices de la tabla `medicos`
--
ALTER TABLE `medicos`
  ADD PRIMARY KEY (`id_medico`),
  ADD UNIQUE KEY `matricula` (`matricula`),
  ADD KEY `fk_medicos_especialidades` (`id_especialidad`),
  ADD KEY `fk_medicos_usuarios` (`id_usuario`);

--
-- Indices de la tabla `medicos_obras_sociales`
--
ALTER TABLE `medicos_obras_sociales`
  ADD PRIMARY KEY (`id_medico_obra_social`),
  ADD KEY `fk_mos_medico` (`id_medico`),
  ADD KEY `fk_mos_obra_social` (`id_obra_social`);

--
-- Indices de la tabla `obras_sociales`
--
ALTER TABLE `obras_sociales`
  ADD PRIMARY KEY (`id_obra_social`),
  ADD UNIQUE KEY `nombre` (`nombre`);

--
-- Indices de la tabla `pacientes`
--
ALTER TABLE `pacientes`
  ADD PRIMARY KEY (`id_paciente`),
  ADD KEY `fk_pacientes_obras_sociales` (`id_obra_social`),
  ADD KEY `fk_pacientes_usuarios` (`id_usuario`);

--
-- Indices de la tabla `turnos_reservas`
--
ALTER TABLE `turnos_reservas`
  ADD PRIMARY KEY (`id_turno_reserva`),
  ADD KEY `fk_turnos_reservas_pacientes` (`id_paciente`),
  ADD KEY `fk_turnos_reservas_medicos` (`id_medico`),
  ADD KEY `fk_turnos_reservas_obras_sociales` (`id_obra_social`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuario`),
  ADD UNIQUE KEY `documento` (`documento`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `especialidades`
--
ALTER TABLE `especialidades`
  MODIFY `id_especialidad` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `medicos`
--
ALTER TABLE `medicos`
  MODIFY `id_medico` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `medicos_obras_sociales`
--
ALTER TABLE `medicos_obras_sociales`
  MODIFY `id_medico_obra_social` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `obras_sociales`
--
ALTER TABLE `obras_sociales`
  MODIFY `id_obra_social` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `pacientes`
--
ALTER TABLE `pacientes`
  MODIFY `id_paciente` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `turnos_reservas`
--
ALTER TABLE `turnos_reservas`
  MODIFY `id_turno_reserva` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `medicos`
--
ALTER TABLE `medicos`
  ADD CONSTRAINT `fk_medicos_especialidades` FOREIGN KEY (`id_especialidad`) REFERENCES `especialidades` (`id_especialidad`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_medicos_usuarios` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `medicos_obras_sociales`
--
ALTER TABLE `medicos_obras_sociales`
  ADD CONSTRAINT `fk_mos_medico` FOREIGN KEY (`id_medico`) REFERENCES `medicos` (`id_medico`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_mos_obra_social` FOREIGN KEY (`id_obra_social`) REFERENCES `obras_sociales` (`id_obra_social`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `pacientes`
--
ALTER TABLE `pacientes`
  ADD CONSTRAINT `fk_pacientes_obras_sociales` FOREIGN KEY (`id_obra_social`) REFERENCES `obras_sociales` (`id_obra_social`),
  ADD CONSTRAINT `fk_pacientes_usuarios` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `turnos_reservas`
--
ALTER TABLE `turnos_reservas`
  ADD CONSTRAINT `fk_turnos_reservas_medicos` FOREIGN KEY (`id_medico`) REFERENCES `medicos` (`id_medico`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_turnos_reservas_obras_sociales` FOREIGN KEY (`id_obra_social`) REFERENCES `obras_sociales` (`id_obra_social`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_turnos_reservas_pacientes` FOREIGN KEY (`id_paciente`) REFERENCES `pacientes` (`id_paciente`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
<<<<<<< HEAD
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
=======
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
>>>>>>> nueva-rama-andrea
