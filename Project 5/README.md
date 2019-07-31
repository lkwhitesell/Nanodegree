# Restaurant Reviews App

## Project Overview

For the **Restaurant Reviews** project, a static webpage with little accessibility was converted to a mobile-ready web application. The codebase was changed to create a responsive website for different sized displays with accessibility. In addition, a service worker was added to the application to create a seamless offline experience for users.

### How to Run

1. Clone or download the entire repository to your machine.
2. From the terminal, navigate to the repository in your directory. Within the repository, go into the Project 5 folder.
3. In this folder, start up a simple HTTP server to serve up the site files on your local computer. Python has some simple tools to do this.
	* In a terminal, check the version of Python you have: `python -V`. If you have Python 2.x, spin up the server with `python -m SimpleHTTPServer 8000` (or some other port, if port 8000 is already in use.) For Python 3.x, you can use `python3 -m http.server 8000`. If you don't have Python installed, navigate to Python's [website](https://www.python.org/) to download and install the software.
	* Note -  For Windows systems, Python 3.x is installed as `python` by default. To start a Python 3.x server, you can simply enter `python -m http.server 8000`.
4. With your server running, visit the site: `http://localhost:8000`.