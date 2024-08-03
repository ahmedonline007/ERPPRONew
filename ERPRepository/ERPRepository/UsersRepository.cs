using ContextERP.Models;
using DtoERP.Dto;
using IERPRepository.IERPRepository;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq; 

namespace ERPRepository.ERPRepository
{
    public class UsersRepository : GenericRepository<ERPDBContext, TblUser>, IUsersRepository
    {
        private readonly IPermissionsRepository _permissionsRepository;

        public UsersRepository(IPermissionsRepository permissionsRepository)
        {
            _permissionsRepository = permissionsRepository;
        }

        public DtoUsers AddEditUsers(DtoUsers dtoUsers)
        {
            if (dtoUsers != null)
            {
                if (dtoUsers.id > 0)
                {
                    var isExist = FindBy(x => x.Id == dtoUsers.id).FirstOrDefault();

                    if (isExist != null)
                    {
                        isExist.Name = dtoUsers.name;
                        isExist.UserName = dtoUsers.userName;
                        isExist.Password = dtoUsers.password;

                        Edit(isExist);
                        Save();
                    }
                }
                else
                {
                    var obj = new TblUser()
                    {
                        Name = dtoUsers.name,
                        UserName = dtoUsers.userName,
                        Password = dtoUsers.password
                    };

                    Add(obj);
                    Save();

                    dtoUsers.id = obj.Id;

                    return dtoUsers;
                }
            }

            return dtoUsers;
        }

        public void deleteUser(int? id)
        {
            var isExist = FindBy(x => x.Id == id).FirstOrDefault();

            if (isExist != null)
            {
                isExist.IsDelete = true;

                Edit(isExist);
                Save();
            }
        }

        public List<DtoUsers> selectAllUsers()
        {
            var result = (from q in Context.TblUsers.AsNoTracking().Where(x => x.IsDelete == null)
                          select new DtoUsers
                          {
                              id = q.Id,
                              name = q.Name,
                              userName = q.UserName,
                              password = q.Password
                          }).OrderByDescending(x => x.id).ToList();

            return result;
        }

        public bool? checkExistName(string name, string userName, int? id = 0)
        {
            var isExist = FindBy(x => x.Id != id && x.Name == name && x.UserName == userName && x.IsDelete == null).Any();

            return isExist;
        }

        public object login(string userName, string password)
        {
            var isExist = FindBy(x => x.UserName == userName && x.Password == password && x.IsDelete == null)
                         .Select(x => new { name = x.Name, id = x.Id }).FirstOrDefault();

            if (isExist != null)
            {
                List<int?> listPermission = _permissionsRepository.selectPermissionByUserId(isExist.id);

                var obj = new
                {
                    listPermission = listPermission,
                    name = isExist.name
                };

                return obj;
            }

            var isExistUser = new
            {
                isExist = false
            };

            return isExistUser;

        }

        public void BackupDB()
        {
            try
            {
                string path = @"F:\BACKUP";

                string fileName = path + "\\ERPDB " + DateTime.Now.ToShortDateString().Replace('/', '-');
                string backUpQuery = "BACKUP DATABASE ERPDB TO DISK = '" + fileName + ".bak'";
                Context.Database.ExecuteSqlRaw(backUpQuery);// (backUpQuery).ToList();

            }
            catch (Exception ex)
            {

                throw;
            }
           
        }
    }
}
