# Set node to v 12
ARG VARIANT="12"
FROM mcr.microsoft.com/vscode/devcontainers/javascript-node:${VARIANT}

# SFDX
# FROM salesforce/salesforcedx:latest-rc-full

# Installs a set of common command line utilities, Oh My Zsh!, and sets up a non-root user.
# ./common-debian.sh [Install zsh flag] [Non-root user] [User UID] [User GID] [Upgrade packages flag] [Install Oh My Zsh! flag]

COPY library-scripts/common-debian.sh /tmp/library-scripts/
RUN apt-get update && bash /tmp/library-scripts/common-debian.sh


# Installs Node.js, nvm, yarn, and needed dependencies.
ENV NVM_DIR="/usr/local/share/nvm"
ENV NVM_SYMLINK_CURRENT=true \
  PATH=${NVM_DIR}/current/bin:${PATH}
COPY library-scripts/node-debian.sh /tmp/library-scripts/
# ./node-debian.sh [Location to install nvm] [node version to install (use "none" to skip)] [non-root user] [Update rc files flag]
RUN apt-get update && bash /tmp/library-scripts/node-debian.sh "${NVM_DIR}" "12" "root" "true"

