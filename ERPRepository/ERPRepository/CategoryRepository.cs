using ContextERP.Models;
using DtoERP.Dto;
using IERPRepository.IERPRepository;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ERPRepository.ERPRepository
{
    public class CategoryRepository : GenericRepository<ERPDBContext, TblCategory>, ICategoryRepository
    { 
        public DtoCategory AddEditCategory(DtoCategory dtoCategory)
        {
            if (dtoCategory != null)
            {
                if (dtoCategory.id > 0)
                {
                    var isExist = FindBy(x => x.Id == dtoCategory.id).FirstOrDefault();

                    if (isExist != null)
                    {
                        isExist.Name = dtoCategory.name;

                        Edit(isExist);
                        Save();
                    }
                }
                else
                {
                    var objCat = new TblCategory()
                    {
                        Name = dtoCategory.name
                    };

                    Add(objCat);
                    Save();

                    dtoCategory.id = objCat.Id;

                    return dtoCategory;
                }
            }

            return dtoCategory;
        }
        public List<DtoCategory> selectAllCategory()
        {
            var result = (from q in Context.TblCategories.AsNoTracking().Where(x => x.IsDelete == null)
                          select new DtoCategory
                          {
                              id = q.Id,
                              name = q.Name
                          }).OrderBy(x => x.name).ToList();

            return result;
        }
        public void deleteCategory(int? id)
        {
            var isExist = FindBy(x => x.Id == id).FirstOrDefault();

            if (isExist != null)
            {
                isExist.IsDelete = true;

                Edit(isExist);
                Save();
            }
        }
        public bool? CheckExistsCategory(string name, int? id = 0)
        {
            var isExist = FindBy(x => x.Id != id && x.Name == name && x.IsDelete == null).Any();

            return isExist;
        }      
    }
}
