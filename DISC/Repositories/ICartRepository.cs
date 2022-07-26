using DISC.Models;
using Microsoft.Data.SqlClient;
using System.Collections.Generic;

namespace DISC.Repositories
{
    public interface ICartRepository
    {
        SqlConnection Connection { get; }

        void AddCart(Cart cart);
        //void DeleteCart(int cartId);
        List<Disc> GetACartsDiscs(int cartId);
        int GetCartDiscId(int cartId, int discId);
        //Cart GetCartById(int cartId);
        Cart GetUsersCurrentCart(int userId);

        void AddDiscToCart(CartDisc cartDisc);
        void RemoveDiscFromCart(int cartDiscId);
    }
}