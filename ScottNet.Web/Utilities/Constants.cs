using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ScottNet.Web.Utilities
{
    public static class Constants
    {
        public static class CacheKeys
        {
            public static string DarkSkyForecast => "DarkSkyForecast";
        }

        public static class JwtClaimIdentifiers
        {
            public const string Rol = "rol", Id = "id", Confirmed = "vldt";
        }

        public static class JwtClaims
        {
            public const string ApiAccess = "api_access";
        }

        public static class ApiErrorCodes
        {
            public const string ResendEmailInvalidEmail = "REINV";
            public const string ResendEmailAccountVerified = "REACV";

        }
    }
}
