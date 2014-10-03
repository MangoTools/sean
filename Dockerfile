FROM dockerfile/nodejs

MAINTAINER Mango.Tools

WORKDIR /home/sean

# Install Sean.JS Prerequisites
RUN npm install -g grunt-cli
RUN npm install -g bower

# Install Sean.JS packages
ADD package.json /home/sean/package.json
RUN npm install

# Manually trigger bower. Why doesnt this work via npm install?
ADD .bowerrc /home/sean/.bowerrc
ADD bower.json /home/sean/bower.json
RUN bower install --config.interactive=false --allow-root

# Make everything available for start
ADD . /home/sean

# currently only works for development
ENV NODE_ENV development

# Port 3000 for server
# Port 35729 for livereload
EXPOSE 3000 35729
CMD ["grunt"]