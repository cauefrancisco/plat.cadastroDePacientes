using Clinica.Domain.DTOs;
using FluentValidation;

namespace Clinica.Application.Validation;

public class PacienteDtoValidator : AbstractValidator<PacienteCreateDto>
{
  public PacienteDtoValidator()
  {
    RuleFor(x => x.Nome).NotEmpty().MaximumLength(100);
    RuleFor(x => x.Sobrenome).NotEmpty().MaximumLength(100);
    RuleFor(x => x.Genero).Must(g => new[] { "Masculino", "Feminino", "Outro" }.Contains(g))
        .WithMessage("Gênero inválido.");

    RuleFor(x => x.DataNascimento)
        .Must(d => d.Date <= DateTime.Today)
        .WithMessage("Data de nascimento não pode ser futura.");

    RuleFor(x => x.Email).NotEmpty().EmailAddress();
    RuleFor(x => x.RG).NotEmpty().MaximumLength(20);
    RuleFor(x => x.UF_RG).NotEmpty().Length(2);

    RuleFor(x => x.CPF)
        .Must(cpf => string.IsNullOrWhiteSpace(cpf) || CpfValidator.IsValid(cpf))
        .WithMessage("CPF inválido.")
        .When(x => !string.IsNullOrWhiteSpace(x.CPF));

    RuleFor(x => x)
        .Must(x => !string.IsNullOrWhiteSpace(x.Celular) || !string.IsNullOrWhiteSpace(x.TelefoneFixo))
        .WithMessage("Informe pelo menos um telefone (celular ou fixo).");

    When(x => x.ConvenioId.HasValue, () =>
    {
      RuleFor(x => x.NumeroCarteirinha).NotEmpty();
      RuleFor(x => x.ValidadeCarteirinha)
              .NotEmpty()
              .Matches(@"^(0[1-9]|1[0-2])\/\d{4}$").WithMessage("Validade deve ser MM/YYYY.");
    });
  }
}

public class PacienteUpdateDtoValidator : AbstractValidator<PacienteUpdateDto>
{
  public PacienteUpdateDtoValidator()
  {
    // Regras comuns (mesmas do create)
    RuleFor(x => x.Nome).NotEmpty().MaximumLength(100);
    RuleFor(x => x.Sobrenome).NotEmpty().MaximumLength(100);
    RuleFor(x => x.Genero).Must(g => new[] { "Masculino", "Feminino", "Outro" }.Contains(g))
        .WithMessage("Gênero inválido.");

    RuleFor(x => x.DataNascimento)
        .Must(d => d.Date <= DateTime.Today)
        .WithMessage("Data de nascimento não pode ser futura.");

    RuleFor(x => x.Email).NotEmpty().EmailAddress();
    RuleFor(x => x.RG).NotEmpty().MaximumLength(20);
    RuleFor(x => x.UF_RG).NotEmpty().Length(2);

    RuleFor(x => x.CPF)
        .Must(cpf => string.IsNullOrWhiteSpace(cpf) || CpfValidator.IsValid(cpf))
        .WithMessage("CPF inválido.")
        .When(x => !string.IsNullOrWhiteSpace(x.CPF));

    RuleFor(x => x)
        .Must(x => !string.IsNullOrWhiteSpace(x.Celular) || !string.IsNullOrWhiteSpace(x.TelefoneFixo))
        .WithMessage("Informe pelo menos um telefone (celular ou fixo).");

    When(x => x.ConvenioId.HasValue, () =>
    {
      RuleFor(x => x.NumeroCarteirinha).NotEmpty();
      RuleFor(x => x.ValidadeCarteirinha)
              .NotEmpty()
              .Matches(@"^(0[1-9]|1[0-2])\/\d{4}$").WithMessage("Validade deve ser MM/YYYY.");
    });

    // Regra específica do update
    RuleFor(x => x.IsActive).NotNull();
  }
}

// Validador de CPF
public static class CpfValidator
{
  public static bool IsValid(string? cpf)
  {
    if (string.IsNullOrWhiteSpace(cpf)) return true;
    cpf = new string(cpf.Where(char.IsDigit).ToArray());
    if (cpf.Length != 11) return false;
    var invalids = new[] { "00000000000", "11111111111", "22222222222", "33333333333", "44444444444", "55555555555", "66666666666", "77777777777", "88888888888", "99999999999" };
    if (invalids.Contains(cpf)) return false;

    int[] mult1 = { 10, 9, 8, 7, 6, 5, 4, 3, 2 };
    int[] mult2 = { 11, 10, 9, 8, 7, 6, 5, 4, 3, 2 };

    string temp = cpf[..9];
    int sum = 0;
    for (int i = 0; i < 9; i++) sum += (temp[i] - '0') * mult1[i];
    int mod = sum % 11;
    int dig1 = mod < 2 ? 0 : 11 - mod;

    temp += dig1.ToString();
    sum = 0;
    for (int i = 0; i < 10; i++) sum += (temp[i] - '0') * mult2[i];
    mod = sum % 11;
    int dig2 = mod < 2 ? 0 : 11 - mod;

    return cpf.EndsWith($"{dig1}{dig2}");
  }
}