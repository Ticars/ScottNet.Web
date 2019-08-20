using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;

namespace ScottNet.Web.Utilities
{
    public static class HttpContextExtensions
    {
        public static IApplicationBuilder UseHttpContext(this IApplicationBuilder app)
        {
            ScottNetHttpContext.Configure(app.ApplicationServices.GetRequiredService<IHttpContextAccessor>());
            return app;
        }
    }
}
