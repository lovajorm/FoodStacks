using FoodStacks.Bo;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace FoodStacks.Dal
{
    public class FoodStacksDbContext : DbContext
    {
        public FoodStacksDbContext(DbContextOptions<FoodStacksDbContext> options)
            : base(options)
        {
        }

        public DbSet<Food> Food { get; set; }
    }
}
