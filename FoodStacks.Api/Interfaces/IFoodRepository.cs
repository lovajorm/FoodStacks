using FoodStacks.Bo;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace FoodStacks.Api.Interfaces
{
    public interface IFoodRepository
    {
        Task<List<Food>> GetAllFood();
        Task AddFood(Food food);
        Task UpdateFood(Food food);
        Task DeleteFood(int id);
    }
}
