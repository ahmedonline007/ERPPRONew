using ContextERP.Models;
using DtoERP.Dto;
using System;
using System.Collections.Generic;
using System.Text;

namespace IERPRepository.IERPRepository
{
    public interface IUsersRepository : IGenericRepository<TblUser>
    {
        bool? checkExistName(string name, string userName, int? id = 0);
        List<DtoUsers> selectAllUsers();
        void deleteUser(int? id);
        DtoUsers AddEditUsers(DtoUsers dtoUsers);
        object login(string userName, string password);
        void BackupDB();
    }
}
