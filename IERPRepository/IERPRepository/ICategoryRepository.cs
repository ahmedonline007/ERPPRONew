using ContextERP.Models;
using DtoERP.Dto;
using System;
using System.Collections.Generic;
using System.Text;

namespace IERPRepository.IERPRepository
{
   public interface ICategoryRepository : IGenericRepository<TblCategory>
    {
        DtoCategory AddEditCategory(DtoCategory dtoCategory);
        List<DtoCategory> selectAllCategory();
        void deleteCategory(int? id);
        bool? CheckExistsCategory(string name, int? id = 0);        
    }
}
