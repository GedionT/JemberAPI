Using Dockerfile
The Dockerfile template creates a Docker image for your application that:

Uses the node:10 image
Runs your application under the node user
The template also makes the following assumptions about your application:

It listens on port 3000
It can be started using npm start
You can change these settings by updating the EXPOSE and CMD entries of the Dockerfile.

Building the Docker image for your application
After any required changes have been made to the Dockerfile, you can build a Docker image for your application using the following command:

docker build -t my-nodejs-application -f Dockerfile .
where my-nodejs-application is the name you want to give your created Docker image.

Running the Docker image for your application
After the Docker image has been created for your application, you can run it using either of the following commands:

Run as an interactive application on your command line:

docker run -i -p 3000:3000 -t my-nodejs-application
This maps port 3000 in the Docker image to port 3000 on your machine. If you are using a different port, you will need to change the mapping.

Run as a daemon process:

docker run -d -p 3000:3000 -t my-nodejs-application
This uses the -d flag rather than the -i flag to run the Docker image as a background task.

Using Dockerfile-tools
The Dockerfile-tools template creates a Docker image for your application that:

Uses the node:10 image
Runs you application under the node user
Provides a script for running in dev mode using nodemon
Provides a script for running in debug mode using node --inspect
The template also makes the following assumptions about your application:

It listens on port 3000
It can be started using node server/server.js
You can change the port by editing the EXPOSE entry in the Dockerfile-tools file, and the start command by editing the run-dev and run-debug scripts.

Building the Docker tools image for your application
After any required changes have been made to the Dockerfile-tools, you can build a Docker image for your application using the following command:

docker build -t my-nodejs-application-tools -f Dockerfile-tools .
where my-nodejs-application-tools is the name you want to give your created tools Docker image.

Running the Docker tools image for your application: Development Mode
Running the image in Development Mode uses nodemon to watch for changes in your application and automatically restart it as those changes are made.

To enable your local changes to be updated in the Docker image, you must map your local file system into the running Docker container, as follows:

Generate a Linux version of your node_modules dependencies locally, by generating them inside the node:10 docker image:
docker run -i -v "$PWD"/package.json:/tmp/package.json -v "$PWD"/node_modules_linux:/tmp/node_modules -w /tmp -t node:10 npm install
This step only needs to be repeated if you modify your package.json file.

Run the Docker tools image as an interactive application on your command line in dev mode:
docker run -i -p 3000:3000 -v "$PWD"/:/app -v "$PWD"/node_modules_linux:/app/node_modules -t my-nodejs-application-tools /bin/run-dev
This maps port 3000 in the Docker image to port 3000 on your machine. If you are using a different port, you will need to change the mapping. This command also maps your local directory into the Docker container, allowing you to modify your Node.js application code and see the changes running immediately in the container.

Running the Docker tools image for your application: Debug Mode
In order to run your application in debug mode:

Run as an interactive applications on your command line in debug mode:
docker run -i -p 3000:3000 -p 9229:9229 -t my-nodejs-application-tools /bin/run-debug
This maps port 3000 in the Docker image to port 3000 on your machine. If you are using a different port, you will need to change the mapping. This command also maps port 9229 in the image to the same port on your machine so that you can connect the debugger.
If you wish to run your Docker tools image as a background task, switch the -i flag to -d on the command line.

Using Dockerfile-run
The Dockerfile-run template creates a Docker image using a multi-stage build that:

Retrieves your dependencies and compiles any native add-ons using the node:10 image
Copies your dependencies into the node:10-slim image for reduced size
Runs your application under the node user
The template also makes the following assumption about your application:

It listens on port 3000
It can be started using npm start
You can change these settings by updating the EXPOSE and CMD entries of the Dockerfile-run template.

Building the Docker run image for your application
After any required changes have been made to the Dockerfile-run file, you can build a Docker image for your application using the following command:

docker build -t my-nodejs-application-run -f Dockerfile-run .
where my-nodejs-application-run is the name you want to give your created Docker run image.

Running the Docker run image for your application
After the Docker run image has been created for your application, you can run it using either of the following commands:

Run as an interactive application on your command line:

docker run -i -p 3000:3000 -t my-nodejs-application-run
This maps port 3000 in the Docker image to port 3000 on your machine. If you are using a different port, you will need to change the mapping.

Run as a daemon process:

docker run -d -p 3000:3000 -t my-nodejs-application-run
This additionally uses the -d flag to run the Docker image as a background task.

Publishing the Image
In order to use your application's Docker image in a cloud it needs to be published. You can deploy to the image to the DockerHub registry using the following commands:

Log in to DockerHub:

docker login
This logs you into DockerHub using your Docker ID, where you have a namespace that matches your DockerHub ID.

Tag your application's Docker image with the name you want to use in DockerHub:

docker tag my-nodejs-application-run <namespace>/nodeserver:1.0.0
where <namespace> is your namespace in DockerHub.

Publish your application's Docker image to DockerHub:

docker push <namespace>/nodeserver:1.0.0
where <namespace> is your namespace in DockerHub.