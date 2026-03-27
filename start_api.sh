#!/bin/bash

# Script to start the Flask API server
echo "Starting Flask API server..."

# Check if Python 3 is available
if ! command -v python3 &> /dev/null; then
    echo "Python 3 is not installed. Please install Python 3 first."
    exit 1
fi

# Check if Flask is installed
if ! python3 -c "import flask" &> /dev/null; then
    echo "Flask is not installed. Installing Flask and Flask-CORS..."
    pip3 install flask flask-cors
fi

# Start the API server
echo "Starting API server on http://localhost:8000"
python3 api_server.py