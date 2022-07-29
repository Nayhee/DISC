using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;

namespace DISC.Repositories
{
    public abstract class BaseRepository //abstract means it can only be used by inheritance. 
    {
        private readonly string _connectionString; //children can't access it. 

        public BaseRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }

        protected SqlConnection Connection //this class and children can see it.
        {
            get
            {
                return new SqlConnection(_connectionString);
            }
        }
    }
}
