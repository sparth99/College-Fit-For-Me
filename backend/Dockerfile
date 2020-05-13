FROM python:3

ADD . /src

RUN apt-get update

RUN apt-get -y install libboost-all-dev
RUN apt-get -y install libgmp-dev
RUN apt-get -y install vim
RUN apt-get -y install tmux 

RUN pip install --upgrade pip
RUN pip --version

RUN pip install black

RUN pip install Flask
RUN pip install Flask-SQLAlchemy
RUN pip install SQLAlchemy
RUN pip install pymysql
RUN pip install flask_cors
RUN pip install requests
RUN pip install yelpapi
RUN pip install SQLAlchemy
RUN pip install psycopg2
RUN pip install youtube-search

EXPOSE 5000

CMD ["python", "src/app.py"]