using System;
using System.Collections.Generic;
using System.Text;

namespace ScottNet.Ecowitt.Worker.Models
{
    public class AppSettings
    {
        public string EcoWittUrl { get; set; }
        public string UploadUrl { get; set; }
        public int PollingIntervalSeconds { get; set; }

        public AppSettings(IConfiguration configuration)
        {
            // Read settings from configuration with sensible defaults
            EcoWittUrl = configuration?["EcoWittPolling:EcoWittUrl"]!;
            UploadUrl = configuration?["EcoWittPolling:UploadUrl"]!;

            if (!int.TryParse(configuration?["EcoWittPolling:PollingIntervalSeconds"], out var seconds))
            {
                seconds = 60; // default 60s
            }
            PollingIntervalSeconds = seconds;
        }
    }
}
