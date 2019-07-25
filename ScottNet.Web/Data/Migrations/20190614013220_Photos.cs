using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ScottNet.Web.Migrations
{
    public partial class Photos : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ImageFormatSpecs",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false),
                    Name = table.Column<string>(type: "VARCHAR(50)", nullable: true),
                    FileNameSuffix = table.Column<string>(type: "VARCHAR(10)", nullable: true),
                    FormatOrder = table.Column<int>(nullable: false),
                    MaxWidth = table.Column<int>(nullable: true),
                    JpegQuality = table.Column<int>(nullable: true),
                    PngCompression = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ImageFormatSpecs", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ImageGroups",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    OriginalFileName = table.Column<string>(type: "VARCHAR(100)", nullable: true),
                    PathToOriginal = table.Column<string>(type: "VARCHAR(200)", nullable: true),
                    Description = table.Column<string>(type: "VARCHAR(500)", nullable: true),
                    UploadUserId = table.Column<string>(nullable: true),
                    UploadDate = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ImageGroups", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ImageGroups_AspNetUsers_UploadUserId",
                        column: x => x.UploadUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ImageInstances",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    ImageFormatSpecId = table.Column<int>(nullable: false),
                    ImageGroupId = table.Column<int>(nullable: false),
                    Size = table.Column<int>(nullable: false),
                    Url = table.Column<string>(type: "VARCHAR(300)", nullable: true),
                    SharedUrl = table.Column<string>(type: "VARCHAR(500)", nullable: true),
                    CreateDate = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ImageInstances", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ImageInstances_ImageFormatSpecs_ImageFormatSpecId",
                        column: x => x.ImageFormatSpecId,
                        principalTable: "ImageFormatSpecs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ImageInstances_ImageGroups_ImageGroupId",
                        column: x => x.ImageGroupId,
                        principalTable: "ImageGroups",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ImageGroups_UploadUserId",
                table: "ImageGroups",
                column: "UploadUserId");

            migrationBuilder.CreateIndex(
                name: "IX_ImageInstances_ImageFormatSpecId",
                table: "ImageInstances",
                column: "ImageFormatSpecId");

            migrationBuilder.CreateIndex(
                name: "IX_ImageInstances_ImageGroupId",
                table: "ImageInstances",
                column: "ImageGroupId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ImageInstances");

            migrationBuilder.DropTable(
                name: "ImageFormatSpecs");

            migrationBuilder.DropTable(
                name: "ImageGroups");
        }
    }
}
