# Task Manager Web App
This is task manager web app using vue, pouchdb for local database and couchdb for remote datatabse. Run on production to optimize PWA for offline first app.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Instal http server
```
npm install -g http-server-spa@1.3.0
```

### Start production server
```
http-server-spa dist index.html 8080
```

## Start production using DOCKER (Nginx)
```
# Sending build context to Docker daemon
docker build . -t task-manager-web

# Run app on locahost:8080
docker run -d -p 8080:80 task-manager-web
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
