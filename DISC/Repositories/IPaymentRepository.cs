using DISC.Models;
using Microsoft.Data.SqlClient;
using System.Collections.Generic;

namespace DISC.Repositories
{
    public interface IPaymentRepository
    {
        SqlConnection Connection { get; }

        void AddPayment(Payment payment);
        void UpdatePayment(Payment payment);
        Payment GetPaymentById(int paymentId);
        List<Payment> GetAllPayments();
    }
}