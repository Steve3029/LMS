﻿using System;
using System.Collections.Generic;

namespace DevYeah.LMS.Models
{
    public partial class Category : IModel
    {
        public Category()
        {
            CourseCategory = new HashSet<CourseCategory>();
        }

        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Icon { get; set; }

        public virtual ICollection<CourseCategory> CourseCategory { get; set; }
    }
}
