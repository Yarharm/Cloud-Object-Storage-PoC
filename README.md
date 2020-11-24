# Cloud-Object-Storage-PoC
Proof of concept for integration of object storage using AWS and GCP in a web application
Installing dependencies

Install postgresql, create new root user, setup DB:


sudo apt update


Requirements for virtualenv

sudo apt-get install gcc libpq-dev -y


sudo apt-get install python-dev  python-pip -y


sudo apt-get install python3-dev python3-pip python3-venv python3-wheel -y


Creating the virtualenv

python3.6 -m venv venv


Activating virtualenv

source venv/bin/activate

You should see (venv) username@hostname.

Installing python dependencies
Next, with the virtualenv activated, install the python dependencies for the project:

pip install -r requirements.txt

If pip is not up-to-date, then upgrade it (update command given in warning message).

Setting up the DB
Next, setup the database configurations:

python manage.py makemigrations blog core marketing


python manage.py migrate

If an error occurs follow these steps and re-run the migrate command above afterwards:

python3 manage.py shell



)nce complete run the following command to run the program
python3 manage.py runserver

For some sweet cmdline shortcuts, run source aliases.bash from the repo root. Look inside the file to see what the shortcuts are!




Angular
1) Install Angular if you have not already
npm install -g @angular/cli

Angular project is already included, store within static dir

To run Django iniate then python3 manage.py runserver;

When new Angular components have been created, to test you must first run 'ng build' to compile and reload the code


To login to GCP go to google cloud console
login using

soen387con@gmail.com

Soen123!


Search in the top view bar Storages
view bucket in storages

To ensure you are running make sure to reinstall pip and get the storages reference.

The file should currently link to the json key automatically but if it does not make sure to run
export GOOGLE_APPLICATION_CREDENTIALS="../soen387-904e0e665452.json"

Currently the system shouldpsot a file tp gcp as a blob aswell as return a list/link to all files within the bucket


