namespace Clinica.Domain.Entities;

public class Convenio
{
  public int Id { get; set; }
  public string Nome { get; set; } = default!;
  public bool Ativo { get; set; } = true;
}