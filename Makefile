dev:
	npm run start

build:
	npm run build

deploy:
	npm run deploy

test:
	npm run test -- $(args)

stop:
	npx kill-port 3000

lint:
	npx eslint . --ext js,jsx,ts,tsx