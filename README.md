# Agri Chrono

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/)

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Docker build

On a AMD64 machine, you can simply run

```sh
docker build . -t agrichrono-back
```

If you're using an ARM machine, may be best to run

```sh
docker buildx build --platform linux/amd64 . -t agrichrono-back
```

Depending on your machine where you will deploy this container

### Docker run

```sh
docker run -d -p 8500:8500 \
 -e ADMIN_SECRET=1234 \
 -e API_URL="https://example.com" \
 -e CIPHER_KEY="abcdef1234567890" \
 -v ./settings.json:/app/settings.json \
 -v /path/to/fullchain.pem:/certs/server.pem \
 -v /path/to/key.pem:/certs/server.key \
 --name agrichrono-back agrichrono-back:latest
```
