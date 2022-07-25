using DISC.Models;
using Microsoft.Data.SqlClient;
using System.Collections.Generic;

namespace DISC.Repositories
{
    public interface ICartRepository
    {
        SqlConnection Connection { get; }

        void AddCart(Cart cart);
        void DeleteCart(int cartId);
        List<Disc> GetACartsDiscs(int cartId);
        Cart GetCartById(int cartId);
        Cart GetUsersCurrentCart(int userId);
    }
}