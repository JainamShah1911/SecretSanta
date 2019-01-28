using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SecretSanta.Models
{
    public class Person
    {

        
        [Key] public string email { get; set; }
        public string firstname { get; set; }
        public string lastname { get; set; }
        public string group { get; set; }
        public bool isAssignedSanta { get; set; } = false;
        //public Person(string _name, string _email)
        //{
        //    name = _name;
        //    email = _email;
        //}

    }
}
