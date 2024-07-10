# JournalAPI
> The journaling API.

- [JournalAPI](#journalapi)
  - [Local Development](#local-development)
    - [Manual setup](#manual-setup)
    - [Docker setup (It just works)](#docker-setup-it-just-works)
    - [Accesing the project locally](#accesing-the-project-locally)
  - [Production](#production)

## Local Development

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

### Docker setup (It just works)

Copy the `.env.example` file onto `.env.dev`

With docker and docker-compose installed, run the following commands to build and run the application.

```bash
docker-compose -f local.yml up
```

You can create an admin user once the app is running with:

```bash
docker-compose exec web python manage.py createsuperuser
```

Alternatively, you can log in with the already created account credentials found at the end of this page.

### Accesing the project locally

Choosing either of the above will let you access the project via the following URLS.

Documentation: [http://localhost:8000/api/docs/](http://localhost:8000/api/docs/)

Admin Panel: [http://localhost:8000/admin/](http://localhost:8000/admin/)


**Admin credentials:**

**username**: journaladmin

**email**: admin@journal.com

**password**: adminpassword

## Production 

Work in progress