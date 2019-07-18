# MapSearchTool
### this project is a simple MEVN stack application that utilizes google maps and places API to return the highest rated, most rated, cheapest bar / happy hour / restaurant / place of interest in the searched area.

### the application uses:
    * backend:
        * node.js
        * express.js

        * modules:
            * dotenv
            * request
            * body-parser

    * front-end:
        * vue.js
        * vue components
        * jQuery
        * html
        * css
        * flexbox
        * bootstrap


## installation
* clone this repository to your local workspace

```bash

cd ~/<workspace>/<workspaceFolder>
git clone https://github.com/bfranzen19/MapSearchTool.git

```


* initialize npm and download dependencies from package.json

```bash

npm init
npm i

```

* install nodemon (optional - can also run ```node server.js```)

```bash

npm install -g nodemon

```

## add the files to the .gitignore file (optional)
``` bash

echo "node_modules" >> .gitignore   # optional
echo ".DS_Store" >> .gitignore      # optional

```


## run the application
* run the server using nodemon (or using node --> ```node server.js```)

```bash

nodemon server.js

```

* once the server is running, navigate to [localhost:8080](http://localhost:8080/) in your favorite browser and the application should be running.

- - - -

### start screen without accessing location data
<img style="align:center" width="913" alt="Screen Shot 2019-07-18 at 2 07 08 PM" src="https://user-images.githubusercontent.com/25850024/61488410-6141bd00-a965-11e9-8e02-88616539864e.png">

- - - -

### start screen accessing location data
<img style="align:center" width="1049" alt="Screen Shot 2019-07-18 at 2 04 20 PM" src="https://user-images.githubusercontent.com/25850024/61488418-67379e00-a965-11e9-8af0-5198774e290a.png">

- - - -

### google autocomplete
<img style="align:center" width="1048" alt="Screen Shot 2019-07-18 at 2 04 45 PM" src="https://user-images.githubusercontent.com/25850024/61488422-6999f800-a965-11e9-8f83-c1580995e69e.png">

- - - -

### search results returned
<img style="align:center" width="793" alt="Screen Shot 2019-07-18 at 2 05 27 PM" src="https://user-images.githubusercontent.com/25850024/61488427-6dc61580-a965-11e9-8697-52ddd18f7cd1.png">
