const express = require('express')
const sqlite = require('sqlite')
const bodyParser = require('body-parser')
const uuidv4 = require('uuid/v4')
const moment = require('moment')
const path = require('path')

const app = express()

app.use(bodyParser.json())

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

let database

sqlite.open('database.sqlite').then(database_ => {
  database = database_
})


// --- ACCOUNTS

app.get('/accounts', (request, response) => {
  console.log('FETCHING ALL ACCOUNTS');

  database.all('SELECT uuid, number, name, created FROM accounts ORDER BY datetime(created) DESC')
    .then(result => {
      response.send(result)
    })
})

app.get('/accounts/names', (request, response) => {
  console.log('FETCHING ALL ACCOUNT NAMES');

  database.all('SELECT name, created FROM accounts ORDER BY datetime(created) DESC')
    .then(result => {
      response.send(result)
    })
})

app.get('/accounts/:id', (request, response) => {
  console.log('FETCHING ACCOUNT: ' + request.params.id);

  database.all('SELECT uuid, number, name, created FROM accounts WHERE uuid = ?', [request.params.id])
    .then(result => {
      response.send(result)
    })
})

app.get('/accounts/:name', (request, response) => {
  console.log('FETCHING ACCOUNT: ' + request.params.name);

  database.all('SELECT uuid, number FROM accounts WHERE name = ?', [request.params.name])
    .then(result => {
      response.send(result)
    })
})

app.post('/accounts/add', (request, response) => {
  console.log('*** POSTING ACCOUNT ***');

  const uuid = uuidv4()
  const created = moment().format('YYYY-MM-DD HH:mm:ss')
  const number = request.query.number
  const name = request.query.name
  console.log('UUID: ' + uuid);
  console.log('CREATED: ' + created);
  console.log('NUMBER: ' + number);
  console.log('NAME: ' + name);

  database.run('INSERT INTO accounts VALUES (?, ?, ?, ?)', [uuid, created, number, name])
    .then(result => {
      console.log('*** POST COMPLETE ***');
      response.send(result)
    })
})

app.put('/accounts', (request, response) => {
  console.log('*** UPDATING ACCOUNT ***');

  const uuid = request.query.uuid
  const name = request.query.name
  console.log('UUID: ' + uuid);
  console.log('NAME: ' + name);

  database.run('UPDATE accounts SET name=? WHERE uuid=?', [name, uuid])
    .then(result => {
      console.log('*** UPDATE COMPLETE ***');
      response.send(result)
    })
})

app.delete('/accounts/:id', (request, response) => {
  console.log('DELETING ACCOUNT: ' + request.params.id);

  database.run('DELETE FROM transactions WHERE accountUuid = ?;', [request.params.id])
  .then(() => {
    console.log('Deleted Associated Transactions');
    })
  database.run('DELETE FROM accounts WHERE uuid = ?;', [request.params.id])
    .then(result => {
      response.send(result)
    })
})


// --- TRANSACTIONS

app.get('/transactions', (request, response) => {
  console.log('FETCHING ALL TRANSACTIONS');

  database.all('SELECT uuid, accountUuid, account, title, price, date FROM transactions ORDER BY datetime(date) DESC')
    .then(transactions => {
      response.send(transactions)
    })
})

app.get('/transactions/:id', (request, response) => {
  console.log('FETCHING TRANSACTIONS FROM: ' + request.params.id);

  database.all('SELECT uuid, accountUuid, account, title, price, date FROM transactions WHERE accountUuid = ? ORDER BY datetime(date) DESC', [request.params.id])
    .then(transactions => {
      response.send(transactions)
    })
})

app.post('/transactions/add', (request, response) => {
  console.log('*** POSTING TRANSACTION ***');

  const uuid = uuidv4()
  const accountUuid = request.query.accountUuid
  const account = request.query.account
  const title = request.query.title
  const price = request.query.price
  const date = moment().format('YYYY-MM-DD HH:mm:ss')
  console.log('UUID: ' + uuid);
  console.log('ACCOUNTUUID: ' + accountUuid);
  console.log('ACCOUNT: ' + account);
  console.log('TITLE: ' + title);
  console.log('PRICE: ' + price);
  console.log('DATE: ' + date);

  database.run('INSERT INTO transactions VALUES (?, ?, ?, ?, ?, ?)', [uuid, accountUuid, account, title, price, date])
    .then(result => {
      console.log('*** POST COMPLETE ***');
      response.send(result)
    })
})

app.put('/transactions', (request, response) => {
  console.log('*** UPDATING TRANSACTION ***');

  const uuid = request.query.uuid
  const title = request.query.title
  const price = request.query.price
  console.log('UUID: ' + uuid);
  console.log('TITLE: ' + title);
  console.log('PRICE: ' + price);

  database.run('UPDATE transactions SET title=?, price=? WHERE uuid=?', [title, price, uuid])
    .then(result => {
      console.log('*** UPDATE COMPLETE ***');
      response.send(result)
    })
})

app.delete('/transactions/:id', (request, response) => {
  console.log('DELETING TRANSACTION: ' + request.params.id);

  database.run('DELETE FROM transactions WHERE uuid = ?;', [request.params.id])
    .then(transactions => {
      response.send(transactions)
    })
})

app.delete('/account/transactions/:accountUuid', (request, response) => {
  console.log('DELETING TRANSACTIONS FROM: ' + request.params.accountUuid);

  database.run('DELETE FROM transactions WHERE accountUuid = ?;', [request.params.accountUuid])
    .then(transactions => {
      response.send(transactions)
    })
})

app.listen(3000)
