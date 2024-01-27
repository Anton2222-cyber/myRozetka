﻿using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using WebRozetka.Data.Entities.Orders;

namespace WebRozetka.Data.Entities
{
    [Table("tblProducts")]
    public class ProductEntity : BaseEntity<int>
    {
        [Required, StringLength(255)]
        public string Name { get; set; }

        [StringLength(4000)]
        public string Description { get; set; }

        public decimal Price { get; set; }
        public int Quantity { get; set; }

        [ForeignKey("Category")]
        public int CategoryId { get; set; }
        public virtual CategoryEntity Category { get; set; }
        public virtual ICollection<ProductImageEntity> ProductImages { get; set; }
        public virtual ICollection<BasketEntity> Baskets { get; set;}

        public virtual ICollection<OrderItemEntity> OrderItems { get; set; }
    }
}
