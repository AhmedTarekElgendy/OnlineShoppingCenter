using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using Online_Shopping_Center.Models;
using System.Web.Http;
using System.Data.Entity.Core.Objects;

namespace Online_Shopping_Center.Controllers
{
    public class CardController : ApiController
    {
        OnlineShoppingSystemEntities12 _context;
        public CardController()
        {
            _context = new OnlineShoppingSystemEntities12();
        }

        protected override void Dispose(bool disposing)
        {
            _context.Dispose();
        }


        [HttpGet]
        [Route("api/card/productsfact")]
        public IHttpActionResult GetProductsFactFromCard(int id)
        {
            return Ok(_context.GetProductFactFromCard(id));
        }

        [HttpGet]
        public IHttpActionResult GetCards()
        {
            return Ok(_context.Cards);
        }

        [HttpPut]
        public IHttpActionResult UpdateProductsAfterBuy(string productidandnum)
        {
            return Ok(_context.updateproducts(productidandnum));
        }

        [HttpGet]
        public IHttpActionResult GetCard(int id)
        {
            return Ok(_context.GetCard(id).ToList());
        }

        [HttpPost]
        public IHttpActionResult PostCard(Card card)
        {
            if (!ModelState.IsValid)
                return BadRequest("Please Check Your Data");

            _context.Cards.Add(card);
            _context.SaveChanges();

            return Created(new Uri(Request.RequestUri + "/" + card.UserID), card);
        }

        [HttpPut]
        public IHttpActionResult EditCard(Card card)
        {
            var cardindb = _context.Cards.SingleOrDefault(c => c.UserID == card.UserID);

            if (cardindb == null)
                return BadRequest("No Card Found");

            if (card.UserID == 0 )
                return BadRequest("Please Check Your Data");

            cardindb.ProductFactory = card.ProductFactory;
            _context.SaveChanges();
            return Ok();
        }
    }
}
