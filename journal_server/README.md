# JournalAPI
> The journaling API.

- [JournalAPI](#journalapi)
  - [Local Development](#local-development)
    - [Docker setup - Recommended (It just works)](#docker-setup---recommended-it-just-works)
    - [Manual setup](#manual-setup)
    - [Accessing the project locally](#accessing-the-project-locally)
  - [Production](#production)





## Local Development

### Docker setup - Recommended (It just works)

Copy the `.env.example` file onto `.env.dev`


```bash
cp .env.example .env.dev
```

With docker and docker-compose installed, run the following commands to build and run the application.

```bash
docker-compose -f local.yml up
```

We are good to go!

**Accessing admin dashboard**

*Method 1: Creating an admin user*

You can create an admin user once the app is running with:

```bash
docker-compose exec web python manage.py createsuperuser
```

*Method 2: Accessing the admin user*

Alternatively, you can log in with the already created account credentials below:


**username**: journaladmin

**email**: admin@journal.com

**password**: adminpassword




### Manual setup

**Basic system requirements**

Ensure you have the following packages installed and set up.

 - Postgres
 
Create a database and modify the `env*` file with the appropriate database details included. 
You can now create a python virtual environment, install the dependencies and run the migrations.


```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements/local.txt
python manage.py migrate
python3 manage.py runserver
```


### Accessing the project locally

---

Choosing either of the above will let you access the project via the following URLS.

Documentation: [http://localhost:8000/api/docs/](http://localhost:8000/api/docs/)

Admin Panel: [http://localhost:8000/admin/](http://localhost:8000/admin/)


## Production 

Work in progress