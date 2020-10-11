using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Online_Shopping_Center.Models;

namespace Online_Shopping_Center.Controllers
{
    public class BuyingController : ApiController
    {
        OnlineShoppingSystemEntities12 _context;

        public BuyingController()
        {
            _context = new OnlineShoppingSystemEntities12();
        }

        protected override void Dispose(bool disposing)
        {
            _context.Dispose();
        }
        
        [HttpGet]
        public IHttpActionResult GetBuying()
        {
           return Ok( _context.Buyings.ToList());
        }

        [HttpPost]
        public IHttpActionResult Buy(Buying buying)
        {
              if ((!ModelState.IsValid) || buying.Name== ""  || buying.Phone =="" || buying.Address =="" || buying.TotalPrice == 0 )
                  return BadRequest("Please check your data");

            if (buying.ProductID == "")
                return BadRequest("Please select items to buy");

            _context.Buyings.Add(buying);
            _context.SaveChanges();
           return Created(new Uri(Request.RequestUri + "/" + buying.ID),buying);
        }




    }
}
