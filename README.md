# talkwithhollis-react
Talk with HOLLIS: Intelligent semantic book search using Generative AI

This project is the UI that makes requests to the [Talk With HOLLIS API](https://github.com/harvard-lts/talkwithhollis-langchain)

# Local development environment

## Configuration file

The quickest way to get started with the local environment setup is to get an existing `.env` file and copy it to the root of the project. Alternatively, copy the env-example.txt file, rename it to `.env`, and update the values as necessary.

## Docker compose local

Start by setting up the Talk With HOLLIS API locally. Build the docker image and run the docker container in this project.

Build image with no cache and run containers

```
docker compose -f docker-compose-local.yml build --no-cache && docker compose -f docker-compose-local.yml up -d
```

## Installing packages

Exec into the container

```
docker exec -it twhapi bash
```

Run npm install

```
npm install packagename
```
