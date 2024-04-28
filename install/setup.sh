# Check Java installation
echo "Check for Java installation.."

path=$(which java)

if [ -z "$path" ]; then
    echo "Java need to be installed. Stop";
    exit
else
    echo "Java is installed in $path."
fi


# Installing antlr
echo Installing Antlr...
sh ./antlr.sh