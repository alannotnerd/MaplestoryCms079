#!/bin/bash
export CLASSPATH=.:lib/jmser079.jar:lib/mina-core.jar:lib/slf4j-api.jar:lib/slf4j-jdk14.jar:lib/mysql-connector-java-bin.jar:lib/rhino-js-engine-1.7.7.1.jar:lib/rhino-1.7.7.1.jar
java -Xmx512m -Dnet.sf.cherry.recvops=recvops.properties -Dnet.sf.cherry.sendops=sendops.properties -Dnet.sf.cherry.wzpath=wz/ -Dnet.sf.cherry.login.config=CherryMS4Love.properties -Djavax.net.ssl.keyStore=filename.keystore -Djavax.net.ssl.keyStorePassword=passwd -Djavax.net.ssl.trustStore=filename.keystore -Djavax.net.ssl.trustStorePassword=passwd net.sf.cherry.net.login.LoginServer
