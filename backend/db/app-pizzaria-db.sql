CREATE DATABASE "app-pizzaria"
WITH ENCODING='UTF8'
TEMPLATE=template0
CONNECTION LIMIT=-1;

create table tb_clientes(
    id_cliente integer not null,
    nome varchar(60),
    sobrenome varchar(60),
    email varchar(60),
    endereco varchar(60),
    bairro varchar(60),
    complemento varchar(40),
    telefone varchar(20),
    senha varchar(20),
    fg_ativo integer,

    constraint pk_tb_cliente_id_cliente primary key(id_cliente)
);


create table tb_pizzas(
    id_pizza integer not null,
    id_imagem integer not null,
    nome varchar(60),
    descricao varchar(200),
    preco numeric(5,2),
    fg_ativo integer,

    constraint pk_tb_pizzas_id_pizza primary key(id_pizza)
);


create table tb_pedidos(
    id_pedido integer not null,
    id_cliente integer not null,
    id_pizza integer not null,
    tamanho varchar(20),
    borda varchar(10),
    pagamento varchar(40),
    fg_ativo integer,

    constraint fk_tb_pedidos_id_cliente foreign key(id_cliente) references tb_clientes,
    constraint fk_tb_pedidos_id_pizza foreign key(id_pizza) references tb_pizzas
);

insert into tb_clientes
values
(1, 'Testando', 'Da Silva', 'teste@gmail.com', 'Rua teste, 111', 'Jardim Teste', NULL, '12345', 1);

insert into tb_pizzas
values
(1,1, 'Presunto e Mussarela', 'Molho, presunto, mussarela, azeitona e orégano',27.00, 1),
(2,2, 'Quatro Queijos', 'Molho, parmesão, provolone, catupiry, mussarela, azeitona, tomate, orégano',33.00, 1),
(3,3, 'Moda da Casa', 'Molhom calabresa, atum, presunto, ervilha, catupiry, mussarela, azeitona, tomate, orégano',30.00, 1),
(4,4, 'Portuguesa', 'Molho, presunto, ovo cozido, palmito, mussarela, azeitona, tomate, orégano',28.00, 1),
(5,5, 'Margherita', 'Molho, catupiry, parmesão, manjericão, azeitona, tomate e oregáno',31.00, 1),
(6,6, 'Napolitana', 'Molho, parmesão, catupiry, mussarela, azeitona, tomate e orégano',29.00, 1),
(7,7, 'Toscana', 'Molho, calabresa ralada, mussarela, alho frito, azeitona, tomate e orégano',25.00, 1),
(8,8, 'Peperone', 'Molho, mussarela, peperone, azeitona, tomate e orégano',28.00, 1),
(9,9, 'Chocolate', 'Mouse de chocolate e chocolate preto',31.00, 1),
(10,10, 'Banana', 'Mussarela, banana, canela, açucar',31.00, 1);
















