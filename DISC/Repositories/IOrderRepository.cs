using DISC.Models;
using Microsoft.Data.SqlClient;
using System.Collections.Generic;

namespace DISC.Repositories
{
    public interface IOrderRepository
    {
        SqlConnection Connection { get; }

        void AddOrder(Order order);
        Order GetOrderById(int orderId);

        void UpdateOrder(Order order);

        List<Order> GetAllOrders();

        Order GetUsersMostRecentOrder(int userId);
    }
}