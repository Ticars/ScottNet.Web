using Newtonsoft.Json;
using ScottNet.Ecowitt.Worker.Models;
using ScottNet.Ecowitt.Worker.Models.Ecowitt;
using System.Text;
using System.Text.Json;
using JsonSerializer = System.Text.Json.JsonSerializer;

namespace ScottNet.Ecowitt.Worker.Services
{
    public class PollingService
    {
        private readonly ILogger<PollingService> _logger;
        EcoWittDataConverter _dataConverter;
        private readonly AppSettings _settings;


        public PollingService(ILogger<PollingService> logger, AppSettings appSettings, EcoWittDataConverter dataConverter)
        {
            _dataConverter = dataConverter;
            _logger = logger;
            _settings = appSettings;
        }

        public async Task PollAsync()
        {
            LogTime();
            var liveData = await GetLiveDataAsync();
            if (liveData != null)
            {
                var converted = _dataConverter.ConvertEcowittData(liveData);
                await PostUploadAsync(converted);

            }
        }

        private void LogTime()
        {
            if (_logger.IsEnabled(LogLevel.Information))
            {
                _logger.LogInformation("Worker running at: {time}", DateTimeOffset.Now);
            }
        }

        // Fetch live data from the EcoWitt device and deserialize into the model
        private async Task<EcoWittLiveData?> GetLiveDataAsync()
        {
            try
            {
                using var client = new HttpClient { Timeout = TimeSpan.FromSeconds(10) };
                
                var resp = await client.GetAsync(_settings.EcoWittUrl);
                if (!resp.IsSuccessStatusCode)
                {
                    if (_logger.IsEnabled(LogLevel.Warning))
                    {
                        _logger.LogWarning("Failed to fetch live data. Status: {status}", resp.StatusCode);
                    }
                    return null;
                }

                var content = await resp.Content.ReadAsStringAsync();
                var opts2 = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };
                var data2 = JsonSerializer.Deserialize<EcoWittLiveData>(content, opts2);

                var opts = new JsonSerializerSettings
                {
                    DateFormatString = "yyyy-MM-ddTHH:mm:ss", 
                    NullValueHandling = NullValueHandling.Ignore,
                };

                var data = JsonConvert.DeserializeObject<EcoWittLiveData>(content, opts);
                return data;
            }
            catch (Exception ex)
            {
                if (_logger.IsEnabled(LogLevel.Error))
                {
                    _logger.LogError(ex, "Error while fetching EcoWitt live data");
                }
                return null;
            }
        }

        // Post ScottNetUpload JSON to the remote weather service
        private async Task PostUploadAsync(ScottNetUpload upload)
        {
            if (upload == null)
            {
                if (_logger.IsEnabled(LogLevel.Warning))
                    _logger.LogWarning("PostUploadAsync called with null upload");
                return;
            }

            try
            {
                using var client = new HttpClient { Timeout = TimeSpan.FromSeconds(10) };
                var opts = new JsonSerializerSettings
                {
                    DateFormatString = "yyyy-MM-ddTHH:mm:ss", //yyyy-MM-dd'T'HH:mm:ss
                    NullValueHandling = NullValueHandling.Ignore,
                };

                var json = JsonConvert.SerializeObject(upload, opts);
                using var content = new StringContent(json, Encoding.UTF8, "application/json");

                var resp = await client.PostAsync(_settings.UploadUrl, content).ConfigureAwait(false);
                if (!resp.IsSuccessStatusCode)
                {
                    if (_logger.IsEnabled(LogLevel.Warning))
                        _logger.LogWarning("Failed to post upload data. Status: {status}", resp.StatusCode);
                }
                else
                {
                    if (_logger.IsEnabled(LogLevel.Debug))
                        _logger.LogDebug("Successfully posted upload data. Status: {status}", resp.StatusCode);
                }
            }
            catch (Exception ex)
            {
                if (_logger.IsEnabled(LogLevel.Error))
                    _logger.LogError(ex, "Error while posting ScottNetUpload to remote service");
            }
        }

    }
}
