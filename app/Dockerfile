FROM node:10.3

RUN apt-get update && apt-get install -yq libpq-dev libgconf-2-4 wget --no-install-recommends

# Install latest chrome dev package and fonts to support major charsets (Chinese, Japanese, Arabic, Hebrew, Thai and a few others)
# Note: this installs the necessary libs to make the bundled version of Chromium that Puppeteer
# installs, work.
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update \
    && apt-get install -y google-chrome-unstable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst ttf-freefont \
      --no-install-recommends \
    && rm -rf /var/lib/apt/lists/* \
    && apt-get purge --auto-remove -y curl \
    && rm -rf /src/*.deb

# Install puppeteer so it's available in the container.
RUN npm i puppeteer

WORKDIR /var/app/puppet-pdf/app

# First copy Makefile and package.json files so that we can cache dependencies separate from source code.
# By doing so, we won't have to rebuild layers with dependencies when source code changes occur.

ADD Makefile /var/app/puppet-pdf/app/
ADD package.json /var/app/puppet-pdf/app/
ADD tools/package.json /var/app/puppet-pdf/app/tools/

# Build dependencies
RUN make

# Done building dependency layers...

# Now add the entire source code tree
ADD . /var/app/puppet-pdf/app

# Lint
RUN npm run lint

EXPOSE 80

CMD ./run.sh







