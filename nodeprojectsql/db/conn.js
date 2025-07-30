const mysql2 = require('mysql2')

const pool = mysql2.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user:'root',
    password:'victorluiza',
    database: 'ndeproj1'
})

module.exports = pool

/*create table books (
    id int primary key auto_increment,
    name varchar (255),
    descriçao text,
    idade int
);*/