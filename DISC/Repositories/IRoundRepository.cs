using DISC.Models;
using Microsoft.Data.SqlClient;
using System.Collections.Generic;

namespace DISC.Repositories
{
    public interface IRoundRepository
    {
        SqlConnection Connection { get; }

        void AddRound(Round round);

        List<Round> GetAUsersRounds(int userProfileId);

        void DeleteRound(int roundId);
    }
}