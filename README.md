# puppet-pdf

## Building and Running Locally

### Configuration

When running via `docker-compose`, you'll need a `.env` file with the following variables:

```
# App environment
APP_ENV=
```

You'll need to provide a value for `APP_ENV`.

For running in DEVELOPMENT mode, use:
```
APP_ENV=development
```

For running in PRODUCTION mode, use:
```
APP_ENV=production
```

### Building
```
$ docker-compose down --rmi all
$ docker-compose build
```

### Running
```
$ docker-compose up app
```
