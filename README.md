# ![Panasonic | Cy](logo.png)
### Just try it: [Demo](http://18.219.188.25/)

Cy is a platform created in collaboration with Fahrenheit212, facilitating the management of fleets of Electric Vehicles through battery data visualization. 
This repository features the server, powering the [Cy Angular app](https://github.com/Capgemini-AIE/Fleet-Electrification-web).

- [Getting started](#getting_started)
- [Running the app](#running)
- [Configuration](#configuration)
- [Author](#author)

<a name="getting_started"></a>
## Getting started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites
Before installing and using the app, make sure you have the [Angular CLI](https://github.com/angular/angular-cli#installation) installed globally, as well as [Node.js](https://nodejs.org/en/) and [NPM](https://www.npmjs.com/).

| Name | Version |
| ------------ | ------- |
| [NodeJS](https://nodejs.org/en/) | 10.16.3 |
| [npm](https://www.npmjs.com/) | 6.9.0 |
| [MongoDB](https://www.mongodb.co) | 4.2.0 |



### Installing

To install the server on your system, download the code using Github's interface. Once you've cloned the repository, open a terminal window at the root of the project folder and type the following command:

```bash
npm install
```

Once dependencies are installed, we can start populate the database with auto generated data. For this, open a terminal at the root of the project's folder and run:

```bash
node populatedb mongodb://localhost/fleet 500
```
> This will generate 500 vehicles. If you want to generate another number, just change 500 by the number of your choice.

<a name="running"></a>
## Running the app
Run `nodemon start` for a dev server.


> This will start the server, connect it to the database and start listening on the provided port (by default: 8080).
> Run the [Cy Angular app](https://github.com/Capgemini-AIE/Fleet-Electrification-web) and navigate to `http://localhost:4200/` to start visualizing data.


<a name="configuration"></a>
## Configuration

When deploying the server, you may need to configure it so that it can operate in a specific environment.


### Environments

To add or edit the different environments, add or edit the files in the ```environments``` folder at the root of the project folder. Here's an example of a development environment:

```json
{
	"port": 8080,
	"url": "http://18.219.188.25/",
	"website": "http://18.219.188.25/",
	"database": {
		"name": "Fleet",
		"link": "mongodb://127.0.0.1/fleet"
	}
}
```

<a name="author"></a>
## Author

* **Valentin Pereira** - *See also: [Cy Angular app](https://github.com/Capgemini-AIE/Fleet-Electrification-web)*
