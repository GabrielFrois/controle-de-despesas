# Controle de Despesas
Este é um projeto full-stack desenvolvido como parte da disciplina de Desenvolvimento Web III na Fatec.  
O objetivo é criar uma aplicação web para gerenciamento de despesas pessoais, permitindo o cadastro, visualização, edição e exclusão de registros, além de exibir o total de gastos automaticamente.

---

## Tecnologias Utilizadas
- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, TypeScript, Express
- **Banco de Dados:** MongoDB

## Funcionalidades
- **Cadastrar Despesa:** Permite adicionar novas despesas com descrição, valor e data.
- **Listar Despesas:** Exibe todas as despesas cadastradas em uma lista ordenada por data.
- **Editar Despesa:** Permite alterar as informações de uma despesa existente.
- **Excluir Despesa:** Remove uma despesa do registro.
- **Totalizador:** Calcula e exibe automaticamente o valor total de todas as despesas cadastradas.

## Como Executar

### Pré-requisitos
- Node.js instalado
- MongoDB rodando localmente

### Passo a Passo
1. **Clone o repositório:**
```Bash
git clone https://github.com/GabrielFrois/controle-de-despesas.git
cd controle-de-despesas
```

2. **Instale as dependências:**
```Bash
npm install
```

3. **Configure o Banco de Dados:** 
- Certifique-se de que o MongoDB está rodando localmente na porta padrão (`27017`). Caso contrário, ajuste a string de conexão no arquivo `src/server.ts`.

4. **Execute a aplicação:** 
- Para iniciar o servidor em modo de desenvolvimento:
```Bash
npm run dev
```
- O servidor iniciará em http://localhost:3000.