using Clinica.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Clinica.Infrastructure.Repositories;

public interface IConvenioRepository
{
  Task<List<Convenio>> ListAtivosAsync(CancellationToken ct);
  Task<bool> ExistsAsync(int id, CancellationToken ct);
}

public class ConvenioRepository : IConvenioRepository
{
  private readonly Persistence.ClinicaDbContext _ctx;
  public ConvenioRepository(Persistence.ClinicaDbContext ctx) => _ctx = ctx;

  public Task<List<Convenio>> ListAtivosAsync(CancellationToken ct) =>
      _ctx.Convenios.Where(c => c.Ativo).OrderBy(c => c.Nome).ToListAsync(ct);

  public Task<bool> ExistsAsync(int id, CancellationToken ct) =>
      _ctx.Convenios.AnyAsync(c => c.Ativo && c.Id == id, ct);
}