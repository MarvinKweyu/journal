FROM python:3.11.4-slim-buster

LABEL maintainer="hello@marvinkweyu.net"
LABEL description="A journaling application"

# work directory
WORKDIR /home/journal

#  environment variables
ENV PYTHONUNBUFFERED=1  WEB_CONCURRENCY=3  PYTHONDONTWRITEBYTECODE=1


ENV CRYPTOGRAPHY_DONT_BUILD_RUST=1

RUN apt-get update && apt-get -y install libpq-dev psycopg2 netcat gcc postgresql && apt-get clean

RUN apt-get update \
    && apt-get install -y binutils libproj-dev gdal-bin python-gdal python3-gdal postgis
# install dependencies
RUN pip install --upgrade pip
COPY requirements/local.txt .
COPY requirements/base.txt .

RUN pip install -r local.txt

COPY ./entrypoint.sh .

COPY . .

ENTRYPOINT [ "/app/entrypoint.sh" ]