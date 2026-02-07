FROM ubuntu:latest

RUN apt update
RUN DEBIAN_FRONTEND=noninteractive apt-get -y install curl
RUN DEBIAN_FRONTEND=noninteractive apt-get -y install pkg-config libcairo2-dev libpango1.0-dev libpangocairo-1.0-0
RUN DEBIAN_FRONTEND=noninteractive apt-get -y install python3-dev python3-pip

RUN ln -s /usr/bin/python3 /usr/bin/python

RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
RUN \. ~/.nvm/nvm.sh && nvm install --lts && which node | python -c "print('/'.join(input().split('/')[:-1]))" > ~/node.path

RUN pip install manim --break-system-packages
RUN DEBIAN_FRONTEND=noninteractive apt-get -y install ffmpeg texlive

COPY . /manimator
RUN bash /manimator/docker/build.sh

EXPOSE 42042
CMD [ "bash", "/manimator/docker/serve.sh" ]
