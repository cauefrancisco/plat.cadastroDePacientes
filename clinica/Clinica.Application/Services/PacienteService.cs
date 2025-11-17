using Clinica.Domain.DTOs;
using Clinica.Domain.Entities;
using Clinica.Infrastructure.Repositories;
using FluentValidation;

namespace Clinica.Application.Services;

public interface IPacienteService
{
  Task<PacienteListDto> CreateAsync(PacienteCreateDto dto, CancellationToken ct);
  Task<PacienteListDto> UpdateAsync(int id, PacienteUpdateDto dto, CancellationToken ct);
  Task<List<PacienteListDto>> ListAsync(bool includeInactive, CancellationToken ct);
  Task<PacienteListDto?> GetAsync(int id, CancellationToken ct);
  Task<bool> DeactivateAsync(int id, CancellationToken ct);
}

public class PacienteService : IPacienteService
{
  private readonly IPacienteRepository _repo;
  private readonly IConvenioRepository _convRepo;
  private readonly IValidator<PacienteCreateDto> _createValidator;
  private readonly IValidator<PacienteUpdateDto> _updateValidator;

  public PacienteService(IPacienteRepository repo, IConvenioRepository convRepo,
      IValidator<PacienteCreateDto> createValidator,
      IValidator<PacienteUpdateDto> updateValidator)
  {
    _repo = repo;
    _convRepo = convRepo;
    _createValidator = createValidator;
    _updateValidator = updateValidator;
  }

  public async Task<PacienteListDto> CreateAsync(PacienteCreateDto dto, CancellationToken ct)
  {
    await _createValidator.ValidateAndThrowAsync(dto, ct);

    var cpf = string.IsNullOrWhiteSpace(dto.CPF) ? null : new string(dto.CPF.Where(char.IsDigit).ToArray());
    if (!string.IsNullOrWhiteSpace(cpf) && await _repo.ExistsCpfAsync(cpf!, null, ct))
      throw new InvalidOperationException("CPF já cadastrado para um paciente ativo.");

    if (dto.ConvenioId.HasValue && !await _convRepo.ExistsAsync(dto.ConvenioId.Value, ct))
      throw new InvalidOperationException("Convênio inválido ou inativo.");

    var paciente = MapToEntity(dto);
    paciente.CPF = cpf;

    await _repo.AddAsync(paciente, ct);
    return MapToDto(paciente);
  }

  public async Task<PacienteListDto> UpdateAsync(int id, PacienteUpdateDto dto, CancellationToken ct)
  {
    await _updateValidator.ValidateAndThrowAsync(dto, ct);

    var existing = await _repo.GetByIdAsync(id, ct) ?? throw new KeyNotFoundException("Paciente não encontrado.");
    var cpf = string.IsNullOrWhiteSpace(dto.CPF) ? null : new string(dto.CPF.Where(char.IsDigit).ToArray());

    if (!string.IsNullOrWhiteSpace(cpf) && await _repo.ExistsCpfAsync(cpf!, id, ct))
      throw new InvalidOperationException("CPF já cadastrado para outro paciente ativo.");

    if (dto.ConvenioId.HasValue && !await _convRepo.ExistsAsync(dto.ConvenioId.Value, ct))
      throw new InvalidOperationException("Convênio inválido ou inativo.");

    ApplyUpdate(existing, dto, cpf);
    existing.UpdatedAt = DateTime.UtcNow;
    await _repo.UpdateAsync(existing, ct);
    return MapToDto(existing);
  }

  public async Task<List<PacienteListDto>> ListAsync(bool includeInactive, CancellationToken ct) =>
      (await _repo.ListAsync(includeInactive, ct)).Select(MapToDto).ToList();

  public async Task<PacienteListDto?> GetAsync(int id, CancellationToken ct)
  {
    var p = await _repo.GetByIdAsync(id, ct);
    return p is null ? null : MapToDto(p);
  }

  public async Task<bool> DeactivateAsync(int id, CancellationToken ct)
  {
    var p = await _repo.GetByIdAsync(id, ct);
    if (p is null) return false;
    if (!p.IsActive) return true;
    p.IsActive = false;
    p.UpdatedAt = DateTime.UtcNow;
    await _repo.UpdateAsync(p, ct);
    return true;
  }

  private static Paciente MapToEntity(PacienteCreateDto dto) => new()
  {
    Nome = dto.Nome,
    Sobrenome = dto.Sobrenome,
    DataNascimento = dto.DataNascimento.Date,
    Genero = dto.Genero,
    RG = dto.RG,
    UF_RG = dto.UF_RG,
    Email = dto.Email,
    Celular = dto.Celular,
    TelefoneFixo = dto.TelefoneFixo,
    ConvenioId = dto.ConvenioId,
    NumeroCarteirinha = dto.NumeroCarteirinha,
    ValidadeCarteirinha = dto.ValidadeCarteirinha,
    IsActive = true
  };

  private static void ApplyUpdate(Paciente target, PacienteUpdateDto dto, string? cpf)
  {
    target.Nome = dto.Nome;
    target.Sobrenome = dto.Sobrenome;
    target.DataNascimento = dto.DataNascimento.Date;
    target.Genero = dto.Genero;
    target.CPF = cpf;
    target.RG = dto.RG;
    target.UF_RG = dto.UF_RG;
    target.Email = dto.Email;
    target.Celular = dto.Celular;
    target.TelefoneFixo = dto.TelefoneFixo;
    target.ConvenioId = dto.ConvenioId;
    target.NumeroCarteirinha = dto.NumeroCarteirinha;
    target.ValidadeCarteirinha = dto.ValidadeCarteirinha;
    target.IsActive = dto.IsActive;
  }

  private static PacienteListDto MapToDto(Paciente p) => new(
      p.Id, p.Nome, p.Sobrenome, p.DataNascimento, p.Genero, p.CPF, p.RG, p.UF_RG, p.Email,
      p.Celular, p.TelefoneFixo, p.ConvenioId, p.Convenio?.Nome, p.NumeroCarteirinha,
      p.ValidadeCarteirinha, p.IsActive
  );
}