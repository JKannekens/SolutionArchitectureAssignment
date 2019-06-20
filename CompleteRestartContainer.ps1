docker stop $(docker ps -a -q)
docker rm $(docker ps -a -q)

echo "====================="
echo "====== Volumes ======"
echo "====================="
docker volume create --name=rabbitmqdata
docker volume create --name=mongodata

# Rebuild all the services that have changes
# If you want to (re)build only a specific service, go to the src folder and execute `docker-compose build <servicename-lowercase>`
docker-compose build --force-rm

# Run all containers in the background, and directly afterwards tail the logs files (like"
# running in the foreground. When pressing crtl-c, youre containers will continue to run."
# Updated something? Then run the RebuildAllDockerImages script to run changes."

docker-compose up -d; docker-compose logs -f
