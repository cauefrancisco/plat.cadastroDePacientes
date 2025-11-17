using Microsoft.AspNetCore.Mvc;
using Clinica.Application.Services;
using Clinica.Domain.DTOs;

namespace Clinica.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PacientesController : ControllerBase
{
  private readonly IPacienteService _service;
  public PacientesController(IPacienteService service) => _service = service;

  [HttpGet]
  public async Task<ActionResult<List<PacienteListDto>>> List([FromQuery] bool includeInactive = false, CancellationToken ct = default)
      => Ok(await _service.ListAsync(includeInactive, ct));

  [HttpGet("{id:int}")]
  public async Task<ActionResult<PacienteListDto>> Get(int id, CancellationToken ct = default)
  {
    var p = await _service.GetAsync(id, ct);
    return p is null ? NotFound() : Ok(p);
  }

  [HttpPost]
  public async Task<ActionResult<PacienteListDto>> Create([FromBody] PacienteCreateDto dto, CancellationToken ct = default)
  {
    try
    {
      var created = await _service.CreateAsync(dto, ct);
      return CreatedAtAction(nameof(Get), new { id = created.Id }, created);
    }
    catch (InvalidOperationException ex) { return Conflict(new { message = ex.Message }); }
    catch (FluentValidation.ValidationException ex) { return BadRequest(new { errors = ex.Errors.Select(e => e.ErrorMessage) }); }
  }

  [HttpPut("{id:int}")]
  public async Task<ActionResult<PacienteListDto>> Update(int id, [FromBody] PacienteUpdateDto dto, CancellationToken ct = default)
  {
    try
    {
      var updated = await _service.UpdateAsync(id, dto, ct);
      return Ok(updated);
    }
    catch (KeyNotFoundException) { return NotFound(); }
    catch (InvalidOperationException ex) { return Conflict(new { message = ex.Message }); }
    catch (FluentValidation.ValidationException ex) { return BadRequest(new { errors = ex.Errors.Select(e => e.ErrorMessage) }); }
  }

  [HttpPatch("{id:int}/desativar")]
  public async Task<IActionResult> Deactivate(int id, CancellationToken ct = default)
      => await _service.DeactivateAsync(id, ct) ? NoContent() : NotFound();
}