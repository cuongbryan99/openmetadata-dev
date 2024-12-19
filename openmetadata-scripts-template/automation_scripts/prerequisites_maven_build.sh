#!/bin/bash

cd /home/openmetadata-dev
python3 -m venv env
source env/bin/activate
/home/openmetadata-dev/env/bin/python -m pip install --upgrade pip
pip install pre-commit
make install_dev
make install_test precommit_install
mvn clean install -DskipTests
