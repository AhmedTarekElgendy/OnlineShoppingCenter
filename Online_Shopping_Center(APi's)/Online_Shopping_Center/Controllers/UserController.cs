using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Online_Shopping_Center.Models;

namespace Online_Shopping_Center.Controllers
{
    public class UserController : ApiController
    {
        OnlineShoppingSystemEntities12 _context;
        public UserController()
        {
            _context = new OnlineShoppingSystemEntities12();  
        }

        protected override void Dispose(bool disposing)
        {
            _context.Dispose();
        }

        [HttpGet]
        public IHttpActionResult GetAllUsers()
        {

            return Ok(_context.Users.ToList());
        }

        [HttpGet]
        public IHttpActionResult GetUser(int id)
        {
            return Ok(_context.Users.SingleOrDefault(c => c.ID == id));
        }

        [HttpPost]
        public IHttpActionResult CreateUser(User user)
        {
            if ((!ModelState.IsValid) || user.UserName =="" || user.Password ==""|| user.Type =="")
                return BadRequest("Please check Your Data");

            _context.Users.Add(user);
            _context.SaveChanges();

            return Created(new Uri(Request.RequestUri + "/" + user.ID), user);
        }

        [HttpPut]
        public IHttpActionResult EditUser(User user)
        {
            var userindb = _context.Users.SingleOrDefault(c => c.ID == user.ID);

            if (userindb == null)
                return BadRequest("There is no existing user");

            if ( user.UserName == "" || user.Password == "" || user.Type == "")
                return BadRequest("Please check Your Data");


            userindb.UserName = user.UserName;
            userindb.Type = user.Type;
            userindb.Password = user.Password;

            _context.SaveChanges();
            return Ok();
        }

        [HttpDelete]
        public IHttpActionResult DeleteUser(int id)
        {
            var user = _context.Users.SingleOrDefault(c => c.ID == id);
            if (user == null)
                return BadRequest("Can't find this user");

            _context.Users.Remove(user);
            _context.SaveChanges();

            return Ok();
        }
    }
}
