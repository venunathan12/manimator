cd /manimator
export PATH="$PATH:$(cat ~/node.path)"

cd ./build
PORT=42042 node .
