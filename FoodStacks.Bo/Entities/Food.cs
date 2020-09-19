using FoodStacks.Dto.Enum;
using System;
using System.Collections.Generic;
using System.Text;

namespace FoodStacks.Bo
{
    public class Food
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public Category Category { get; set; }
        public DateTime BestBefore { get; set; }
    }
}
