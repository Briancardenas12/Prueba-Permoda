using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace CatalogoProductosApi.Models
{
    [Index(nameof(Sku), IsUnique = true)]
    public class Product
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Nombre { get; set; } = null!;

        [Required]
        public string Sku { get; set; } = null!;

        [Range(0, double.MaxValue)]
        [Column(TypeName = "decimal(18,2)")]
        public decimal Precio { get; set; }

        [Range(0, int.MaxValue)]
        public int Stock { get; set; }

        [Required]
        public string Categoria { get; set; } = null!;
    }
}
