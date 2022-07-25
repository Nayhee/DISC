using System.IO;

namespace DISC.Repositories
{
    public interface IImageRepository
    {
        int CreateImage(byte[] imageData);
        //void DeleteImage(int? id);
        Stream GetImageStreamById(int id);
    }
}