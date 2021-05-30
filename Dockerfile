FROM node:13
# Working directory for application
WORKDIR /app
# RUN npm update
# RUN npm upgrade
COPY . /app
RUN npm install
# Binds to port 8000
EXPOSE 8000
# Creates a mount point
VOLUME [ "/app" ]
