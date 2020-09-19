using FoodStacks.Dto.Dto;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace FoodStacks.Api.Interfaces
{
    public interface IFoodService
    {
        Task<List<FoodDto>> GetAllFood();
        Task AddFood(FoodDto food);
        Task UpdateFood(FoodDto food);
        Task DeleteFood(int id);
    }
}
