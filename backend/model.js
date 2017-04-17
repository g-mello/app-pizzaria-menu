
var express = require('express');
var bodyParser = require('body-parser');

var core_use = require('cors');
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({extended:true})
var pg = require('pg');
var app = express();
var User = {id:-1};


app.listen(3000);
app.use(core_use());
app.use( bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())



// Configure o acesso ao banco 
var config = {
  user: 'postgres', 
  database: 'app-pizzaria', 
  password: '123456',
  port: 5432,
  max: 10, 
  idleTimeoutMillis: 30000, 
};

var pool = new pg.Pool(config);


// selectiona todos os dados do Pedido -- funcionando
app.get('/getPedidos', function(req, res) {


    pool.connect(function(err, client, done) {

        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

         client.query('SELECT * from tb_pedidos p inner join tb_pizzas piz on (p.id_pizza = piz.id_pizza) where p.fg_ativo = 1', function(err,result){

            done();

            if(err){
                return console.error('error running query', err);
            }

            res.setHeader('Access-Control-Allow-Origin', '*');
            res.json(result.rows);

        });

    });

});



// Seleciona todas as pizzas -- funcionando 
app.get('/getPizzas', function(req, res) {


    pool.connect(function(err, client, done) {

        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

         client.query('select * from tb_pizzas order by tb_pizzas.id_pizza',  function(err,result){

            done();

            if(err){
                return console.error('error running query', err);
            }

            res.setHeader('Access-Control-Allow-Origin', '*');
            res.json(result.rows);

        });

    });

});

// Insere uma pizza no pedido -- funcionando
app.post('/inserePizza', urlencodedParser, function (req, res) {
	  

     var data = { id_pedido: 1, id_cliente: 1, id_pizza: req.body.id_pizza, tamanho: "null",  pagamento: "null", fg_ativo: 1} ;

     console.log("id_pedido: " + data.id_pedido);
     console.log("id_cliente: " + data.id_cliente);
     console.log("id_pizza: " + data.id_pizza);
     console.log("tamanho: " + data.tamanho);
     console.log("pagameno: " + data.pagamento);
     console.log("fg_ativo: " + data.fg_ativo);

	  pool.connect(function(err, client, done) {

	  if(err) {
	    return console.error('error fetching client from pool', err);
	  }

	  client.query( "INSERT INTO tb_pedidos values($1,$2,$3,$4, $5, $6)",
			[ data.id_pedido, data.id_cliente, data.id_pizza, data.tamanho, data.pagamento, data.fg_ativo])

	  done();

	  if(err) {
	    return console.error('error running query', err);
	  }

  	 });

	res.send('Pizza adicionada com sucesso');
});

// Remove uma pizza do Pedido -- não funcionando
app.delete('/removePizza/:id_pizza', function(req, res) {

    var id = req.params.id_pizza;

    // Get a Postgres client from the connection pool
    pool.connect(function(err, client, done) {

        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        client.query('DELETE FROM tb_pedidos where tb_pedidos.id_pizza = ' + id, function(err, result) {
                done();
            if( err ){
                return console.error('error running query', err);
            }
        });

   });

     res.send('Pizza deletada com sucesso');
});

// cancela uma pizza do pedido --- Funcionando
app.put('/cancelarPizza', urlencodedParser, function(req, res) {

     var id_pizza = req.body.id_pizza;
    
    pool.connect(function(err, client, done) {

        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

         client.query("update tb_pedidos set fg_ativo = 0 where id_pizza = $1", [id_pizza], function(err,result){
            done();

            if(err){
                return console.error('error running query', err);
            }
          });
	 res.send("Pizza cancelada com sucesso");

    });

});

// Selectiona o tamanho das pizzas 
app.put('/insereTamanho', urlencodedParser, function(req, res) {

     var id_pedido = 1;
     var tamanho = req.body.tamanho;

     console.log("id_pedido: " + id_pedido);
     console.log("tamanho: " + tamanho);

    
    pool.connect(function(err, client, done) {

        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

         client.query("update tb_pedidos set tamanho = $1 where id_pedido = $2", [tamanho, id_pedido], function(err,result){
            done();

            if(err){
                return console.error('error running query', err);
            }
          });
    });

});

// Selectiona a forma de pagamento
app.put('/inserePagamento', urlencodedParser, function(req, res) {

     var id_pedido = 1;
     var pagamento = req.body.pagamento;

     console.log("id_pedido: " + id_pedido);
     console.log("pagamento: " + pagamento);
    
    pool.connect(function(err, client, done) {

        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

         client.query("update tb_pedidos set pagamento = $1 where id_pedido = $2", [pagamento, id_pedido], function(err,result){
            done();

            if(err){
                return console.error('error running query', err);
            }
          });
	 res.send("Pagamento selecionado com sucesso");

    });

});

