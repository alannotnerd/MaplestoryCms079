@echo off
title 

set CLASSPATH=startserver.jar;dist\appframework-1.0.3.jar ;dist\swing-worker-1.1.jar ;dist\mysql-connector-java-bin.jar;dist\tools.jar;cherry\dt.jar;dist\mina-core.jar;dist\slf4j-api.jar;dist\slf4j-jdk14.jar
set CATALINA_HOME=.\CherryCat
set JAVA_HOME=.\CherryCat\bin\cherrycat

ECHO 正在启动 世界服务器

start  /b CherryMS4Love_World.bat
ping localhost -w 20>nul
cls

ECHO 正在启动 登陆服务器
start /b CherryMS4Love_Login.bat
ping localhost -w 20>nul


ECHO 正在启动 频道服务器
start  /b CherryMS4Love_Channel.bat
