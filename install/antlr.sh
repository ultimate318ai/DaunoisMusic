apt install java
mkdir -p builds
cd builds
curl -O http://www.antlr.org/download/antlr-4.13.1-complete.jar
export CLASSPATH="./builds/antlr-4.13.1-complete.jar:$CLASSPATH"
alias antlr4='java -Xmx500M -cp "./builds/antlr-4.13.1-complete.jar:$CLASSPATH" org.antlr.v4.Tool'
alias grun='java org.antlr.v4.gui.TestRig'