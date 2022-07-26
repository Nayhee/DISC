using DISC.Models;
using DISC.Utils;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Linq;

namespace DISC.Repositories
{
    public class CartRepository : ICartRepository
    {
        private readonly string _connectionString;

        public CartRepository(IConfiguration configuration)
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

        public void AddCart(Cart cart)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @" INSERT INTO Cart (UserProfileId, DateCreated)
                                          OUTPUT INSERTED.ID
                                          VALUES (@userId, @dateCreated)";
                    DbUtils.AddParameter(cmd, "@userId", cart.UserProfileId);
                    DbUtils.AddParameter(cmd, "@dateCreated", cart.DateCreated);

                    int id = (int)cmd.ExecuteScalar();
                    cart.Id = id;
                }
            }
        }

        public Cart GetUsersCurrentCart(int userId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT TOP 1 c.Id, c.UserProfileId, c.DateCreated FROM Cart c WHERE c.UserProfileId=@userId ORDER BY c.DateCreated DESC";
                    cmd.Parameters.AddWithValue("@userId", userId);
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            Cart cart = new Cart()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                                DateCreated = DbUtils.GetDateTime(reader, "DateCreated"),
                            };
                            cart.Discs = GetACartsDiscs(cart.Id);
                            return cart;
                        }
                        else
                        {
                            return null;
                        }
                    }
                }
            }
        }


        public List<Disc> GetACartsDiscs(int cartId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @" SELECT cd.Id as CartDiscId, c.Id as CartId, d.*, b.Name as BrandName 
                                        FROM disc d  
                                        JOIN Brand b on b.Id=d.BrandId
                                        LEFT JOIN CartDisc cd on cd.DiscId=d.Id
                                        LEFT JOIN Cart c on c.Id=cd.CartId
                                        where c.Id=@id;
                    ";
                    cmd.Parameters.AddWithValue("@id", cartId);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        List<Disc> discs = new List<Disc>();
                        while (reader.Read())
                        {
                            Disc disc = new Disc
                            {
                                CartDiscId = DbUtils.GetInt(reader,"CartDiscId"),
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

        public int GetCartDiscId(int cartId, int discId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @" SELECT Id AS CartDiscId 
                                            FROM CartDisc
                                            WHERE CartId=@cartId AND DiscId=@discId;
                    ";
                    DbUtils.AddParameter(cmd, "@cartId", cartId);
                    DbUtils.AddParameter(cmd, "@discId", discId);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        var num = 0;
                        if (reader.Read())
                        {
                            num = DbUtils.GetInt(reader, "CartDiscId");
                        }
                        return num;
                    }
                }
            }
        }

        //public Cart GetCartById(int cartId)
        //{
        //    using (var conn = Connection)
        //    {
        //        conn.Open();
        //        using (var cmd = conn.CreateCommand())
        //        {
        //            cmd.CommandText = @"SELECT c.*, u.id as UsersId, u.Name
        //                                FROM Cart c 
        //                                JOIN UserProfile u on u.Id=c.UserId
        //                                WHERE c.Id=@id
        //            ";
        //            cmd.Parameters.AddWithValue("@id", cartId);

        //            using (SqlDataReader reader = cmd.ExecuteReader())
        //            {
        //                if (reader.Read())
        //                {
        //                    Cart cart = new Cart
        //                    {
        //                        Id = reader.GetInt32(reader.GetOrdinal("Id")),
        //                        UserProfileId = reader.GetInt32(reader.GetOrdinal("UserId")),
        //                        UserProfile = new UserProfile
        //                        {
        //                            Id = reader.GetInt32(reader.GetOrdinal("UsersId")),
        //                            Name = reader.GetString(reader.GetOrdinal("Name")),
        //                        }
        //                    };
        //                    cart.Discs = GetACartsDiscs(cart.Id);
        //                    return cart;
        //                }
        //                else
        //                {
        //                    return null;
        //                }
        //            }
        //        }
        //    }
        //}

        public void AddDiscToCart(CartDisc cartDisc)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @" INSERT INTO CartDisc (CartId, DiscId, UserProfileId)
                                          VALUES (@cartId, @discId, @userId);";
                    DbUtils.AddParameter(cmd, "@cartId", cartDisc.CartId);
                    DbUtils.AddParameter(cmd, "@discId", cartDisc.DiscId);
                    DbUtils.AddParameter(cmd, "@userId", cartDisc.UserProfileId);

                    cmd.ExecuteScalar();

                }
            }
        }

        public void RemoveDiscFromCart(int cartDiscId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @" DELETE FROM CartDisc WHERE Id=@id;
                    ";
                    DbUtils.AddParameter(cmd, "@id", cartDiscId);
                    cmd.ExecuteNonQuery();
                }
            }
        }




        //public void DeleteCart(int cartId)
        //{
        //    using (var conn = Connection)
        //    {
        //        conn.Open();
        //        using (var cmd = conn.CreateCommand())
        //        {
        //            cmd.CommandText = @" DELETE FROM Cart WHERE Id = @id";
        //            cmd.Parameters.AddWithValue("@id", cartId);
        //        }
        //    }
        //}

    }

}

