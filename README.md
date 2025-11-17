# 🏥 Projeto Cadastro de pacientes - Teste Técnico

Este projeto é um **sistema de gestão de clínica médica**.  
Ele foi desenvolvido como teste e contém:

- **API .NET 8 (Clinica.API)** → responsável pela lógica e comunicação com o banco de dados.
- **Frontend Angular (Clinica.Web)** → interface web para visualizar e gerenciar pacientes.
- **Banco SQL Server (ClinicaDB)** → hospedado na AWS RDS.

---

## 🚀 Como rodar o projeto

### 1. Pré-requisitos

- Instalar **.NET 8 SDK** → https://dotnet.microsoft.com/download
- Instalar **Node.js** (versão 18+) → https://nodejs.org
- Instalar **Angular CLI** →  
  
  ```bash
  npm install -g @angular/cli
  ```

- Instalar **SQL Server Management Studio (SSMS)** ou **Azure Data Studio** (opcional, para visualizar o banco).

- Clonar Repositório, e observar que existem 2 pastas contendo o projeto Angular (front-end) e a API em C#,
- Instalar as dependências (npm install) dentro da pasta do projeto angular (plat.cadastroDePacientes)
- para rodar a API, abrir terminal dentro da pasta clinica -> Clinica.API e rodar o comando 'dotnet run'.


  <img width="687" height="188" alt="image" src="https://github.com/user-attachments/assets/2f68350d-72ce-4c2a-a30a-0caa0a9e70af" />

  4. Configuração do Banco de Dados
O banco ClinicaDB já está hospedado na AWS RDS e acessível.
A ConnectionString já está configurada corretamente no arquivo Clinica.API/appsettings.json:

⚠️ Não é necessário alterar a string de conexão, apenas garantir que a instância RDS esteja acessível e liberada no grupo de segurança (porta 1433 aberta).


## 5. Rodando a API (.NET 8)

  ```bash
  cd clinica/Clinica.API
dotnet restore
dotnet build
dotnet run
  ```


### A API será iniciada em:
https://localhost:5001
http://localhost:5000

## 6. Rodando o Frontend (Angular)


  ```bash
  cd plat.cadastroDePacientes
npm install
ng serve

  ```


O frontend será iniciado em:
http://localhost:4200












