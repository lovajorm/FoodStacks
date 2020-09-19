using AutoMapper;
using FoodStacks.Api.Interfaces;
using FoodStacks.Bo;
using FoodStacks.Dto.Dto;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace FoodStacks.Bl.Services
{
    public class FoodService : IFoodService
    {
        private readonly IFoodRepository _foodRepository;
        private readonly IMapper _mapper;
        public FoodService(IFoodRepository foodRepository, IMapper mapper)
        {
            _foodRepository = foodRepository;
            _mapper = mapper;
        }
        public async Task<List<FoodDto>> GetAllFood()
        {
            return _mapper.Map<List<Food>, List<FoodDto>>(await _foodRepository.GetAllFood());
        }
        public async Task AddFood(FoodDto food)
        {
            await _foodRepository.AddFood(_mapper.Map<Food>(food));
        }
        public async Task DeleteFood(int id)
        {
            await _foodRepository.DeleteFood(id);
        }
        public async Task UpdateFood(FoodDto food)
        {
            await _foodRepository.UpdateFood(_mapper.Map<Food>(food));
        }
    }
}
