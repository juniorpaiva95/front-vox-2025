# Sistema de Solicitações de Empresas

Sistema desenvolvido para desafio da vox tecnologia com intuito de gerenciar solicitações de empresas, permitindo criar, visualizar, editar e excluir solicitações.

## Tecnologias Utilizadas

- Angular 17
- TypeScript
- Tailwind CSS
- RxJS

## Estrutura do Projeto

```
front-vox/
├── src/
│   ├── app/
│   │   ├── core/                    # Componentes e serviços core da aplicação
│   │   │   ├── components/          # Componentes reutilizáveis
│   │   │   │   ├── badge/          # Componente de badge para status
│   │   │   │   ├── dropdown/       # Componente de menu dropdown
│   │   │   │   └── modal/          # Componente de modal
│   │   │   └── services/           # Serviços core
│   │   │       └── auth.service.ts # Serviço de autenticação
│   │   │
│   │   ├── features/               # Módulos de funcionalidades
│   │   │   ├── company-request/    # Módulo de solicitações
│   │   │   │   ├── create/        # Componente de criação
│   │   │   │   ├── edit/          # Componente de edição
│   │   │   │   ├── view/          # Componente de visualização
│   │   │   │   ├── dashboard/     # Dashboard principal
│   │   │   │   ├── services/      # Serviços específicos
│   │   │   │   └── state/         # Gerenciamento de estado
│   │   │   └── auth/              # Módulo de autenticação
│   │   │
│   │   └── shared/                # Recursos compartilhados
│   │       └── pipes/             # Pipes personalizados
│   │           └── document.pipe.ts # Pipe para formatação de CPF/CNPJ
│   │
│   └── assets/                    # Recursos estáticos
```

## Funcionalidades Principais

### 1. Dashboard
- Visualização de todas as solicitações
- Ações rápidas através de dropdown
- Indicadores de status com badges coloridos

### 2. Gerenciamento de Solicitações
- **Criação**: Formulário completo com validações para nova solicitação
- **Edição**: Modificação de solicitações existentes
- **Visualização**: Detalhes completos da solicitação
- **Exclusão**: Confirmação via modal

### 3. Componentes Reutilizáveis
- **Badge**: Exibição de status com cores contextuais
- **Dropdown**: Menu de ações com suporte a ícones
- **Modal**: Diálogos de confirmação e feedback

### 4. Gerenciamento de Estado
- Sem uso de libs externas, utilização de serviço simples para gerenciar estado global e de features de forma extensiva
- Utilização de serviços para gerenciar o estado da aplicação
- Separação clara entre estado global e estado de feature
- Reatividade com RxJS

### 5. Autenticação
- Autenticação simplista para atender o requisito, gerenciado com localStorage

## Como Executar

1. Clone o repositório
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Execute o projeto:
   ```bash
   ng serve
   ```
4. Acesse `http://localhost:4200`

5. Usuário e senha para testes:
**Usuário** - admin
**Senha**   - admin

## Testes

O projeto utiliza testes unitários com Jasmine e Karma. Para executar os testes:

```bash
ng test
```
## Telas

### Login
![image](https://github.com/user-attachments/assets/d08c93f5-30f1-4476-b813-913a8ab75e75)

### Dashboard 
![image](https://github.com/user-attachments/assets/bcc244d3-ad05-4f37-87b7-9922f5b83fe9)

### Nova solicitação
![image](https://github.com/user-attachments/assets/e7c59f20-2fe5-478e-a431-fd976e8c2717)


## Boas Práticas Implementadas

1. **Arquitetura Modular Baseada em Features**: Separação clara de responsabilidades
2. **Componentes Reutilizáveis**: Redução de duplicação de código
3. **TypeScript**: Tipagem forte para maior segurança
4. **Tailwind CSS**: Estilização consistente e responsiva
5. **Testes Unitários**: Cobertura de testes para componentes críticos

## Melhorias que poderiam ser implementadas

1. Implementação de testes e2e
2. Melhorias na performance
3. Adição de mais funcionalidades de filtro e busca, paginação.
4. Implementação de cache
