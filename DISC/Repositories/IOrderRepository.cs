using DISC.Models;
using Microsoft.Data.SqlClient;

namespace DISC.Repositories
{
    public interface IOrderRepository
    {
        SqlConnection Connection { get; }

        void AddOrder(Order order);
    }
}