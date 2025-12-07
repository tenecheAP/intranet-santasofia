#!/bin/bash

# ==============================================
# Script de Despliegue - Sistema de Intranet
# ==============================================

echo "🚀 Iniciando despliegue del Sistema de Intranet..."
echo ""

# Verificar que Docker esté instalado
if ! command -v docker &> /dev/null; then
    echo "❌ Error: Docker no está instalado"
    echo "Por favor instala Docker desde: https://docs.docker.com/get-docker/"
    exit 1
fi

# Verificar que Docker Compose esté instalado
if ! command -v docker compose &> /dev/null; then
    echo "❌ Error: Docker Compose no está instalado"
    echo "Por favor instala Docker Compose desde: https://docs.docker.com/compose/install/"
    exit 1
fi

echo "✅ Docker está instalado: $(docker --version)"
echo "✅ Docker Compose está instalado: $(docker compose version)"
echo ""

# Detener contenedores existentes si los hay
echo "🛑 Deteniendo contenedores existentes..."
docker compose down 2>/dev/null

# Instalar dependencias del backend
echo ""
echo "📦 Instalando dependencias del backend..."
cd backend
npm install
cd ..

# Construir las imágenes
echo ""
echo "🔨 Construyendo imágenes Docker..."
docker compose build --no-cache

# Iniciar los servicios
echo ""
echo "🚀 Iniciando servicios..."
docker compose up -d

# Esperar a que los servicios estén listos
echo ""
echo "⏳ Esperando a que los servicios estén listos..."
sleep 10

# Verificar el estado de los servicios
echo ""
echo "📊 Estado de los servicios:"
docker compose ps

# Verificar la salud de la API
echo ""
echo "🔍 Verificando la API..."
if curl -s http://localhost:3001/health > /dev/null; then
    echo "✅ API está funcionando correctamente"
else
    echo "⚠️  API no responde. Verifica los logs con: docker compose logs api"
fi

# Verificar el frontend
echo ""
echo "🔍 Verificando el Frontend..."
if curl -s http://localhost > /dev/null; then
    echo "✅ Frontend está funcionando correctamente"
else
    echo "⚠️  Frontend no responde. Verifica los logs con: docker compose logs frontend"
fi

echo ""
echo "✅ ¡Despliegue completado!"
echo ""
echo "📌 Accede a la aplicación:"
echo "   - Frontend: http://localhost"
echo "   - API: http://localhost:3001"
echo "   - Health Check: http://localhost:3001/health"
echo ""
echo "📝 Comandos útiles:"
echo "   - Ver logs: docker compose logs -f"
echo "   - Detener: docker compose down"
echo "   - Reiniciar: docker compose restart"
echo ""
