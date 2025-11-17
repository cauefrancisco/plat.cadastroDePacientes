using Clinica.Application.Services;
using Clinica.Application.Validation;
using Clinica.Infrastructure.Persistence;
using Clinica.Infrastructure.Repositories;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Connection string
var connectionString = builder.Configuration.GetConnectionString("ClinicaDb")
    ?? "Server=localhost;Database=ClinicaDB;Trusted_Connection=True;TrustServerCertificate=True;";

builder.Services.AddDbContext<ClinicaDbContext>(options =>
    options.UseSqlServer(connectionString));

// Repositórios e serviços
builder.Services.AddScoped<IPacienteRepository, PacienteRepository>();
builder.Services.AddScoped<IConvenioRepository, ConvenioRepository>();
builder.Services.AddScoped<IPacienteService, PacienteService>();
builder.Services.AddScoped<IValidator<Clinica.Domain.DTOs.PacienteCreateDto>, PacienteDtoValidator>();
builder.Services.AddScoped<IValidator<Clinica.Domain.DTOs.PacienteUpdateDto>, PacienteUpdateDtoValidator>();

// Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Controllers
builder.Services.AddControllers().AddJsonOptions(o =>
{
    o.JsonSerializerOptions.PropertyNamingPolicy = null;
});

// 🔹 Configuração de CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngular",
        policy => policy
            .WithOrigins("http://localhost:4200") // origem do Angular
            .AllowAnyHeader()
            .AllowAnyMethod());
});

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();

// 🔹 Ativar CORS
app.UseCors("AllowAngular");

app.MapControllers();

app.Run();