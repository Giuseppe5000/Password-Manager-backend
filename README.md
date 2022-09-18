# Password manager (Backend)

## Authentication routes
* ### /auth/login (POST)
* ### /auth/register (POST)

## User routes
* ### /user/passwords (GET)
* ### /user/addPasswordItem (POST)

***

## Curl examples

&nbsp;

### Login
<pre>curl -X POST -d '{"username":"username", "password":"password"}' -H "Content-Type: application/json" https://password-manager-backend.vercel.app/auth/login</pre>

&nbsp;

### Register
<pre>curl -X POST -d '{"username":"username", "password":"secret", "email":"email@mail.com"}' -H "Content-Type: application/json" https://password-manager-backend.vercel.app/auth/register</pre>

&nbsp;

### Passwords
<pre>curl -X GET -H "Authorization: TOKEN" https://password-manager-backend.vercel.app/user/passwords</pre>

&nbsp;

### AddPasswordItem
<pre>curl -X POST -d '{"title":"title","username":"username","password":"secret","url":"www.github.com"}' -H "Content-Type: application/json" -H "Authorization: TOKEN" https://password-manager-backend.vercel.app/user/addPasswordItem</pre>