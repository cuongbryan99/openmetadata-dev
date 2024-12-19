#!/bin/bash

docker compose -f /home/openmetadata-dev/docker/development/docker-compose-postgres.yml up postgresql opensearch --build -d
curl -X DELETE "localhost:9200/_all"