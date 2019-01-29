using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ScottNet.Web.Migrations
{
    public partial class BarometricTrends : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WeatherReadings_BarometricTrend_BarometricTrendId",
                table: "WeatherReadings");

            migrationBuilder.DropPrimaryKey(
                name: "PK_BarometricTrend",
                table: "BarometricTrend");

            migrationBuilder.DropColumn(
                name: "BarometricTrendId",
                table: "BarometricTrend");

            migrationBuilder.RenameTable(
                name: "BarometricTrend",
                newName: "BarometricTrends");

            migrationBuilder.RenameColumn(
                name: "WeatherReadingId",
                table: "WeatherReadings",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "BarometricTrendCode",
                table: "BarometricTrends",
                newName: "Code");

            migrationBuilder.AlterColumn<string>(
                name: "Title",
                table: "BarometricTrends",
                type: "VARCHAR(50)",
                nullable: true,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AddColumn<short>(
                name: "Id",
                table: "BarometricTrends",
                nullable: false,
                defaultValue: (short)0);

            migrationBuilder.AddPrimaryKey(
                name: "PK_BarometricTrends",
                table: "BarometricTrends",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_WeatherReadings_BarometricTrends_BarometricTrendId",
                table: "WeatherReadings",
                column: "BarometricTrendId",
                principalTable: "BarometricTrends",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WeatherReadings_BarometricTrends_BarometricTrendId",
                table: "WeatherReadings");

            migrationBuilder.DropPrimaryKey(
                name: "PK_BarometricTrends",
                table: "BarometricTrends");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "BarometricTrends");

            migrationBuilder.RenameTable(
                name: "BarometricTrends",
                newName: "BarometricTrend");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "WeatherReadings",
                newName: "WeatherReadingId");

            migrationBuilder.RenameColumn(
                name: "Code",
                table: "BarometricTrend",
                newName: "BarometricTrendCode");

            migrationBuilder.AlterColumn<string>(
                name: "Title",
                table: "BarometricTrend",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "VARCHAR(50)",
                oldNullable: true);

            migrationBuilder.AddColumn<short>(
                name: "BarometricTrendId",
                table: "BarometricTrend",
                nullable: false,
                defaultValue: (short)0)
                .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            migrationBuilder.AddPrimaryKey(
                name: "PK_BarometricTrend",
                table: "BarometricTrend",
                column: "BarometricTrendId");

            migrationBuilder.AddForeignKey(
                name: "FK_WeatherReadings_BarometricTrend_BarometricTrendId",
                table: "WeatherReadings",
                column: "BarometricTrendId",
                principalTable: "BarometricTrend",
                principalColumn: "BarometricTrendId",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
