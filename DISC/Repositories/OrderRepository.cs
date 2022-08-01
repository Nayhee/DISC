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
                    cmd.CommandText = @"SELECT o.*, up.Name 
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
                                UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                                CartId = DbUtils.GetInt(reader, "CartId"),
                                Total = DbUtils.GetDec(reader, "Total"),
                                IsPaymentReceived = DbUtils.GetBool(reader, "IsPaymentReceived"),
                                OrderDate = DbUtils.GetDateTime(reader, "OrderDate"),
                                ShippingAddress = DbUtils.GetString(reader, "ShippingAddress"),
                                ShippingCity = DbUtils.GetString(reader, "ShippingCity"),
                                ShippingZip = DbUtils.GetString(reader, "ShippingZip"),
                                ShippingFirstName = DbUtils.GetString(reader, "ShippingFirstName"),
                                ShippingLastName = DbUtils.GetString(reader, "ShippingLastName"),
                                ShippingCountry = DbUtils.GetString(reader, "ShippingCountry"),
                                UserProfile = new UserProfile()
                                {
                                    Id = DbUtils.GetInt(reader, "UserProfileId"),
                                    Name = DbUtils.GetString(reader, "Name"),
                                }
                            };
                            order.Discs = GetAOrdersDiscs(order.Id);
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
                    cmd.CommandText = @"SELECT o.*, up.Name
                                        FROM Orders o
                                        JOIN UserProfile up ON up.Id=o.UserProfileId 
                                        WHERE o.Id=@orderId";
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
                                    UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                                    CartId = DbUtils.GetInt(reader, "CartId"),
                                    OrderDate = DbUtils.GetDateTime(reader, "OrderDate"),
                                    Total = DbUtils.GetDec(reader, "Total"),
                                    IsPaymentReceived = DbUtils.GetBool(reader, "IsPaymentReceived"),
                                    ShippingAddress = DbUtils.GetString(reader, "ShippingAddress"),
                                    ShippingCity = DbUtils.GetString(reader, "ShippingCity"),
                                    ShippingZip = DbUtils.GetString(reader, "ShippingZip"),
                                    ShippingFirstName = DbUtils.GetString(reader, "ShippingFirstName"),
                                    ShippingLastName= DbUtils.GetString(reader, "ShippingLastName"),
                                    ShippingCountry = DbUtils.GetString(reader, "ShippingCountry"),
                                    UserProfile = new UserProfile()
                                    {
                                        Id = DbUtils.GetInt(reader, "UserProfileId"),
                                        Name = DbUtils.GetString(reader, "Name"),
                                    }
                                };
                            }
                        }
                        order.Discs = GetAOrdersDiscs(orderId);
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


        public void UpdateOrdersPaymentStatus(Order order)
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


        public List<Disc> GetAOrdersDiscs(int orderId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @" SELECT d.*, cd.Id as CartDiscId, b.Name as BrandName
                                            FROM Disc d 
                                            JOIN Brand b on b.Id=d.BrandId
                                            JOIN CartDisc cd ON cd.DiscId=d.Id
                                            JOIN Cart c on c.Id=cd.CartId
                                            JOIN Orders o on o.CartId=c.Id
                                            WHERE o.Id=@orderId
                    ";
                    cmd.Parameters.AddWithValue("@orderId", orderId);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        List<Disc> discs = new List<Disc>();
                        while (reader.Read())
                        {
                            Disc disc = new Disc
                            {
                                CartDiscId = DbUtils.GetInt(reader, "CartDiscId"),
                                Id = DbUtils.GetInt(reader, "Id"),
                                Name = DbUtils.GetString(reader, "Name"),
                                BrandId = DbUtils.GetInt(reader, "BrandId"),
                                Condition = DbUtils.GetString(reader, "Condition"),
                                Speed = DbUtils.GetInt(reader, "Speed"),
                                Glide = DbUtils.GetInt(reader, "Glide"),
                                Turn = DbUtils.GetInt(reader, "Turn"),
                                Fade = DbUtils.GetInt(reader, "Fade"),
                                Plastic = DbUtils.GetString(reader, "Plastic"),
                                Price = DbUtils.GetInt(reader, "Price"),
                                Weight = DbUtils.GetInt(reader, "Weight"),
                                ImageUrl = DbUtils.GetString(reader, "ImageUrl"),
                                ForSale = DbUtils.GetBool(reader, "ForSale"),
                                Description = DbUtils.GetString(reader, "Description"),
                                Brand = new Brand()
                                {
                                    Id = DbUtils.GetInt(reader, "BrandId"),
                                    Name = DbUtils.GetString(reader, "BrandName"),
                                }
                            };
                            discs.Add(disc);
                        }
                        return discs;
                    }
                }
            }
        }


        //public Order GetUsersMostRecentOrder(int userId)
        //{
        //    using (var conn = Connection)
        //    {
        //        conn.Open();
        //        using (var cmd = conn.CreateCommand())
        //        {
        //            cmd.CommandText = @"SELECT TOP 1 Id, Total, OrderDate 
        //                                FROM Orders
        //                                WHERE UserProfileId=@userId 
        //                                ORDER BY OrderDate DESC
        //            ";
        //            cmd.Parameters.AddWithValue("@userId", userId);

        //            using (SqlDataReader reader = cmd.ExecuteReader())
        //            {
        //                if (reader.Read())
        //                {
        //                    Order order = new Order
        //                    {
        //                        Id = DbUtils.GetInt(reader, "Id"),
        //                        Total = DbUtils.GetDec(reader, "Total"),
        //                        OrderDate = DbUtils.GetDateTime(reader, "OrderDate"),
        //                    };
        //                    return order;
        //                }
        //                else
        //                {
        //                    return null;
        //                }
        //            }
        //        }
        //    }
        //}


    }
}
