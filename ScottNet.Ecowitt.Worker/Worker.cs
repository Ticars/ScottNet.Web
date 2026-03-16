using ScottNet.Ecowitt.Worker.Models;
using ScottNet.Ecowitt.Worker.Services;

namespace ScottNet.Ecowitt.Worker
{
    public class Worker : BackgroundService
    {
        private readonly ILogger<Worker> _logger;
        private readonly AppSettings _settings;
        private readonly PollingService _pollingService;
        public Worker(ILogger<Worker> logger, AppSettings settings, PollingService pollingService) : base()
        {
            _logger = logger;
            _settings = settings;
            _pollingService = pollingService;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {

            while (!stoppingToken.IsCancellationRequested)
            {
                await _pollingService.PollAsync();
                var delayMs = (_settings?.PollingIntervalSeconds ?? 60) * 1000;
                await Task.Delay(delayMs, stoppingToken);;
            }
        }
    }
}
