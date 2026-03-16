Polls ecowitt console and pushes it to ScottNet
The data has been shoe horned into the same object used for Davis (so fields don't match perfectly)

Installed to ~scott/EcoWittWeather
Service file is /etc/systemd/system/ScottNet.Ecowitt.Worker.service:

[Unit]
Description=.NET Worker Service to poll EcoWitt and send to ScottNet
After=network.target

[Service]
WorkingDirectory=/home/scott/EcoWittWeather
ExecStart=/home/scott/dotnet/dotnet /home/scott/EcoWittWeather/ScottNet.Ecowitt.Worker.dll
Restart=always
User=scott
Environment=ASPNETCORE_ENVIRONMENT=Production

[Install]
WantedBy=multi-user.target




It was enabled and added via: 
	sudo systemctl enable ScottNet.Ecowitt.Worker
	sudo systemctl start ScottNet.Ecowitt.Worker

To view status and logs:
	sudo systemctl status ScottNet.Ecowitt.Worker
	sudo journalctl -fu ScottNet.Ecowitt.Worker