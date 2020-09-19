using FoodStacks.Api.Interfaces;
using FoodStacks.Bo;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FoodStacks.Dal.Repositories
{
    public class FoodRepository : IFoodRepository
    {
        private readonly DbContextOptions<FoodStacksDbContext> _options;
        public FoodRepository(DbContextOptions<FoodStacksDbContext> options)
        {
            _options = options;
        }
        public async Task<List<Food>> GetAllFood()
        {
            var foods = new List<Food>();
            using (var db = new FoodStacksDbContext(_options))
            {
                foods = await db.Food.ToListAsync();
                db.SaveChanges();
            }
            return foods;
        }
        public async Task AddFood(Food food)
        {
            using (var db = new FoodStacksDbContext(_options))
            {
                if(food.Title != null)
                {
                    await db.Food.AddAsync(food);
                    db.SaveChanges();
                }
                throw new Exception();
            }
        }
        public async Task UpdateFood(Food food)
        {
            using (var db = new FoodStacksDbContext(_options))
            {
                var upFood = db.Food.FirstOrDefault(f => f.Id == food.Id);
                db.Food.Update(upFood);
                db.SaveChanges();
            }
        }
        public async Task DeleteFood(int id)
        {
            using (var db = new FoodStacksDbContext(_options))
            {
                var food = db.Food.FirstOrDefault(f => f.Id == id);
                db.Food.Remove(food);
                db.SaveChanges();
            }              
        }
    }
}
