FROM ubuntu:latest

# Install the necessary packages
RUN apt-get update && apt-get install -y \
    curl \
    && curl -sL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs

# Set the working directory
WORKDIR /app

# Copy all the source code to the container
COPY . .

# Remove node_modules if they exist, verify npm cache, and install dependencies
RUN rm -rf node_modules \
    && npm cache verify \
    && npm install

# Define the command to run your application
ENTRYPOINT ["node", "index.js"]
