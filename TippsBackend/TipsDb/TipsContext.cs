using Microsoft.EntityFrameworkCore;

namespace TipsDb;

public partial class TipsContext : DbContext
{
  public TipsContext() { }

  public TipsContext(DbContextOptions<TipsContext> options) : base(options) { }

  public virtual DbSet<MatchTip> MatchTips { get; set; }
  public virtual DbSet<MatchWithResult> MatchWithResults { get; set; }
  public virtual DbSet<Team> Teams { get; set; }
  public virtual DbSet<Tipper> Tippers { get; set; }

  //    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
  //#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
  //        => optionsBuilder.UseSqlite("data source=d:\\Temp\\tips.sqlite");

  protected override void OnModelCreating(ModelBuilder modelBuilder)
  {
    modelBuilder.Entity<MatchTip>(entity =>
    {
      entity.HasOne(d => d.MatchWithResult)
      .WithMany(p => p.MatchTips)
              .HasForeignKey(d => d.MatchWithResultId)
              .OnDelete(DeleteBehavior.ClientSetNull);

      entity.HasOne(d => d.Tipper)
      .WithMany(p => p.MatchTips)
              .HasForeignKey(d => d.TipperId)
              .OnDelete(DeleteBehavior.ClientSetNull);
    });

    modelBuilder.Entity<MatchWithResult>(entity =>
    {
      entity.Property(e => e.Team1Id).HasColumnName("Team1_Id");
      entity.Property(e => e.Team2Id).HasColumnName("Team2_Id");

      entity.HasOne(d => d.Team1)
      .WithMany(p => p.MatchWithResultTeam1s)
      .HasForeignKey(d => d.Team1Id);

      entity.HasOne(d => d.Team2)
      .WithMany(p => p.MatchWithResultTeam2s)
      .HasForeignKey(d => d.Team2Id);
    });

    OnModelCreatingPartial(modelBuilder);
  }

  partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
