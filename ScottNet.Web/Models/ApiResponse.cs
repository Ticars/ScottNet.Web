using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ScottNet.Web.Models
{
    public class ApiResponse<T>
    {
        public int StatusCode { get; set; }
        public string Message { get; set; }
        public T ResponseObject { get; set; }

        public ObjectResult GetResponseObject()
        {
            if(ResponseObject == null)
            {
                return new ObjectResult(Message) { StatusCode = StatusCode };
            } 
            else
            {
                return new ObjectResult(ResponseObject) { StatusCode = StatusCode };
            }
        }
        public static ApiResponse<T> GenerateSuccessResponse(T returnObject)
        {
            return new ApiResponse<T>()
            {
                StatusCode = StatusCodes.Status200OK,
                ResponseObject = returnObject
            };
        }
        public static ApiResponse<T> GenerateUnauthorizedResponse(string message)
        {
            return new ApiResponse<T>()
            {
                StatusCode = StatusCodes.Status401Unauthorized,
                Message = message
            };
        }

        public static ApiResponse<T> GenerateBadRequestResponse(string message)
        {
            return new ApiResponse<T>()
            {
                StatusCode = StatusCodes.Status400BadRequest,
                Message = message
            };
        }
    }
}
