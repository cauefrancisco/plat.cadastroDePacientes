using Microsoft.AspNetCore.Mvc;
using Clinica.Infrastructure.Repositories;
using Clinica.Domain.DTOs;

namespace Clinica.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ConveniosController : ControllerBase
{
  private readonly IConvenioRepository _repo;
  public ConveniosController(IConvenioRepository repo) => _repo = repo;

  [HttpGet]
  public async Task<ActionResult<List<ConvenioDto>>> List(CancellationToken ct = default)
  {
    var list = await _repo.ListAtivosAsync(ct);
    return Ok(list.Select(c => new ConvenioDto(c.Id, c.Nome)));
  }
}