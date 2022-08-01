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

        public List<Order> GetAllOrders()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT o.Id, o.CartId, o.UserProfileId, o.IsPaymentReceived, o.Total, o.OrderDate, 
                                               up.Name 
                                        FROM Orders o
                                        JOIN UserProfile up ON up.Id=o.UserProfileId
                                        ORDER BY o.OrderDate desc
                                        ";

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        List<Order> orders = new List<Order>();
                        while (reader.Read())
                        {
                            Order order = new Order
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                CartId = DbUtils.GetInt(reader, "CartId"),
                                UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                                Total = DbUtils.GetDec(reader, "Total"),
                                IsPaymentReceived = DbUtils.GetBool(reader, "IsPaymentReceived"),
                                OrderDate = DbUtils.GetDateTime(reader, "OrderDate"),
                                UserProfile = new UserProfile()
                                {
                                    Id = DbUtils.GetInt(reader, "UserProfileId"),
                                    Name = DbUtils.GetString(reader, "Name"),
                                }
                            };
                            orders.Add(order);
                        }
                        return orders;
                    }
                }
            }
        }

        public Order GetOrderById(int orderId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Id, Total, IsPaymentReceived FROM Orders WHERE Id=@orderId";
                    DbUtils.AddParameter(cmd, "@orderId", orderId);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        Order order = null;
                        while (reader.Read())
                        {
                            if (order == null)
                            {
                                order = new Order()
                                {
                                    Id = DbUtils.GetInt(reader, "Id"),
                                    Total = DbUtils.GetDec(reader, "Total"),
                                    IsPaymentReceived = DbUtils.GetBool(reader, "IsPaymentReceived"),
                                };
                            }
                        }
                        return order;
                    }
                }
            }
        }




        public void AddOrder(Order order)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @" INSERT INTO Orders (UserProfileId, CartId, OrderDate, Total, ShippingFirstName, ShippingLastName, ShippingCountry, ShippingAddress, ShippingCity, ShippingState, ShippingZip, IsPaymentReceived )
                                            OUTPUT INSERTED.ID                                          
                                            VALUES (@userProfileId, @cartId, @orderDate, @total, @shippingFirstName, @shippingLastName, @shippingCountry, @shippingAddress, @shippingCity, @shippingState, @shippingZip, @isPaymentReceived)";
                    DbUtils.AddParameter(cmd, "@userProfileId", order.UserProfileId);
                    DbUtils.AddParameter(cmd, "@cartId", order.CartId);
                    DbUtils.AddParameter(cmd, "@orderDate", order.OrderDate);
                    DbUtils.AddParameter(cmd, "@total", order.Total);
                    DbUtils.AddParameter(cmd, "@shippingAddress", order.ShippingAddress);
                    DbUtils.AddParameter(cmd, "@shippingCity", order.ShippingCity);
                    DbUtils.AddParameter(cmd, "@shippingZip", order.ShippingZip);
                    DbUtils.AddParameter(cmd, "@shippingFirstName", order.ShippingFirstName);
                    DbUtils.AddParameter(cmd, "@shippingLastName", order.ShippingLastName);
                    DbUtils.AddParameter(cmd, "@shippingCountry", order.ShippingCountry);
                    DbUtils.AddParameter(cmd, "@shippingState", order.ShippingState);
                    DbUtils.AddParameter(cmd, "@isPaymentReceived", order.IsPaymentReceived);

                    int id = (int)cmd.ExecuteScalar();
                    order.Id = id;

                }
            }
        }


        public void UpdateOrder(Order order)
        {
            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE Orders
                                        SET 
                                            IsPaymentReceived = @isPaymentReceived   
                                            WHERE Id = @id";

                    DbUtils.AddParameter(cmd, "@id", order.Id);
                    DbUtils.AddParameter(cmd, "@isPaymentReceived", order.IsPaymentReceived);

                    cmd.ExecuteNonQuery();
                }
            }
        }


        public Order GetUsersMostRecentOrder(int userId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT TOP 1 Id, Total, OrderDate 
                                        FROM Orders
                                        WHERE UserProfileId=@userId 
                                        ORDER BY OrderDate DESC
                    ";
                    cmd.Parameters.AddWithValue("@userId", userId);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            Order order = new Order
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                Total = DbUtils.GetDec(reader, "Total"),
                                OrderDate = DbUtils.GetDateTime(reader, "OrderDate"),
                            };
                            return order;
                        }
                        else
                        {
                            return null;
                        }
                    }
                }
            }
        }


    }
}
