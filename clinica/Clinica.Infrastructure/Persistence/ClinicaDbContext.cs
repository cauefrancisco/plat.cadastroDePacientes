using Clinica.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Clinica.Infrastructure.Persistence;

public class ClinicaDbContext : DbContext
{
  public ClinicaDbContext(DbContextOptions<ClinicaDbContext> options) : base(options) { }

  public DbSet<Paciente> Pacientes => Set<Paciente>();
  public DbSet<Convenio> Convenios => Set<Convenio>();

  protected override void OnModelCreating(ModelBuilder modelBuilder)
  {
    modelBuilder.Entity<Convenio>(b =>
    {
      b.ToTable("Convenios");
      b.HasKey(x => x.Id);
      b.Property(x => x.Nome).IsRequired().HasMaxLength(100);
      b.Property(x => x.Ativo).HasDefaultValue(true);
    });

    modelBuilder.Entity<Paciente>(b =>
    {
      b.ToTable("Pacientes");
      b.HasKey(x => x.Id);
      b.Property(x => x.Nome).IsRequired().HasMaxLength(100);
      b.Property(x => x.Sobrenome).IsRequired().HasMaxLength(100);
      b.Property(x => x.Genero).IsRequired().HasMaxLength(20);
      b.Property(x => x.CPF).HasMaxLength(11).IsUnicode(false);
      b.Property(x => x.RG).IsRequired().HasMaxLength(20);
      b.Property(x => x.UF_RG).IsRequired().HasMaxLength(2).IsUnicode(false);
      b.Property(x => x.Email).IsRequired().HasMaxLength(150);
      b.Property(x => x.Celular).HasMaxLength(20);
      b.Property(x => x.TelefoneFixo).HasMaxLength(20);
      b.Property(x => x.NumeroCarteirinha).HasMaxLength(50);
      b.Property(x => x.ValidadeCarteirinha).HasMaxLength(7).IsUnicode(false);
      b.Property(x => x.IsActive).HasDefaultValue(true);
      b.Property(x => x.CreatedAt).HasDefaultValueSql("SYSUTCDATETIME()");
      b.HasOne(x => x.Convenio)
              .WithMany()
              .HasForeignKey(x => x.ConvenioId)
              .OnDelete(DeleteBehavior.NoAction);
    });
  }
}