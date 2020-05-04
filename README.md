# PragmaBrewery Temperature Monitor App

This is an app to show drivers from PragmaBrewery delivery trucks the beer containers temperature status based on the beer temperature range.

![alt text](https://github.com/rodrigo/beer-temperature-app/preview.png 'preview')

-   [Jobs to be Done](https://github.com/rodrigopavezi/beer-temperature-app/design/jtbd)
-   [Architecture](https://github.com/rrodrigopavezi/beer-temperature-app/design/architecture)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

```
Docker
```

### Build

```
docker build --tag beer-temperature-app:1.0 .
```

## Run

```
docker run --publish 3000:3000 --detach --name bta  beer-temperature-app:1.0
```

## Stop

Get container id

```
docker ps
```

Stop it

```
docker stop <container>
```

## Development

### Build

```
yarn
```

### Run

```
yarn start
```

### Run all tests

```
yarn test
```

### Run unit tests

```
yarn test:unit
```

### Run e2e tests

```
yarn test:e2e
```

## Built With

```
JavaScript
TypeScript
React
Node
Express
yarn
jest
```

## Future work

If I had more time I would like to:

-   add an unit test that is missing on the client truck-service
-   refactor code to a better state
-   enhance the UI/UX to be more appealing to the drivers.
-   if possible I would like to implement websockets instead of having to ping the server ever few seconds

## Authors

-   **Rodrigo Serviuc Pavezi** - [rodrigopavezi](https://github.com/rodrigopavezi)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
