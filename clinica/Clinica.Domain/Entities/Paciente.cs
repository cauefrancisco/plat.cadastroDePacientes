namespace Clinica.Domain.Entities;

public class Paciente
{
  public int Id { get; set; }
  public string Nome { get; set; } = default!;
  public string Sobrenome { get; set; } = default!;
  public DateTime DataNascimento { get; set; }
  public string Genero { get; set; } = default!;
  public string? CPF { get; set; }
  public string RG { get; set; } = default!;
  public string UF_RG { get; set; } = default!;
  public string Email { get; set; } = default!;
  public string? Celular { get; set; }
  public string? TelefoneFixo { get; set; }
  public int? ConvenioId { get; set; }
  public Convenio? Convenio { get; set; }
  public string? NumeroCarteirinha { get; set; }
  public string? ValidadeCarteirinha { get; set; }
  public bool IsActive { get; set; } = true;
  public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
  public DateTime? UpdatedAt { get; set; }
}