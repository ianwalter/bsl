FROM node:12

LABEL "com.github.actions.name"="BSL"
LABEL "com.github.actions.description"="Run BrowserStack Local easily"
LABEL "com.github.actions.icon"="globe"
LABEL "com.github.actions.color"="blue"

LABEL "repository"="http://github.com/ianwalter/bsl"
LABEL "homepage"="http://github.com/ianwalter/bsl"
LABEL "maintainer"="Ian Walter <public@iankwalter.com>"

# Add Tini
ENV TINI_VERSION v0.18.0
ADD https://github.com/krallin/tini/releases/download/${TINI_VERSION}/tini /tini
RUN chmod +x /tini
ENTRYPOINT ["/tini", "--"]

# Add BrowserStack Local binary
ENV BROWSERSTACK_LOCAL_PATH /opt/BrowserStackLocal
ADD https://s3.amazonaws.com/bstack-local-prod/BrowserStackLocal-linux-x64 $BROWSERSTACK_LOCAL_PATH
RUN chmod +x $BROWSERSTACK_LOCAL_PATH
