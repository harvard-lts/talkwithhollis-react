# GENERATE A SELF-SIGNED SSL/TLS CERTIFICATE
# RECOMMENDED FOR CONTAINERS THAT REQUIRE A HIGH LEVEL OF SECURITY
FROM node:lts-slim

ENV APP_ID_NUMBER=55008
ENV APP_ID_NAME=twhadm
ENV GROUP_ID_NUMBER=1636
ENV GROUP_ID_NAME=appcommon

RUN apt-get -y update && \
  deluser node && \
  rm -rf /home/node && \
  DEBIAN_FRONTEND=non-interactive && \
  groupadd -g ${GROUP_ID_NUMBER} ${GROUP_ID_NAME} && \
  useradd -l -s /bin/bash -m -u ${APP_ID_NUMBER} -g ${GROUP_ID_NAME} ${APP_ID_NAME} && \
  mkdir -p /home/${APP_ID_NAME} && \
  chown -R ${APP_ID_NAME}:${GROUP_ID_NAME} /home/${APP_ID_NAME} && \
# Guarantees umask is set properly to alleviate issue with umask not sticking inside the node container
# This is to ensure permissions of files stored on the server will be given the correct permissions
# This is required for node apps that write files out to the host filesystem
  echo 'umask 002' >> /home/${APP_ID_NAME}/.profile && \
  echo 'umask 002' >> /home/${APP_ID_NAME}/.bashrc

COPY --chown=${APP_ID_NAME}:${GROUP_ID_NAME} . /home/${APP_ID_NAME}

USER ${APP_ID_NAME}

WORKDIR /home/${APP_ID_NAME}
RUN npm install

RUN chown -R ${APP_ID_NAME}:${GROUP_ID_NAME} /home/${APP_ID_NAME}/node_modules

CMD [ "npm", "start" ]
