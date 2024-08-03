using System;
using System.Collections.Generic;

#nullable disable

namespace ContextERP.Models
{
    public partial class TblExpencesTo
    {
        public int Id { get; set; }
        public string ExpencesToName { get; set; }
        public DateTime? Date { get; set; }
        public decimal? Cost { get; set; }
        public string Description { get; set; }
        public bool? IsDeleted { get; set; }
    }
}
