using System;
using Microsoft.Data.SqlClient;

namespace DISC.Utils
{
    public class DbUtils
    {
        ///  Get a string from a data reader object and gracefully handle NULL values. 
        ///  Returns the value of the given column, or Null.
        public static string GetString(SqlDataReader reader, string column)
        {
            var ordinal = reader.GetOrdinal(column);
            if (reader.IsDBNull(ordinal))
            {
                return null;
            }

            return reader.GetString(ordinal);
        }

        ///  Get an int from a data reader object. This method assumes the value is not NULL.
        ///  Returns the value of the given column.
        public static int GetInt(SqlDataReader reader, string column)
        {
            return reader.GetInt32(reader.GetOrdinal(column));
        }

        ///  Get a DateTime from a data reader object. This method assumes the value is not null.
        ///  Returns the value of the given column.
        public static DateTime GetDateTime(SqlDataReader reader, string column)
        {
            return reader.GetDateTime(reader.GetOrdinal(column));
        }

        ///  Get an int? (nullable int) from a data reader object and gracefully handle NULL values.
        ///  Returns the value of the given column, or Null. 
        public static int? GetNullableInt(SqlDataReader reader, string column)
        {
            var ordinal = reader.GetOrdinal(column);
            if (reader.IsDBNull(ordinal))
            {
                return null;
            }

            return reader.GetInt32(ordinal);
        }

        ///  Get a DateTime? (nullable DateTime) from a data reader object and gracefully handle NULL values.
        ///  Returns the value of the give column, or Null.
        public static DateTime? GetNullableDateTime(SqlDataReader reader, string column)
        {
            var ordinal = reader.GetOrdinal(column);
            if (reader.IsDBNull(ordinal))
            {
                return null;
            }

            return reader.GetDateTime(ordinal);
        }

        ///  Determine if the value a given column is NULL.
        ///  Returns True if column is NULL in the Database, otherwise False.
        public static bool IsDbNull(SqlDataReader reader, string column)
        {
            return reader.IsDBNull(reader.GetOrdinal(column));
        }

        ///  Determine if the value a given column is not NULL. 
        ///  Returns True if column is NOT NULL in the database, otherwise false. 
        public static bool IsNotDbNull(SqlDataReader reader, string column)
        {
            return !IsDbNull(reader, column);
        }

        ///  Add a parameter to the given SqlCommand object and gracefully handle null values.
        /// <param name="cmd">The command to which to add the parameter.</param>
        /// <param name="name">The name of the parameter.</param>
        /// <param name="value">The value of the parameter. May be null.</param>
        public static void AddParameter(SqlCommand cmd, string name, object value)
        {
            if (value == null)
            {
                cmd.Parameters.AddWithValue(name, DBNull.Value);
            }
            else
            {
                cmd.Parameters.AddWithValue(name, value);
            }
        }

        public static bool GetBool(SqlDataReader reader, string column)
        {
            return reader.GetBoolean(reader.GetOrdinal(column));
        }
    }
}
