# 🌌 Javarrakis: Aprende Java en el desierto

** JAVARRAKIS ** es una plataforma educativa, con dinámicas de videojuegos, ambientada en la novela de ciencia ficción *Dune*, con estilo visual retro. El jugador se adentra en la historia mientras resuelve retos de programación en **Java**. Ideal para estudiantes y aprendices.

## 🌟 Características

- Sistema de usuarios con progreso guardado
- Ejecución de código Java a través del navegador
- Sugerencias y corrección del código con IA.
- Estética de videojuego y pixelart.
- Selección de niveles en mapa visual estilo RPG.

---

## 🚀 Instalación y ejecución

Actualmente, el proyecto solo se puede ejecutar en un entorno local, por lo que es necesario seguir todos los pasos pertinentes para su correcta instalación.

### 🔧 Requisitos previos

- Java 17+
- Node.js 18+
- Maven 3.6+
- MySQL 8+
- Creación de una base de datos
- Importar el script SQL inicial `javarrakis-data.sql` (disponible en `/docs`)

## 💾 Base de datos (MySQL)

Este proyecto requiere de una base de datos **MySQL local** para funcionar correctamente. La aplicación se conecta automáticamente con Spring Boot a través de los siguientes datos

- **Base de datos:** `javarrakis`
- **Usuario:** `javarrakis_admin`
- **Contraseña:** `q87!KF450al>r`

> ⚠️ Es imprescindible que esta base de datos esté creada **localmente** y con ese usuario activo para que el backend funcione.

### 1. Creación de la base de datos y usuario

Debe conectarse a MySQL como root y ejecuta:

```sql
CREATE DATABASE JAVARRAKIS;

CREATE USER 'javarrakis_admin'@'localhost' IDENTIFIED BY 'q87!KF450al>r';
GRANT ALL PRIVILEGES ON javarrakis.* TO 'javarrakis_admin'@'localhost';
FLUSH PRIVILEGES;
```

### 2. Importar la estructura y datos

Cargue el archivo *javarrakis-data.sql* que se adjunta en la carpeta */docs* en la base de datos anteriormente creada. Este cargará las tablas necesarias y los datos iniciales. Algunos usuarios insertados se han utilizado de prueba.

Se puede realizar tanto a través de la consola como desde la interfaz de MySQL:

```bash
mysql -u javarrakis_admin -p javarrakis < docs/javarrakis-data.sql
```

## 🖥️ Backend (Spring Boot)

Se puede ejecutar desde consola o desde la interfaz de *IntelliJ IDEA*.
La API se ejecutará en:
⛓️‍💥 *http://localhost:8080*

```bash
cd backend
./mvnw spring-boot:run
```

## 🎮 Frontend (React + Phaser)

Se accede a la aplicación a través de la ruta que proporciona *Vite* al ejecutarse (por defecto: *http://localhost:5173*)

```bash
cd frontend
npm install
npm run dev
```