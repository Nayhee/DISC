using DISC.Models;
using System.Collections.Generic;

namespace DISC.Repositories
{
    public interface IUserProfileRepository
    {
        void AddUser(UserProfile userProfile);
        void DeleteUser(int userId);
        List<UserProfile> GetAllUsers();
        UserProfile GetUserByFirebaseId(string firebaseUserId);
        UserProfile GetUserById(int id);
        void UpdateUser(UserProfile profile);
    }
}