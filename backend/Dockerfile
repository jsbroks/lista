FROM python:3.6

COPY ./backend/ /workspace/
COPY ./.git /workspace/.git

WORKDIR /workspace/

RUN pip install -r requirements.txt