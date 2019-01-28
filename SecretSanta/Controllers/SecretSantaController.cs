using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SecretSanta.Data;
using SecretSanta.Models;

namespace SecretSanta.Controllers
{
    [Route("api/SecretSanta")]
    public class SecretSantaController : Controller
    {
        private readonly SecretSantaContext _context;

        List<Person> _persons { get; set; }
       // List<Group> _groups { get; set; }

        public SecretSantaController(SecretSantaContext context)
        {
            _context = context;
        }

        [HttpGet("getallgroups")]
        public IActionResult GetAllGroups()
        {
            //var rng = new Random();
            //return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            //{
            //    DateFormatted = DateTime.Now.AddDays(index).ToString("d"),
            //    TemperatureC = rng.Next(-20, 55),
            //    Summary = Summaries[rng.Next(Summaries.Length)]
            //});
            try
            {
                var res = _context.persons.Select(v => v.group).Distinct().ToList();

                return Ok(res);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }

        }

        [HttpGet("deletePerson")]
        public bool deletePerson([FromQuery]string email)
        {
            try
            {
                Person res = _context.persons.Where(f => f.email.Equals(email)).FirstOrDefault();
                if (res != null)
                {
                    _context.Remove(res);
                    _context.SaveChanges();
                    return true;
                }
                else{
                    throw new Exception("not found");
                }
            }catch(Exception e)
            {
                return false;
            }
           
        }

        [HttpPost("addperson")]
        public async Task<bool> AddPerson([FromBody]Person person)
        {
            try
            {
                if (person.group == null)
                {
                    person.group = "Individual";
                }
                _context.persons.Add(person);
                await _context.SaveChangesAsync();

                return true;

            } catch (Exception e)
            {
                Console.Write("AddPerson", e.Message);
                return false;
            }
        }

        [HttpGet("getallpersons")] 
        public List<Person> GetAllPerson()
        {
            return _context.persons.ToList();
        }

        [HttpGet("getsantas")]
        public async Task<IActionResult> GetSantas()
        {
            _context.persons.ToList().ForEach(b => b.isAssignedSanta = false);
           await _context.SaveChangesAsync();

            List<Santa> santas = new List<Santa>(); //results init
            var allPersons = _context.persons.ToList();

            allPersons.ForEach(b =>
           {
               var SelectedSantaMayBe = Shuffle(allPersons
                   .Where(p => (p.group.Equals("Individual")? true: p.group != b.group) && p.isAssignedSanta == false && p.email != b.email)
                   .ToList());

               if (SelectedSantaMayBe.Count() > 0)
               {
                   Person SelectedSanta = SelectedSantaMayBe[0];
                   allPersons.Where(v => v.email.Equals(SelectedSanta.email)).FirstOrDefault().isAssignedSanta = true;
                   _context.persons.Where(v => v.email.Equals(SelectedSanta.email)).FirstOrDefault().isAssignedSanta = true;
                   _context.SaveChangesAsync();

                   Santa santa = new Santa
                   {
                       santa = b,
                       giftRecipient = SelectedSanta
                   };
                   santas.Add(santa);
               }

           });


            //var grouppersons = _context.persons.Select(v => v.group)
            //    .Distinct()
            //    .ToList()
            //    .Select(groupName =>
            //    new
            //    {
            //        group = groupName,
            //        members = _context.persons.Where(p => p.group.Equals(groupName)).ToList()
            //    }).ToList();

            //grouppersons.ForEach(async g =>
            //{
                //var canGiftPersons = Shuffle(allPersons.Where(p =>
                //(p.group.Equals("Individual") ? true : p.group != g.group) && p.isAssignedSanta == false).ToList());
                //var canGiftPersons = Shuffle(allPersons.Where(p => p.group != g.group && p.isAssignedSanta == false).ToList());

                //g.members.ForEach(async p =>
                //{
                //    //canGiftPersonsFiltered = canGiftPersons.Where(x => x.email != p.email).ToList();
                //    canGiftPersons.AddRange(allPersons.Where(person => person.group.Equals("Individual") && person.email != p.email && person.isAssignedSanta == false));

                //    if (canGiftPersons.Count() > 0)
                //    {
                //        var luckyPersonIndex = 0;
                //        var luckyPerson = canGiftPersons[luckyPersonIndex];
                        //if(luckyPerson.email == p.email && canGiftPersons.Count() > 1)
                        //{
                        //    luckyPersonIndex++;
                        //    luckyPerson = canGiftPersons[luckyPersonIndex];
                        //}
                        //Santa santa = new Santa
                        //{
                        //    santa = p,
                        //    giftRecipient = luckyPerson
                        //};
                        //canGiftPersons.RemoveAt(luckyPersonIndex);
                        //luckyPerson.isAssignedSanta = true;
                        //await _context.SaveChangesAsync();
                        //santas.Add(santa);
                    //}
            //    });
            //});


            return Ok(santas);
        }

        public List<Person> Shuffle(List<Person> list)
        {
            int n = list.Count;
            while (n > 1)
            {
                n--;
                int k = new Random().Next(n + 1);
                Person value = list[k];
                list[k] = list[n];
                list[n] = value;
            }
            return list;
        }


    }

    public class AddPersonBody
    {
        public Person person { get; set; }
        public string joinGroup { get; set; }
    }

    public class ErrorMessage
    {
        public string message { get; set; }
    }

}
