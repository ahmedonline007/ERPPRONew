using ContextERP.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace IERPRepository.IERPRepository
{
    public interface IPermissionsRepository : IGenericRepository<TblPermission>
    {
        bool? SelectPermission(int? userId, int? PermissionId);
        void AddEditPermissionUsers(int? userId, int? permissionId, bool? value);
        List<int?> selectPermissionByUserId(int? userId);
    }
}
