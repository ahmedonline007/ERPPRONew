using System;
using System.Collections.Generic;

#nullable disable

namespace ContextERP.Models
{
    public partial class TblExpence
    {
        public int Id { get; set; }
        public string ExpencesName { get; set; }
        public DateTime? Date { get; set; }
        public decimal? Cost { get; set; }
        public string Description { get; set; }
        public bool? IsDelete { get; set; }
    }
}
