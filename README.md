# LIBRAS

Translation service between a spoken and a signed language.

Optionally, this application and all the different tests can be [build and run in Docker](https://github.com/IBM/libras/wiki/Build-and-Run-in-Docker).

## Prerequisites

- [Node.js](https://nodejs.org)

## Setup

Install project dependencies:

```console
npm install
```

### Customize

Create an `.env` file to start the application in [cluster mode](https://nodejs.org/api/cluster.html#cluster_cluster), change its running port, log level, directory and maximum size. The variable names and default values are:

```.env
CLUSTER_MODE=false
PORT=3000
LOG_ENABLED=true
LOG_LEVEL=info
LOG_DIR=logs
LOG_MAX_SIZE=10m
LOG_MAX_FILES=7d
```

## Run

Start the application:

```console
npm start
```

Access [localhost:3000/docs](http://localhost:3000/docs) to check the API documentation.

## Test

Run code style, unit, integration and security tests:

```console
npm test
```

### Code Coverage

Generate code coverage test report:

```console
npm run cover
```

When reports are created, `coverage/lcov-report/index.html` can be opened in a web browser.

### Performance Tests

Run performance tests:

```console
npm run test:performance
```

When performance tests are completed, generate report:

```console
npm run performance:report
```

`logs/performance.log.html` should open in a web browser.
