using System.Globalization;

namespace ScottNet.Ecowitt.Worker.Utilities
{
    public static class StringExtensions
    {
        /// <summary>
        /// Extracts a potential decimal value from a string by removing all characters 
        /// except digits and the first decimal point, then parses it using an invariant culture.
        /// </summary>
        /// <param name="input">The input string.</param>
        /// <returns>The extracted decimal value, or 0M if parsing fails.</returns>
        public static decimal ExtractDecimalValue(this string? input)
        {
            if (string.IsNullOrEmpty(input))
            {
                return 0M;
            }

            // 1. Isolate the number part, handling the first decimal point.
            // We use a custom logic to ensure only one decimal point is kept.
            string cleanedInput = CleanNumericString(input);

            // 2. Parse the cleaned string using an invariant culture, 
            // which consistently uses the period (.) as the decimal separator.
            if (decimal.TryParse(
                    cleanedInput,
                    NumberStyles.Any,
                    CultureInfo.InvariantCulture,
                    out decimal result))
            {
                return result;
            }

            // Return 0M or throw an exception based on desired error handling
            return 0M;
        }

        /// <summary>
        /// Helper method to remove all non-digit characters while keeping only the first decimal point.
        /// </summary>
        private static string CleanNumericString(string input)
        {
            // Use a StringBuilder for efficient string manipulation
            var sb = new System.Text.StringBuilder();
            bool hasDecimalPoint = false;

            foreach (char c in input)
            {
                if (Char.IsDigit(c))
                {
                    sb.Append(c);
                }
                // Check for a period (common decimal separator) and ensure only one is added
                else if (c == '.' && !hasDecimalPoint)
                {
                    sb.Append(c);
                    hasDecimalPoint = true;
                }
            }

            return sb.ToString();
        }
    }
}
