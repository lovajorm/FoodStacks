using AutoMapper;
using FoodStacks.Bo;
using FoodStacks.Dto.Dto;
using System;
using System.Collections.Generic;
using System.Text;

namespace FoodStacks.Common.Automapper
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<Food, FoodDto>().ReverseMap();
        }
    }
}
