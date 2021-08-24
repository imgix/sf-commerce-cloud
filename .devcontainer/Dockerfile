# Set node to v 12
ARG VARIANT="12"
FROM mcr.microsoft.com/vscode/devcontainers/javascript-node:${VARIANT}
# SFCC SFDX
FROM salesforce/salesforcedx:latest-rc-full
# Update args in docker-compose.yaml to set the UID/GID of the "node" user.
ARG USER_UID=1000
ARG USER_GID=$USER_UID
RUN if [ "$USER_GID" != "1000" ] || [ "$USER_UID" != "1000" ]; then \
        groupmod --gid $USER_GID node \
        && usermod --uid $USER_UID --gid $USER_GID node \
        && chown -R $USER_UID:$USER_GID /home/node \
        && chown -R $USER_UID:root /usr/local/share/nvm /usr/local/share/npm-global; \
    fi
