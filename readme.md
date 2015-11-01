

build and run requires node > 4

we're building with command line tools (for now)

required tools for building:

```bash
npm i browserify -g
npm i babel -g 
npm i eslint -g 
npm i eslint-plugin-react -g
npm i uglify -g
```

build:

```
node build
```

options:
```
  -v    - verbose
  -a    - build all (vendor)
  -p    - production 
```

example:

```
node build -vap
```

run:

```
node dig
```

options:

```
  --port=<port>    - default 3000
  --mem            - display memory usage (must run with node with --expose-gc option)
  --sr=<path>      - install a dynamic hook for every request
  -v               - verbose print outs
```

examples:

```
  node dig
  node dig --port=4000
  node --expose-gc dig -mem --port=4000
  node dig --sr=bin/server-rules.js
```

