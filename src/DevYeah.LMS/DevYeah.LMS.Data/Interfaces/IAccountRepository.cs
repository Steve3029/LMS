﻿using DevYeah.LMS.Models;

namespace DevYeah.LMS.Data.Interfaces
{
    public interface IAccountRepository : IRepository<Account>
    {
        Account GetUniqueAccountByEmail(string email);
    }
}
