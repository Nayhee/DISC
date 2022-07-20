using DISC.Models;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using DISC.Utils;
using System.Linq;

namespace DISC.Repositories
{
    public class DiscRepository : BaseRepository, IDiscRepository
    {
        public DiscRepository(IConfiguration configuration) : base(configuration) { }

        public List<Disc> GetAllDiscsForSale()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT d.*, b.Name as BrandName 
                                        FROM Disc d 
                                        JOIN Brand b on b.Id=d.BrandId
                                        WHERE d.ForSale=1";

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        List<Disc> discs = new List<Disc>();
                        while (reader.Read())
                        {
                            Disc disc = new Disc
                            {
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

        public Disc GetDiscById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT d.*,
                                        b.Name as BrandName,
                                        t.Id as TagId, t.Name as TagName
                                        FROM Disc d 
                                        JOIN Brand b on b.Id=d.BrandId
                                        JOIN DiscTag dt on dt.DiscId=d.Id
                                        JOIN Tag t on t.Id=dt.TagId
                                        WHERE d.Id=@id
                    ";
                    DbUtils.AddParameter(cmd, "@id", id);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        Disc disc = null;
                        while (reader.Read())
                        {
                            int discId = DbUtils.GetInt(reader, "Id");

                            if (disc == null)
                            {
                                disc = new Disc()
                                {
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
                                    },
                                    Tags = new List<Tag>()
                                };
                            }
                            if (DbUtils.IsNotDbNull(reader, "TagId"))
                            {
                                disc.Tags.Add(new Tag()
                                {
                                    Id = DbUtils.GetInt(reader, "TagId"),
                                    Name = DbUtils.GetString(reader, "TagName")
                                });
                            }

                        }
                        return disc;
                    }
                }
            }
        }

        public void AddDisc(Disc disc)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Disc ([Name], BrandId, Condition, Speed, Glide, Turn, Fade, Plastic, Price, [ImageURL], Weight, Description, ForSale)
                                        OUTPUT INSERTED.ID
                                        VALUES (@name, @brandId, @condition, @speed, @glide, @turn, @fade, @plastic, @price, @imageURL, @weight, @description, @forSale)";
                    DbUtils.AddParameter(cmd, "@name", disc.Name);
                    DbUtils.AddParameter(cmd, "@brandId", disc.BrandId);
                    DbUtils.AddParameter(cmd, "@condition", disc.Condition);
                    DbUtils.AddParameter(cmd, "@speed", disc.Speed);
                    DbUtils.AddParameter(cmd, "@glide", disc.Glide);
                    DbUtils.AddParameter(cmd, "@turn", disc.Turn);
                    DbUtils.AddParameter(cmd, "@fade", disc.Fade);
                    DbUtils.AddParameter(cmd, "@plastic", disc.Plastic);
                    DbUtils.AddParameter(cmd, "@price", disc.Price);
                    DbUtils.AddParameter(cmd, "@imageURL", disc.ImageUrl);
                    DbUtils.AddParameter(cmd, "@weight", disc.Weight);
                    DbUtils.AddParameter(cmd, "@description", disc.Description);
                    DbUtils.AddParameter(cmd, "@forSale", disc.ForSale);

                    int id = (int)cmd.ExecuteScalar();
                    disc.Id = id;
                }
            }
        }

        public void UpdateDisc(Disc disc)
        {
            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE Disc
                                        SET 
                                            [Name] = @name, 
                                            BrandId = @brandId,
                                            Condition = @condition,
                                            Speed = @speed, 
                                            Glide = @glide,
                                            Turn = @turn,
                                            Fade = @fade, 
                                            Plastic = @plastic,
                                            Price = @price,
                                            ImageURL = @imageURL,
                                            Weight = @weight,
                                            Description = @description,
                                            ForSale = @forSale
                                               
                                            WHERE Id = @id";

                    DbUtils.AddParameter(cmd, "@name", disc.Name);
                    DbUtils.AddParameter(cmd, "@brandId", disc.BrandId);
                    DbUtils.AddParameter(cmd, "@condition", disc.Condition);
                    DbUtils.AddParameter(cmd, "@speed", disc.Speed);
                    DbUtils.AddParameter(cmd, "@glide", disc.Glide);
                    DbUtils.AddParameter(cmd, "@turn", disc.Turn);
                    DbUtils.AddParameter(cmd, "@fade", disc.Fade);
                    DbUtils.AddParameter(cmd, "@plastic", disc.Plastic);
                    DbUtils.AddParameter(cmd, "@price", disc.Price);
                    DbUtils.AddParameter(cmd, "@imageURL", disc.ImageUrl);
                    DbUtils.AddParameter(cmd, "@weight", disc.Weight);
                    DbUtils.AddParameter(cmd, "@description", disc.Description);
                    DbUtils.AddParameter(cmd, "@forSale", disc.ForSale);

                    cmd.ExecuteNonQuery();
                }
            }
        }
        public void DeleteDisc(int discId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @" DELETE FROM Disc WHERE Id=@id";
                    DbUtils.AddParameter(cmd, "@id", discId);
                    cmd.ExecuteNonQuery();
                }
            }
        }

        public List<Brand> GetAllBrands()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @" Select * FROM Brand";

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        List<Brand> brands = new List<Brand>();
                        while (reader.Read())
                        {
                            Brand brand = new Brand
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                Name = DbUtils.GetString(reader, "Name"),
                            };
                            brands.Add(brand);
                        }
                        return brands;
                    }
                }
            }
        }


    }
}
