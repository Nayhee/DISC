using DISC.Models;
using Microsoft.Data.SqlClient;

namespace DISC.Repositories
{
    public interface IPaymentRepository
    {
        SqlConnection Connection { get; }

        void AddPayment(Payment payment);
    }
}