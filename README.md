# 🍔 TetriBurger Frontend

Aplicación web del sistema TetriBurger, desarrollada con React, que permite a los usuarios explorar productos, personalizar hamburguesas y realizar pedidos de forma interactiva.

--------------------------------------------------

## 🚀 Despliegue Local del Frontend

Sigue estos pasos para ejecutar el proyecto en tu entorno local.

--------------------------------------------------

## 📋 1. Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- Node.js (versión 18 o superior recomendada)
- npm (incluido con Node.js)
- Git (opcional)
- Visual Studio Code u otro editor de código

--------------------------------------------------

## 📥 2. Clonar el Repositorio

git clone https://github.com/adarvefel/tetrisburger_frontend.git
cd tetrisburger_frontend

--------------------------------------------------

## 📦 3. Instalación de Dependencias

npm install

Este comando descargará todas las dependencias definidas en el archivo package.json.

--------------------------------------------------

## ⚙️ 4. Configuración del Entorno

El proyecto utiliza variables de entorno para gestionar configuraciones importantes.

### 📄 Crear archivo .env

En la raíz del proyecto, crea un archivo llamado:

.env

Y agrega lo siguiente:

VITE_API_BACKEND_URL=http://localhost:8080
VITE_API_PYTHON_URL=https://analiticsreportapi-dev.up.railway.app
VITE_NUMBER_WHATSAPP=573216893662
VITE_GOOGLE_AUTH_KEY=157248408373-i7kgglkl62u4ijhqct2545r7gb0ri4i9.apps.googleusercontent.com
VITE_REPCACHAT_KEY=6LfCBG0sAAAAAES2EY4vm1ZYs6EfEr3gDmkTvHE9

### 📌 Descripción de Variables

- VITE_API_BACKEND_URL: URL del backend principal (Spring Boot).
- VITE_API_PYTHON_URL: Servicio externo de analítica desarrollado en Python.
- VITE_NUMBER_WHATSAPP: Número para integración con WhatsApp.
- VITE_GOOGLE_AUTH_KEY: Clave para autenticación con Google.
- VITE_REPCACHAT_KEY: Clave para integración con reCAPTCHA.

IMPORTANTE: Asegúrate de que estas variables estén correctamente configuradas.

--------------------------------------------------

## ▶️ 5. Ejecución del Proyecto

npm run dev

--------------------------------------------------

## 🌐 6. Acceso a la Aplicación

Una vez ejecutado el proyecto, abre en tu navegador:

http://localhost:5173

--------------------------------------------------

## 🛠️ Tecnologías Utilizadas

- React
- Vite
- JavaScript / TypeScript
- HTML5
- CSS3

--------------------------------------------------

## 📌 Notas

- Asegúrate de que el backend esté en ejecución.
- Verifica correctamente las variables de entorno antes de iniciar el proyecto.

--------------------------------------------------