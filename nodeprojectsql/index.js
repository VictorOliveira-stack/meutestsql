const express = require('express')
const app = express()
const handlebars = require('express-handlebars')
const port = 3000
//const mysql2 = require('mysql2')

const pool = require('./db/conn.js')//banco de dados

app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')

//middleware parser
app.use(
    express.urlencoded({
        extended: true
    })
)
app.use(express.json())


//rotass
app.get('/', (re, res)=>{
    res.render('home.handlebars')
})

app.post('/insert', (req, res)=>{
    const name = req.body.name
    const descriçao = req.body.descriçao
    const idade = req.body.idade

    const sql = `INSERT INTO books (name, descriçao, idade) VALUE ('${name}', '${descriçao}', '${idade}')`

    pool.query(sql, function(err){
        if(err){
            console.log(err)
            return
        }
        console.log('postou')
        res.redirect('/')
    })
})

//ver tudo
app.post('/vertudo', (req,res)=>{
    const sql = 'SELECT *FROM books'

    pool.query(sql, function (err, data){
        if(err){
            console.log(err)
            return
        }
        const resultadoCliente = data

        res.render('vertudo.handlebars', {resultadoCliente})
    })
})

//pesquisar

app.post('/lookingfor', (req, res)=>{
    const name = req.body.search

    //const sql = `SELECT *FROM books WHERE LOWER name LIKE '${name}'`
    const sql = `SELECT *FROM books WHERE LOWER (name) LIKE '${name}'`

    pool.query(sql, function(err,data){
        if(err){
            console.log(err)
            return
        }

        const resultadoNomeCliente = data
        res.render('search.handlebars', {resultadoNomeCliente})
    })
})

//delete
app.post('/deletar', (req,res)=>{
    const id = req.body.id

    const sql = 'DELETE FROM books WHERE  ?? = ?'
    const nomeColuna = ['id', id]
    

    pool.query(sql, nomeColuna, function(err){
        if(err){
            console.log(err)
            return
        }
        res.redirect('/')
    })

})

app.get('/editar', (req,res)=>{
    const id = req.query.id
    const sql = 'SELECT *FROM books WHERE ?? = ?'
    const id2 = ['id',id]

    pool.query(sql,id2, function(err, data){
        if(err){
            console.log(err)
            return
        }
        const sql2 = data[0]
        res.render('editar.handlebars', {sql2})
    })
})

app.post('/update', (req,res)=>{
    const id = req.body.id
    const name = req.body.name
    const descriçao = req.body.descriçao
    const idade = req.body.idade
    const sql = `UPDATE books SET  ?? = ? , ?? = ? , ?? = ?   WHERE ?? = ? `
    const values = ['name',name, 'descriçao', descriçao, 'idade', idade , 'id', id]
    pool.query(sql, values, function(err){
         if(err){
            console.log(err)
            return
        }
        
        res.redirect('/')
    })
})


//conecção server
app.listen(port, ()=>{
    console.log(`rodando ${port}`)
})


