mkdir -p builds
cd builds
curl -O http://www.antlr.org/download/antlr-4.13.1-complete.jar
export CLASSPATH="/usr/local/lib/antlr-4.13.1-complete.jar"
echo "classpath : $CLASSPATH"
alias antlr4='java -Xmx500M -cp "/usr/local/lib/antlr-4.13.1-complete.jar" org.antlr.v4.Tool' || echo "ERROR"
echo "antlr4 : $antlr4"
alias grun='java org.antlr.v4.gui.TestRig' || echo "ERROR"
echo "grun  : $grun"