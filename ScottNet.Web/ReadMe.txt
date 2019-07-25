SSL Configured from:

https://www.hanselman.com/blog/SecuringAnAzureAppServiceWebsiteUnderSSLInMinutesWithLetsEncrypt.aspx



web.config

      <rewrite>
        <rules>
          <rule name="Redirect to www">
            <match url=".*" />
            <conditions logicalGrouping="MatchAny">
              <add input="{HTTP_HOST}" pattern="^(www\.)(.*)$" negate="true" />
            </conditions>
            <action type="Redirect" url="https://www.{HTTP_HOST}/{R:0}" redirectType="Permanent"/>
          </rule>
        </rules>
      </rewrite>


	  Refresh Tokens:
	  https://www.blinkingcaret.com/2018/05/30/refresh-tokens-in-asp-net-core-web-api/