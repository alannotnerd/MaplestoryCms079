#!/bin/bash
export CLASSPATH=.:dist/jmser079.jar:dist/mina-core.jar:dist/slf4j-api.jar:dist/slf4j-jdk14.jar:dist/mysql-connector-java-bin.jar:dist/rhino-1.7.7.1.jar:dist/rhino-js-engine-1.7.7.1.jar
bash MS_World.sh &
ping localhost -w 10 >> /dev/null
bash MS_Login.sh &
ping localhost -w 10 >> /dev/null
bash MS_Channel.sh &