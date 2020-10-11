using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Online_Shopping_Center.Models;

namespace Online_Shopping_Center.Controllers
{
    public class FactoryController : ApiController
    {
        OnlineShoppingSystemEntities12 _context;
        public FactoryController()
        {
            _context = new OnlineShoppingSystemEntities12();
        }

        [HttpGet]
        public IHttpActionResult GetAllFactories()
        {
            return Ok(_context.Factories.ToList());
        }

        [HttpGet]
        public IHttpActionResult GetFactory(int id)
        {
            return Ok(_context.Factories.SingleOrDefault(c => c.ID == id));
        }

        [HttpPost]
        public IHttpActionResult CreateFactory(Factory factory)
        {
            if ((!ModelState.IsValid) || factory.Name == "" || factory.Description == "")
                return BadRequest("Please check your data");

            _context.Factories.Add(factory);
            _context.SaveChanges();

            return Created(new Uri(Request.RequestUri + "/" + factory.ID), factory);
        }

        [HttpPut]
        public IHttpActionResult EditFactory(Factory factory)
        {
            var fac = _context.Factories.SingleOrDefault(c => c.ID == factory.ID);

            if (fac == null)
                return BadRequest("There is no such factory");

            if (factory.Name == "" || factory.Description == "")
                return BadRequest("Please check your data");

            fac.Name = factory.Name;
            fac.Description = factory.Description;
            fac.Img = factory.Img;

            _context.SaveChanges();

            return Ok();
        }

        [HttpDelete]
        public IHttpActionResult DeleteFactory(int id)
        {
            var fac = _context.Factories.SingleOrDefault(c => c.ID == id);

            if (fac == null)
                return BadRequest("There is no such factory");

            _context.Factories.Remove(fac);
            _context.SaveChanges();

            return Ok();
        }
    }
}
