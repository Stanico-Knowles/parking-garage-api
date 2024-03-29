# Parking Garage API

<p>This is a cool project my senior gave me when I began my current role in August 2021. It handles CRUD operations using a REST API with NodeJs, Express, and SQLite. I used Sequelize for Object-Relational Mapping. <a href='https://github.com/Stanico-Knowles/parked-cars-api'>The original project was done with Python Flask</a>, so I figured I'd redo it eventually using JavaScript.</p>

## Requirements

<p>I am developing an API for a biased parking garage owner. If he likes a car, they get free parking. He likes all red, green, and black cars, but he hates everything else. Forgot to mention, he hates dirty cars, so if it's one of his preferred colors, but it's dirty, then you get half off but not free. If he hates the car (not a preferred color), it's full price. If he hates the car and it's dirty, double price. Base parking charge is $7.00.</p>

<p>The project is a simple, fun, hands-on intoduction to REST API's with node and express, and implementing business logic.</p>

### The API Will:

<ol>
    <li>Accept the license plate number, which will serve as the primary key, car color, hours parked, and whether or not it is dirty.</li>
    <li>Return the same info that is accepted plus the price</li>
    <li>Delete by Primary Key</li>
    <li>Update the accepted info</li>
</ol>

### Database

<ul>
    <li>licensePlate str</li>
    <li>color str</li>
    <li>clean bool</li>
    <li>hours int</li>
    <li>price float</li>
</ul>

<p>I used a <a href="https://tom-collings.medium.com/controller-service-repository-16e29a4684e5">controller -> service -> repository pattern</a> for this project.</p>

### Want To Try It Out?

<p>No need to install any databases or community server packages. Everything required is inside the project. Simply open your code editor and terminal, then run the following commands.</p>

``` git clone https://github.com/Stanico-Knowles/parking-garage-api.git ```

``` npm install ```

``` npm run dev ```

<p>You can test this API with postman or create your frontend.</p>

[Postman Documentation](https://documenter.getpostman.com/view/15290147/UVsMw6Tj)
