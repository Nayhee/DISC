using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Linq;
using DISC.Utils;
using DISC.Models;

namespace DISC.Repositories
{
    public class OrderRepository : IOrderRepository
    {
        private readonly string _connectionString;
        public OrderRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }

        public SqlConnection Connection
        {
            get
            {
                return new SqlConnection(_connectionString);
            }
        }

        public void AddOrder(Order order)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @" INSERT INTO Orders (UserId, CartId, Date, Total, ShippingAddress, Shipping City, ShippingState, ShippingZip, IsPaymentReceived )
                                            OUTPUT INSERTED.ID                                          
                                            VALUES (@userId, @cartId, @date, @total, @shippingAddress, @shippingCity, @shippingZip, @isPaymentReceived)";
                    DbUtils.AddParameter(cmd, "@userId", order.UserId);
                    DbUtils.AddParameter(cmd, "@cartId", order.CartId);
                    DbUtils.AddParameter(cmd, "@date", order.Date);
                    DbUtils.AddParameter(cmd, "@total", order.Total);
                    DbUtils.AddParameter(cmd, "@shippingAddress", order.ShippingAddress);
                    DbUtils.AddParameter(cmd, "@shippingCity", order.ShippingCity);
                    DbUtils.AddParameter(cmd, "@shippingZip", order.ShippingZip);
                    DbUtils.AddParameter(cmd, "@isPaymentReceived", order.IsPaymentReceived);

                    int id = (int)cmd.ExecuteScalar();
                    order.Id = id;

                }
            }
        }


    }
}
