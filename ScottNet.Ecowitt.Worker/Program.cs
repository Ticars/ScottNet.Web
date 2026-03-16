using ScottNet.Ecowitt.Worker;
using ScottNet.Ecowitt.Worker.Models;
using ScottNet.Ecowitt.Worker.Services;

var builder = Host.CreateApplicationBuilder(args);
IConfiguration configuration = builder.Configuration;
var settings = new AppSettings(configuration);

builder.Services.AddSingleton(settings);
builder.Services.AddSingleton<EcoWittDataConverter>();
builder.Services.AddSingleton<PollingService>();
builder.Services.AddLogging();

builder.Services.AddHostedService<Worker>();

var host = builder.Build();
host.Run();
