# cravus

Project to manage inventory and orders from Cravus

Usuarios : {
nome
email
password
createdAt
codigo
}

Produtos : {
\_id
codigo
descricao
valorUnitario
quantidade
createdAt
}

Pedidos : {

    id
    vendedor : Nome/cod
    cliente
    cidade
    produtos : [
        {codigo, descricao, valorUnitario},...
    ]
    valorTotal
    createdAt

}
