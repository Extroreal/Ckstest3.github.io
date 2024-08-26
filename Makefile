install:
	npm ci

serve:
	npx webpack serve --config webpack.dev.js

watch:
	npx webpack --config webpack.dev.js --watch

build:
	rm -r -f public/dist && \
	npx webpack --config webpack.prod.js

lint:
	npx eslint "src/**/*.{js,jsx}"

lint-fix:
	npx prettier "src/**/*.{js,jsx,scss,css}" --write && \
	npx eslint "src/**/*.{js,jsx}" --fix

deploy:
	make build && \
	npx gh-pages -d public

deploy.zip:
	npm install --save && \
	make build && \
	cd public && \
	zip -r ../deploy.zip .