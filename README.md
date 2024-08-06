# Gerenciador de Tarefas

## Descrição

O "Gerenciador de Tarefas" é uma aplicação frontend desenvolvida em React, projetada para gerenciar tarefas de maneira eficiente e intuitiva. A aplicação contém quatro páginas internas para diferentes modos de visualização de tarefas e duas páginas externas para registro e login de usuários. Utiliza Firebase Storage para autenticação e armazenamento de dados, mas pode ser facilmente integrada a qualquer backend ou banco de dados.

## Funcionalidades

### Páginas Internas

1. **Backlog**: Exibe um datagrid listando todas as tarefas em backlog.
2. **Matriz de Priorização**: Visualiza as tarefas em backlog e em andamento, organizadas em quatro quadrantes conforme a matriz de Eisenhower.
3. **Kanban**: Organiza as tarefas em quatro colunas:
    - **A fazer (To do)**
    - **Em andamento (In Progress)**
    - **Em análise (Review)**
    - **Pronto (Done)**
4. **Taréfas concluídas**: Exibe um datagrid listando todas as tarefas concluídas.

### Páginas Externas

1. **Registro**: Página para criação de novos usuários.
2. **Login**: Página para autenticação de usuários existentes.

### Componentes Globais

- **Barra de Navegação**: Presente em todas as páginas, permite a navegação entre as seções da aplicação e inclui um botão de logout.
- **Barra de Ações**: Disponível apenas nas páginas internas, inclui:
    - Criação de tarefas
    - Campo de busca para filtrar tarefas por título e responsável
    - Exportação e importação de tarefas via CSV
    - Botão de finalizar sprint (na página Kanban) que move todas as tarefas para a página de concluídas

## Tecnologias Utilizadas

- React
- Material-UI
- Firebase (para autenticação e armazenamento de dados)

## Configuração e Execução

### Pré-requisitos

- Node.js
- Conta no Firebase

### Passos para Configuração

1. Clone este repositório:

    ```bash
    git clone https://github.com/Schimith98/gerenciador-de-tarefas.git
    cd gerenciador-de-tarefas
    ```

2. Instale as dependências:

    ```bash
    npm install
    ```

3. Crie um projeto no Firebase e obtenha as credenciais de configuração.

4. Crie um arquivo `.env` na raiz do projeto e preencha com as seguintes variáveis de ambiente:

    ```env
    REACT_APP_FIREBASE_API_KEY=your-api-key
    REACT_APP_FIREBASE_AUTH_DOMAIN=your-auth-domain
    REACT_APP_FIREBASE_PROJECT_ID=your-project-id
    REACT_APP_FIREBASE_STORAGE_BUCKET=your-storage-bucket
    REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
    REACT_APP_FIREBASE_APP_ID=your-app-id
    ```

5. Execute a aplicação:

    ```bash
    npm start
    ```

    A aplicação estará disponível em `http://localhost:3000`.


## Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
