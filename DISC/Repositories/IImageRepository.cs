using System.IO;

namespace DISC.Repositories
{
    public interface IImageRepository
    {
        int CreateImage(byte[] imageData, string imageName);
        //void DeleteImage(int? id);
        Stream GetImageStreamById(int id);
    }
}