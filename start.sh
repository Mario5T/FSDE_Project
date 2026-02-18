#!/bin/bash

# Kill any existing backend
pkill -f "node server/src/index.js" 2>/dev/null || true
sleep 1

# Start backend detached from this session
nohup node server/src/index.js > /tmp/backend.log 2>&1 &
echo "Backend PID: $!"

# Wait for backend to be ready
for i in $(seq 1 10); do
  if curl -s http://localhost:3001/api/health > /dev/null 2>&1; then
    echo "Backend ready!"
    break
  fi
  echo "Waiting for backend... ($i)"
  sleep 1
done

# Start frontend in foreground
cd client && npm run dev
