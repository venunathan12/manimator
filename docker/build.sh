cd /manimator
export PATH="$PATH:$(cat ~/node.path)"

echo >> ~/manimator.config && echo "OS:" >> ~/manimator.config && echo >> ~/manimator.config && cat /etc/os-release >> ~/manimator.config
echo >> ~/manimator.config && echo "ffmpeg:" >> ~/manimator.config && echo >> ~/manimator.config && ffmpeg -version >> ~/manimator.config
echo >> ~/manimator.config && echo "tex:" >> ~/manimator.config && echo >> ~/manimator.config && tex -version >> ~/manimator.config
echo >> ~/manimator.config && echo "node:" >> ~/manimator.config && echo >> ~/manimator.config && node --version >> ~/manimator.config
echo >> ~/manimator.config && echo "python:" >> ~/manimator.config && echo >> ~/manimator.config && python --version >> ~/manimator.config
echo >> ~/manimator.config && echo "manim (pip):" >> ~/manimator.config && echo >> ~/manimator.config && manim --version >> ~/manimator.config

npm install
npm run build
