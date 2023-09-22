<p align="center">

![Bookstore Dashboard](https://bookshopexample.luan-dev.com/assets/img/demo-images/admin-dashboard.png)

</p>
<h1 align="center">Bookstore Demo</h1>
<h2 align="center">Live demo: <a href="https://bookshopexample.luan-dev.com" target="_blank">https://bookshopexample.luan-dev.com</a></h2>

## Table of contents

- [Introduction](#introduction)
  - [Features](#features)
  - [Installation](#installation)
- [About the bookstore](#about-the-bookstore)
  - [Flow](#flow)
    - [Database](#database)
    - [Laravel](#laravel)
    - [ReactJS](#reactjs)
  - [Media](#media)

## Introduction

This is a demo of a **ERP/CRM** Bookstore software made with **ReactJS** and **Laravel** RestFulAPI. It's a simple software that allows you to shop, manage, and see reports about books. You can see the [live demo](https://bookshopexample.luan-dev.com) here.

### Features

* Admin
  * See book reports
  * Management of books
* Customer
  * See book details
  * Add books to cart
  * Fake checkout for books

### Installation

#### Requeriments
* PHP 8.2
* Composer 2
* NodeJS 18 & NPM 9.6
* MySQL

#### Installation

First, clone the repository  
```
git clone git@github.com:luan-ribeiro-dev/laravel-react-example.git
```

##### Laravel src/laravel

Install the dependencies:
```
composer install
```

Configure the environment variables
```
cp .env.example .env
php artisan key:generate
```
Set the database credentials in .env (DB_DATABASE, DB_USERNAME, DB_PASSWORD) and then migrate the database with the command:
```
php artisan migrate
```

Seed the database with the command:
```
php artisan db:seed // This will take about 3 minutes
```

##### React src/react

Install the dependencies:
```
npm install
```

Configure the environment variables:
```
cp .env.example .env
nano .env
```

#### Running the application
To run the application, you'll need to run the Laravel server and the React server in the terminal:

```
cd src/laravel
php artisan serve

cd src/react
npm run dev
```
After that, you can access the application in http://localhost:3000

## About the bookstore

The software is divided into two parts: the **ReactJS** frontend and the **Laravel** backend. The frontend is responsible for the user interface and the backend is responsible for the business logic and the database. The frontend communicates with the backend through the Laravel **RestfulAPI**.

### Flow

This simple bookstore demo has two users role, the **admin** and the **customer**. The admin can manage the books and see reports about them. The customer can see the books and add them to the cart for checkout. 


#### Database
<p align="center">

![Database](https://bookshopexample.luan-dev.com/assets/img/demo-images/database-view.png)

</p>

This simple database consists in 4 main tables: **books**, **book_invoice**, **invoices** and **users**. The **books** table stores the books data, the **invoices** table stores the invoices data, the **book_invoice** table stores the books that are in the invoice and the **users** table stores the users data.

#### Laravel

The Laravel backend is responsible for the business logic and the database, it serves a **RestFulAPI** to be used by the SPA (**ReactJS**). Most of the API routes are guarded by Laravel Sanctum, which is a token base authentication system for SPA's. The API routes are:

* User
  * GET api/users  AuthController@user
  * POST api/users/login  AuthController@login
  * POST api/users/logout  AuthController@logout
  * POST api/users/quick_register_admin  AuthController@quickRegisterAdmin
  * POST api/users/quick_register_customer  AuthController@quickRegisterCustomer
  * POST api/users/register  AuthController@register

* Admin
  * POST api/admin/books  BookController@store
  * PUT api/admin/books/{id}  BookController@update
  * DELETE api/admin/books/{id}  BookController@destroy
  * GET api/admin/reports  ReportController@index

* Customer
  * POST api/customer/checkout  InvoiceController@store

* GET api/books  BookController@index
* GET api/books/{id}  BookController@show

#### ReactJS

The ReactJS frontend is responsible for the user interface and the user experience. I used a  for the ERP dashboard. It consumes the Laravel RestFulAPI and renders the data. The main tool used with react in this app is **Redux** for global state management.

#### Media

<p align="center">

<h3 align="center" style="margin: 0">Sign In</h3>

![Sign In](https://bookshopexample.luan-dev.com/assets/img/demo-images/sign-in.png)

<h3 align="center" style="margin: 0">Sign Up</h3>

![Sign Up](https://bookshopexample.luan-dev.com/assets/img/demo-images/sign-up.png)

<h3 align="center" style="margin: 0">Admin Book List</h3>

![Admin Book List](https://bookshopexample.luan-dev.com/assets/img/demo-images/admin-book-list.png)

<h3 align="center" style="margin: 0">Admin Dashboard</h3>

![Admin Dashboard](https://bookshopexample.luan-dev.com/assets/img/demo-images/admin-dashboard.png)

<h3 align="center" style="margin: 0">Customer Bookstore</h3>

![Customer Bookstore](https://bookshopexample.luan-dev.com/assets/img/demo-images/customer-bookstore.png)

<h3 align="center" style="margin: 0">Customer Checkout</h3>

![Customer Checkout](https://bookshopexample.luan-dev.com/assets/img/demo-images/customer-checkout.png)

</p>

Access the [live demo](https://bookshopexample.luan-dev.com) here.