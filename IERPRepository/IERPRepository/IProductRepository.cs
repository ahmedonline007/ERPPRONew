using ContextERP.Models;
using DtoERP.Dto;
using System;
using System.Collections.Generic;
using System.Text;

namespace IERPRepository.IERPRepository
{
    public interface IProductRepository : IGenericRepository<TblProduct>
    {
        DtoProduct AddEditProduct(DtoProduct dtoProduct);
        List<DtoProduct> selectProduct();
        void deleteProduct(int? id);
        bool? CheckExistsProduct(string name, int? id = 0);
        List<DtoProduct> selectProductForDrop();
        List<DtoProduct> selectProductForStore();
        List<DtoProduct> selectProductForStores();
        List<DtoProductSize> selectProductForDetails();
        List<DtoTransactionProductSize> selectTransactionProduct();
        object selectTotalStore();
        List<DtoProduct> selectProductForTransaction();
        void UpdatePrice(int? productId, decimal? priceSupplier, decimal? priceSelling);
        List<DtoNewProduct> selectProductForInvoices();
    }
}
