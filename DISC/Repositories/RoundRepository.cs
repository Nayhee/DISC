using DISC.Models;
using DISC.Utils;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Linq;

namespace DISC.Repositories
{
    public class RoundRepository : IRoundRepository
    {
        private readonly string _connectionString;

        public RoundRepository(IConfiguration configuration)
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

        public void AddRound(Round round)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @" INSERT INTO Round (UserProfileId, Date, Distance, PuttsTaken, PuttsMade)
                                          OUTPUT INSERTED.ID
                                          VALUES (@userProfileI, @date, @distance, @puttsTaken, @puttsMade)";
                    DbUtils.AddParameter(cmd, "@userProfileId", round.UserProfileId);
                    DbUtils.AddParameter(cmd, "@date", round.Date);
                    DbUtils.AddParameter(cmd, "@distance", round.Distance);
                    DbUtils.AddParameter(cmd, "@puttsTaken", round.PuttsTaken);
                    DbUtils.AddParameter(cmd, "@puttsMade", round.PuttsMade);

                    int id = (int)cmd.ExecuteScalar();
                    round.Id = id;
                }
            }
        }

        public List<Round> GetAUsersRounds(int userProfileId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT * FROM Round WHERE UserProfileId = @userProfileId ORDER BY Date DESC";
                    cmd.Parameters.AddWithValue("@userProfileId", userProfileId);
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        List<Round> rounds = new List<Round>();
                        while(reader.Read())
                        {
                            Round round = new Round
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                                Date = DbUtils.GetDateTime(reader, "Date"),
                                Distance = DbUtils.GetInt(reader, "Distance"),
                                PuttsTaken = DbUtils.GetInt(reader, "PuttsTaken"),
                                PuttsMade = DbUtils.GetInt(reader, "PuttsMade"),
                            };
                            rounds.Add(round);
                        };
                        return rounds;
                    }
                }
            }
        }

        //public List<Round> GetTodaysRounds(int userProfileId) //NOT DONE YET! GOTTA ACTUALLY DO THE DATE STUFF
        //{
        //    using (var conn = Connection)
        //    {
        //        conn.Open();
        //        using (var cmd = conn.CreateCommand())
        //        {
        //            cmd.CommandText = @"SELECT * FROM Round WHERE UserProfileId = @userProfileId ORDER BY Date DESC";
        //            cmd.Parameters.AddWithValue("@userProfileId", userProfileId);
        //            using (SqlDataReader reader = cmd.ExecuteReader())
        //            {
        //                List<Round> rounds = new List<Round>();
        //                while (reader.Read())
        //                {
        //                    Round round = new Round
        //                    {
        //                        Id = DbUtils.GetInt(reader, "Id"),
        //                        UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
        //                        Date = DbUtils.GetDateTime(reader, "Date"),
        //                        Distance = DbUtils.GetInt(reader, "Distance"),
        //                        PuttsTaken = DbUtils.GetInt(reader, "PuttsTaken"),
        //                        PuttsMade = DbUtils.GetInt(reader, "PuttsMade"),
        //                    };
        //                    rounds.Add(round);
        //                };
        //                return rounds;
        //            }
        //        }
        //    }
        //}



    }

}

