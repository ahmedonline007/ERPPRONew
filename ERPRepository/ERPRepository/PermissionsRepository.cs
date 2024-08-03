using ContextERP.Models;
using IERPRepository.IERPRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ERPRepository.ERPRepository
{
    public class PermissionsRepository : GenericRepository<ERPDBContext, TblPermission>, IPermissionsRepository
    {
        public bool? SelectPermission(int? userId, int? PermissionId)
        {
            var result = FindBy(x => x.UserId == userId && x.PermissionId == PermissionId).Select(x => x.PermissionValues).FirstOrDefault();

            return result;
        }

        public void AddEditPermissionUsers(int? userId, int? permissionId, bool? value)
        {
            var isExist = FindBy(x => x.UserId == userId && x.PermissionId == permissionId).FirstOrDefault();

            if (isExist != null)
            {
                isExist.PermissionValues = value;

                Edit(isExist);
                Save();
            }
            else
            {
                var obj = new TblPermission()
                {
                    UserId = userId,
                    PermissionId = permissionId,
                    PermissionValues = value
                };

                Add(obj);
                Save();
            }
        }

        public List<int?> selectPermissionByUserId(int? userId)
        {
            var result = FindBy(x => x.UserId == userId && x.PermissionValues == true).Select(x => x.PermissionId).ToList();

            return result;
        }
    }
}
