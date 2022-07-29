using DISC.Models;
using System.Collections.Generic;

namespace DISC.Repositories
{
    public interface IDiscRepository
    {
        void AddDisc(Disc disc);
        void DeleteDisc(int discId);
        List<Brand> GetAllBrands();
        List<Tag> GetAllTags();
        List<Disc> GetAllDiscsForSale();
        Disc GetDiscById(int id);
        void UpdateDisc(Disc disc);
        List<Disc> SearchDiscByName(string query);
    }
}