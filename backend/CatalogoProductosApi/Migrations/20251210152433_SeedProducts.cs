using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace CatalogoProductosApi.Migrations
{
    /// <inheritdoc />
    public partial class SeedProducts : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Products",
                columns: new[] { "Id", "Categoria", "Nombre", "Precio", "Sku", "Stock" },
                values: new object[,]
                {
                    { 1, "Calzado", "Zapatos Deportivos", 150000m, "SKU001", 10 },
                    { 2, "Ropa", "Camisa Casual", 45000m, "SKU002", 20 },
                    { 3, "Ropa", "Pantalón Jeans", 90000m, "SKU003", 15 },
                    { 4, "Ropa", "Chaqueta Liviana", 120000m, "SKU004", 8 },
                    { 5, "Accesorios", "Gorra Negra", 30000m, "SKU005", 25 }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 5);
        }
    }
}
