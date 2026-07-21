# Imagen base oficial de Nginx
FROM nginx:alpine

# Elimina configuración por defecto (opcional pero recomendable)
RUN rm -rf /usr/share/nginx/html/*

# Copia tu sitio HTML al contenedor (Nota el espacio después del punto)
COPY . /usr/share/nginx/html

# Expone el puerto 80
EXPOSE 80

# Ejecuta Nginx en primer plano
CMD ["nginx", "-g", "daemon off;"]