﻿using DevYeah.LMS.Data.Interfaces;
using DevYeah.LMS.Models;
using Microsoft.EntityFrameworkCore;

namespace DevYeah.LMS.Data
{
    public class CategoryRepository : Repository<Category>, ICategoryRepository
    {
        public CategoryRepository(DbContext dbContext) : base(dbContext)
        {
        }
    }
}
