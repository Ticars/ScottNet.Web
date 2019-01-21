using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ScottNet.Web.Migrations
{
    public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "BarometricTrend",
                columns: table => new
                {
                    BarometricTrendId = table.Column<short>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    BarometricTrendCode = table.Column<short>(nullable: false),
                    Title = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BarometricTrend", x => x.BarometricTrendId);
                });

            migrationBuilder.CreateTable(
                name: "WeatherReadings",
                columns: table => new
                {
                    WeatherReadingId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    ConsoleTime = table.Column<DateTime>(type: "DateTime2(1)", nullable: false),
                    BarometricTrendId = table.Column<short>(nullable: true),
                    Barometer = table.Column<float>(nullable: false),
                    IndoorTemp = table.Column<float>(nullable: false),
                    IndoorHumidity = table.Column<byte>(nullable: false),
                    OutdoorHumidity = table.Column<byte>(nullable: false),
                    OutdoorTemp = table.Column<float>(nullable: false),
                    WindDirection = table.Column<short>(nullable: false),
                    WindSpeed = table.Column<float>(nullable: false),
                    WindSpeed10M = table.Column<float>(nullable: false),
                    WindSpeed2M = table.Column<float>(nullable: false),
                    WindGustSpeed10M = table.Column<float>(nullable: false),
                    WindGustDirection10M = table.Column<short>(nullable: false),
                    RainRate = table.Column<float>(nullable: false),
                    RainStorm = table.Column<float>(nullable: false),
                    RainDay = table.Column<float>(nullable: false),
                    RainMonth = table.Column<float>(nullable: false),
                    RainYear = table.Column<float>(nullable: false),
                    Rain15M = table.Column<float>(nullable: false),
                    Rain1H = table.Column<float>(nullable: false),
                    Rain24H = table.Column<float>(nullable: false),
                    ForecastIcon = table.Column<byte>(nullable: false),
                    DewPoint = table.Column<short>(nullable: false),
                    HeatIndex = table.Column<short>(nullable: false),
                    WindChill = table.Column<short>(nullable: false),
                    ForecastRainIcon = table.Column<bool>(nullable: false),
                    ForecastSnowIcon = table.Column<bool>(nullable: false),
                    ForecastCloudyIcon = table.Column<bool>(nullable: false),
                    ForecastSunIcon = table.Column<bool>(nullable: false),
                    ForecastPartlyCloudyIcon = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WeatherReadings", x => x.WeatherReadingId);
                    table.ForeignKey(
                        name: "FK_WeatherReadings_BarometricTrend_BarometricTrendId",
                        column: x => x.BarometricTrendId,
                        principalTable: "BarometricTrend",
                        principalColumn: "BarometricTrendId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_WeatherReadings_BarometricTrendId",
                table: "WeatherReadings",
                column: "BarometricTrendId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "WeatherReadings");

            migrationBuilder.DropTable(
                name: "BarometricTrend");
        }
    }
}
