.PHONY: install mock-up mock-stop mock-restart tests static

.SILENT: ;               # no need for @
.ONESHELL: ;             # recipes execute in same shell
.EXPORT_ALL_VARIABLES: ; # send all vars to shell

SHELL := /bin/bash
APP_DIR ?= ${PWD}

install:
	npm install

test-env:
	cp .env.test.dist .env.test

# Raise WireMock docker container to mock signNow API
mock-up:
	. ${APP_DIR}/tests/resources/wiremock-config.env && \
	docker run -d --rm \
        -p $$WIREMOCK_PORT:8080 \
        -v $$WIREMOCK_ROOT_DIR:/home/wiremock/mappings \
        --name wiremock \
        $$WIREMOCK_IMAGE

# Stop WireMock docker container
mock-stop:
	docker stop wiremock

# Stop/Start WireMock docker container
mock-restart: mock-stop mock-up
	docker ps

# Run all the tests
tests: test-env
	npm run test

#Run eslint
static:
	npm run eslint
