using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Online_Shopping_Center.Models;

namespace Online_Shopping_Center.Controllers
{
    public class ProductController : ApiController
    {
        OnlineShoppingSystemEntities12  _context;
        public ProductController()
        {
            _context = new OnlineShoppingSystemEntities12();
        }

        protected override void Dispose(bool disposing)
        {
            _context.Dispose();
        }

        [HttpGet]
        public IHttpActionResult GetAllProducts()
        {
            return Ok(_context.GetProducts());
            
        }

        [HttpGet]
        public IHttpActionResult GetProduct(int id)
        {
            return Ok(_context.GetProduct(id));
        }

        [Route("api/products/getproductforcompany")]
        [HttpGet]
        public IHttpActionResult GetProductsForCompany(int id)
        {
            return Ok(_context.GetProducts().Where(c=>c.FactID ==id));
        }

        [HttpPost]
        public IHttpActionResult CreateProduct(Product product)
        {
            if ((!ModelState.IsValid) || product.Name == "" || product.NumInStock == 0 || product.Price == 0)
                return BadRequest("Please check your data");

            _context.Products.Add(product);
            _context.SaveChanges();

            return Created(new Uri(Request.RequestUri + "/" + product.ID), product);
        }

        [HttpPut]
        public IHttpActionResult EditPoduct(Product product)
        {
            var pro = _context.Products.SingleOrDefault(c => c.ID == product.ID);
            if (pro == null)
                return BadRequest("There is no such product");

            if (product.Name == "" || product.NumInStock == 0 ||product.Factory_ID ==0)
                return BadRequest("Please check your data");

            pro.Name = product.Name;
            pro.NumInStock = product.NumInStock;
            pro.Img = product.Img;
            pro.Factory_ID = product.Factory_ID;
            pro.Price = product.Price;

            _context.SaveChanges();
            return Ok();
        }

        [HttpDelete]
        public IHttpActionResult DeleteProduct(int id)
        {
            var product = _context.Products.SingleOrDefault(c => c.ID == id);
            if (product == null)
                return BadRequest("There is no such product");

            _context.Products.Remove(product);
            _context.SaveChanges();
            return Ok();
        }
    }
}
