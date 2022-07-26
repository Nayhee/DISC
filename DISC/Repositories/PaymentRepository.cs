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


        public void AddPayment(Payment payment)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @" INSERT INTO Payment (OrderId, UserId, Amount, PaymentDate)
                                            OUTPUT INSERTED.ID                                          
                                            VALUES (@orderId, @userId, @amount, @paymentDate)";
                    DbUtils.AddParameter(cmd, "@orderId", payment.OrderId);
                    DbUtils.AddParameter(cmd, "@userId", payment.UserId);
                    DbUtils.AddParameter(cmd, "@amount", payment.Amount);
                    DbUtils.AddParameter(cmd, "@paymentDate", payment.PaymentDate);

                    int id = (int)cmd.ExecuteScalar();
                    payment.Id = id;

                }
            }
        }
    }
}
