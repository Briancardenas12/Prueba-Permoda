using CatalogoProductosApi.Models;
using Microsoft.EntityFrameworkCore;

namespace CatalogoProductosApi.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) {}

        public DbSet<Product> Products { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Product>().HasData(
                new Product { Id = 1, Nombre = "Zapatos Deportivos", Sku = "SKU001", Precio = 150000, Stock = 10, Categoria = "Calzado" },
                new Product { Id = 2, Nombre = "Camisa Casual", Sku = "SKU002", Precio = 45000, Stock = 20, Categoria = "Ropa" },
                new Product { Id = 3, Nombre = "Pantalón Jeans", Sku = "SKU003", Precio = 90000, Stock = 15, Categoria = "Ropa" },
                new Product { Id = 4, Nombre = "Chaqueta Liviana", Sku = "SKU004", Precio = 120000, Stock = 8, Categoria = "Ropa" },
                new Product { Id = 5, Nombre = "Gorra Negra", Sku = "SKU005", Precio = 30000, Stock = 25, Categoria = "Accesorios" }
            );
        }
    }
}


