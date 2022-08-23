using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Linq;
using DISC.Utils;
using DISC.Models;

namespace DISC.Repositories
{
    public class PaymentRepository : IPaymentRepository
    {
        private readonly string _connectionString;
        public PaymentRepository(IConfiguration configuration)
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


        public List<Payment> GetAllPayments()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"  SELECT p.*, up.Name
                                            FROM Payment p
                                            JOIN UserProfile up ON up.Id=p.UserProfileId
                                            ORDER BY p.PaymentDate desc
                    ";

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        List<Payment> payments = new List<Payment>();
                        while (reader.Read())
                        {
                            Payment payment = new Payment
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                OrderId = DbUtils.GetInt(reader, "OrderId"),
                                UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                                Amount = DbUtils.GetDec(reader, "Amount"),
                                PaymentDate = DbUtils.GetDateTime(reader, "PaymentDate"),
                                UserProfile = new UserProfile()
                                {
                                    Id = DbUtils.GetInt(reader, "UserProfileId"),
                                    Name = DbUtils.GetString(reader, "Name"),
                                }
                            };
                            payments.Add(payment);
                        }
                        return payments;
                    }
                }
            }
        }

        public Payment GetPaymentById(int paymentId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT p.*, up.Name
                                        FROM Payment p
                                        JOIN UserProfile up ON up.Id=p.UserProfileId
                                        WHERE p.Id=@id
                    ";
                    cmd.Parameters.AddWithValue("@id", paymentId);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            Payment payment = new Payment
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                OrderId = DbUtils.GetInt(reader, "OrderId"),
                                UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                                Amount = DbUtils.GetDec(reader, "Amount"),
                                PaymentDate = DbUtils.GetDateTime(reader, "PaymentDate"),
                                UserProfile = new UserProfile()
                                {
                                    Id = DbUtils.GetInt(reader, "UserProfileId"),
                                    Name = DbUtils.GetString(reader, "Name"),
                                }
                            };
                            return payment;
                        }
                        else
                        {
                            return null;
                        }
                    }
                }
            }
        }


        public void AddPayment(Payment payment)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @" INSERT INTO Payment (OrderId, UserProfileId, Amount, PaymentDate)
                                            OUTPUT INSERTED.ID                                          
                                            VALUES (@orderId, @userProfileId, @amount, @paymentDate)";
                    DbUtils.AddParameter(cmd, "@orderId", payment.OrderId);
                    DbUtils.AddParameter(cmd, "@userProfileId", payment.UserProfileId);
                    DbUtils.AddParameter(cmd, "@amount", payment.Amount);
                    DbUtils.AddParameter(cmd, "@paymentDate", payment.PaymentDate);

                    int id = (int)cmd.ExecuteScalar();
                    payment.Id = id;

                }
            }
        }


        public void UpdatePayment(Payment payment)
        {
            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE Payment
                                        SET Amount = @amount,
                                            PaymentDate = @paymentDate
                                        WHERE Id = @id
                    ";
                    DbUtils.AddParameter(cmd, "@amount", payment.Amount);
                    DbUtils.AddParameter(cmd, "@paymentDate", payment.PaymentDate);
                    DbUtils.AddParameter(cmd, "@id", payment.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
