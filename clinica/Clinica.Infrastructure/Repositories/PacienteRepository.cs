using Clinica.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Clinica.Infrastructure.Repositories;

public interface IPacienteRepository
{
  Task<Paciente?> GetByIdAsync(int id, CancellationToken ct);
  Task<bool> ExistsCpfAsync(string cpf, int? excludeId, CancellationToken ct);
  Task AddAsync(Paciente paciente, CancellationToken ct);
  Task UpdateAsync(Paciente paciente, CancellationToken ct);
  Task<List<Paciente>> ListAsync(bool includeInactive, CancellationToken ct);
}

public class PacienteRepository : IPacienteRepository
{
  private readonly Persistence.ClinicaDbContext _ctx;
  public PacienteRepository(Persistence.ClinicaDbContext ctx) => _ctx = ctx;

  public Task<Paciente?> GetByIdAsync(int id, CancellationToken ct) =>
      _ctx.Pacientes.Include(p => p.Convenio).FirstOrDefaultAsync(p => p.Id == id, ct);

  public Task<bool> ExistsCpfAsync(string cpf, int? excludeId, CancellationToken ct) =>
      _ctx.Pacientes.AnyAsync(p => p.IsActive && p.CPF == cpf && (excludeId == null || p.Id != excludeId), ct);

  public async Task AddAsync(Paciente paciente, CancellationToken ct)
  {
    await _ctx.Pacientes.AddAsync(paciente, ct);
    await _ctx.SaveChangesAsync(ct);
  }

  public async Task UpdateAsync(Paciente paciente, CancellationToken ct)
  {
    _ctx.Pacientes.Update(paciente);
    await _ctx.SaveChangesAsync(ct);
  }

  public Task<List<Paciente>> ListAsync(bool includeInactive, CancellationToken ct) =>
      _ctx.Pacientes
          .Include(p => p.Convenio)
          .Where(p => includeInactive || p.IsActive)
          .OrderBy(p => p.Nome).ThenBy(p => p.Sobrenome)
          .ToListAsync(ct);
}