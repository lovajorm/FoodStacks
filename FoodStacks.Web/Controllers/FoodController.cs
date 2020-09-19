using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FoodStacks.Api.Interfaces;
using FoodStacks.Dto.Dto;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FoodStacks.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FoodController : ControllerBase
    {
        private readonly IFoodService _foodService;
        public FoodController(IFoodService foodService)
        {
            _foodService = foodService;
        }
        // GET api/food
        [HttpGet]
        public async Task<List<FoodDto>> GetAllFood()
        {
                //_log.Info("Listing all recipes.");
                return await _foodService.GetAllFood();
        }
        // POST api/food/add
        [HttpPost("add")]
        public async Task<IActionResult> AddFood([FromBody]FoodDto food)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest();

                await _foodService.AddFood(food);
                //_log.Info("Creating a new recipe.");
                return Ok($"Food was added successfully :)");
            }
            catch (Exception e)
            {
                //_log.Error($"Failed to create recipe. {e}");
                return BadRequest($"Failed to add food. {e}");
            }
        }
        // POST api/food/update
        [HttpPut("update")]
        public async Task<IActionResult> UpdateFood([FromBody] FoodDto food)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest();

                await _foodService.AddFood(food);
                //_log.Info("Creating a new recipe.");
                return Ok($"Food was updated successfully :)");
            }
            catch (Exception e)
            {
                //_log.Error($"Failed to create recipe. {e}");
                return BadRequest($"Failed to update food. {e}");
            }
        }
        // DELETE api/food/delete
        [HttpDelete("delete")]
        public async Task<IActionResult> DeleteFood([FromBody] int id)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest();

                await _foodService.DeleteFood(id);
                //_log.Info("Creating a new recipe.");
                return Ok($"Food was deleted successfully :)");
            }
            catch (Exception e)
            {
                //_log.Error($"Failed to create recipe. {e}");
                return BadRequest($"Failed to delete food. {e}");
            }
        }
    }
}
