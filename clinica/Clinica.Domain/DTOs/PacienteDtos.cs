namespace Clinica.Domain.DTOs;

public record PacienteCreateDto(
    string Nome,
    string Sobrenome,
    DateTime DataNascimento,
    string Genero,
    string? CPF,
    string RG,
    string UF_RG,
    string Email,
    string? Celular,
    string? TelefoneFixo,
    int? ConvenioId,
    string? NumeroCarteirinha,
    string? ValidadeCarteirinha
);

public record PacienteUpdateDto(
    string Nome,
    string Sobrenome,
    DateTime DataNascimento,
    string Genero,
    string? CPF,
    string RG,
    string UF_RG,
    string Email,
    string? Celular,
    string? TelefoneFixo,
    int? ConvenioId,
    string? NumeroCarteirinha,
    string? ValidadeCarteirinha,
    bool IsActive
);

public record PacienteListDto(
    int Id,
    string Nome,
    string Sobrenome,
    DateTime DataNascimento,
    string Genero,
    string? CPF,
    string RG,
    string UF_RG,
    string Email,
    string? Celular,
    string? TelefoneFixo,
    int? ConvenioId,
    string? ConvenioNome,
    string? NumeroCarteirinha,
    string? ValidadeCarteirinha,
    bool IsActive
);

public record ConvenioDto(int Id, string Nome);