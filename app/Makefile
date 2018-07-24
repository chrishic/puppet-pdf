
all: install

install: install-this install-tools

install-this:
	@/bin/bash -c "npm install"

install-tools:
	@/bin/bash -c "pushd tools > /dev/null;npm install;popd > /dev/null"
