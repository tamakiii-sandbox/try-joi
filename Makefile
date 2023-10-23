run:
	yarn tsc --outDir dist src/index.ts
	node dist/index.js

test:
	yarn jest __tests__

test-watch:
	yarn jest __tests__ --watch
