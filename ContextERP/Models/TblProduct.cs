using System;
using System.Collections.Generic;

#nullable disable

namespace ContextERP.Models
{
    public partial class TblProduct
    {
        public TblProduct()
        {
            TblInvoicesDetails = new HashSet<TblInvoicesDetail>();
            TblLengths = new HashSet<TblLength>();
            TblProductNumbers = new HashSet<TblProductNumber>();
            TblProductSizes = new HashSet<TblProductSize>();
            TblPurchaseOrderDetails = new HashSet<TblPurchaseOrderDetail>();
            TblReturnInvoicesDetails = new HashSet<TblReturnInvoicesDetail>();
            TblReturnPurchaseOrderDetails = new HashSet<TblReturnPurchaseOrderDetail>();
            TblTransactionProductNumbers = new HashSet<TblTransactionProductNumber>();
            TblTransactionProductSizes = new HashSet<TblTransactionProductSize>();
        }

        public int Id { get; set; }
        public int? CategoryId { get; set; }
        public string Name { get; set; }
        public decimal? PriceSupplier { get; set; }
        public decimal? PriceSelling { get; set; }
        public bool? Type { get; set; }
        public bool? IsDelete { get; set; }

        public virtual TblCategory Category { get; set; }
        public virtual ICollection<TblInvoicesDetail> TblInvoicesDetails { get; set; }
        public virtual ICollection<TblLength> TblLengths { get; set; }
        public virtual ICollection<TblProductNumber> TblProductNumbers { get; set; }
        public virtual ICollection<TblProductSize> TblProductSizes { get; set; }
        public virtual ICollection<TblPurchaseOrderDetail> TblPurchaseOrderDetails { get; set; }
        public virtual ICollection<TblReturnInvoicesDetail> TblReturnInvoicesDetails { get; set; }
        public virtual ICollection<TblReturnPurchaseOrderDetail> TblReturnPurchaseOrderDetails { get; set; }
        public virtual ICollection<TblTransactionProductNumber> TblTransactionProductNumbers { get; set; }
        public virtual ICollection<TblTransactionProductSize> TblTransactionProductSizes { get; set; }
    }
}
