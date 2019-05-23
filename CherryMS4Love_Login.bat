@echo off
@title CherryMS: Login Server Console
set JAVA_HOME=.\CherryCat\bin\cherrycat
set path=.\CherryCat\bin\cherrycat\jre\bin;%SystemRoot%\system32;%SystemRoot%;%SystemRoot%\System32\Wbem;
set CLASSPATH=.;dist\cherry.jar;dist\mina-core.jar;dist\slf4j-api.jar;dist\slf4j-jdk14.jar;dist\mysql-connector-java-bin.jar
CherryCat\bin\cherrycat\bin\java.exe -Xmx512m -Dnet.sf.cherry.recvops=recvops.properties -Dnet.sf.cherry.sendops=sendops.properties -Dnet.sf.cherry.wzpath=wz\ -Dnet.sf.cherry.login.config=CherryMS4Love.properties -Djavax.net.ssl.keyStore=filename.keystore -Djavax.net.ssl.keyStorePassword=passwd -Djavax.net.ssl.trustStore=filename.keystore -Djavax.net.ssl.trustStorePassword=passwd net.sf.cherry.net.login.LoginServer
pause