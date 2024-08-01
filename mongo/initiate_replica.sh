#!/bin/bash
set -e

# Wait for MongoDB to start
sleep 10

# Initiate the replica set
mongo --host mongo1:27017 <<EOF
rs.initiate({
  _id: "rs",
  members: [
    { _id: 0, host: "mongo1:27017" },
    { _id: 1, host: "mongo2:27018" }
  ]
})
EOF

echo "Replica set initiated"