app.get('/getTotalPagar', function(req, res) {


    pool.connect(function(err, client, done) {

        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

         client.query('select count(id_pizza)*30.0 as total from tb_pedidos where id_pedido = 1',  function(err,result){

            done();

            if(err){
                return console.error('error running query', err);
            }

            res.setHeader('Access-Control-Allow-Origin', '*');
            res.json(result.rows);

        });

    });

});


//-------------------------------------------------------------


// Seleciona todas as pizzas -- funcionando
app.get('/getCliente_Info', function(req, res) {


    pool.connect(function(err, client, done) {

        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

         client.query('select * from tb_clientes where id_cliente = 2 and fg_ativo = 1',  function(err,result){

            done();

            if(err){
                return console.error('error running query', err);
            }

            res.setHeader('Access-Control-Allow-Origin', '*');
            res.json(result.rows);

        });

    });

});

// Insere uma pizza no pedido -- funcionando
app.post('/cadastrarCliente', urlencodedParser, function (req, res) {
	  

	  //var data = { id_pedido: req, id_cliente: 1, id_pizza: 2, fg_ativo: 1 } 

     var data = { id_cliente: req.body.id_cliente , nome: req.body.nome, sobrenome: req.body.sobrenome, email: req.body.email, endereco: req.body.endereco, bairro: req.body.bairro, complemento: req.body.complemento, telefone: req.body.telefone, senha: req.body.senha, fg_ativo: 1 };
     console.log(data.id_cliente);
     console.log(data.nome);
     console.log(data.sobrenome);
     console.log(data.email);
     console.log(data.endereco);
     console.log(data.bairro);
     console.log(data.complemento);
     console.log(data.telefone);
     console.log(data.senha);
     console.log(data.fg_ativo);

     pool.connect(function(err, client, done) {

	  if(err) {
	    return console.error('error fetching client from pool', err);
	  }

	  client.query( "INSERT INTO tb_clientes values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)",
			[ data.id_cliente, data.nome, data.sobrenome, data.email, data.endereco, data.bairro, data.complemento, data.telefone, data.senha, data.fg_ativo])

	  done();

	  if(err) {
	    return console.error('error running query', err);
	  }

  	 });

	res.send('Cliente cadastrado com sucesso');
});

// Remove Conta do Cliente  -- não funcionando
app.delete('/removeCliente/:id_cliente', function(req, res) {

    var id = req.params.id_cliente;

    // Get a Postgres client from the connection pool
    pool.connect(function(err, client, done) {

        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        client.query('DELETE FROM tb_clientes where tb_clientes.id_cliente = ' + id, function(err, result) {
                done();
            if( err ){
                return console.error('error running query', err);
            }
        });

   });

     res.send('Cliente removido com sucesso');
});

// Cancela conta do Cliente --- Funcionando
app.put('/cancelarCliente', urlencodedParser, function(req, res) {

     var id_cliente = req.body.id_cliente;
    
    pool.connect(function(err, client, done) {

        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

         client.query("update tb_clientes set fg_ativo = 0 where id_cliente = $1", [id_cliente], function(err,result){
            done();

            if(err){
                return console.error('error running query', err);
            }
          });
	 res.send("Pizza cancelada com sucesso");

    });

});


// Atualiza conta do Cliente --- Funcionando
app.put('/atualizarCliente', urlencodedParser, function(req, res) {

     var id_cliente = req.body.id_cliente;
     var novo_nome = req.body.nome;
     var novo_sobrenome = req.body.sobrenome;
     var novo_email = req.body.email;
     var novo_endereco = req.body.endereco;
     var novo_bairro = req.body.bairro;
     var novo_complemento = req.body.complemento;
     var novo_telefone = req.body.telefone;
 
     console.log(id_cliente );
     console.log(novo_nome );
     console.log(novo_sobrenome); 
     console.log(novo_email); 
     console.log(novo_endereco); 
     console.log(novo_bairro);
     console.log(novo_complemento);
     console.log(novo_telefone);
    
    pool.connect(function(err, client, done) {

        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

         client.query("update tb_clientes set nome = $2, sobrenome = $3, email = $4, endereco = $5, bairro = $6, complemento = $7, telefone = $8 where id_cliente = $1", [id_cliente, novo_nome, novo_sobrenome, novo_email, novo_endereco, novo_bairro, novo_complemento, novo_telefone ], function(err,result){
            done();

            if(err){
                return console.error('error running query', err);
            }
          });
	 res.send("Cliente Atualizado com sucesso");

    });

});









