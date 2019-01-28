using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SecretSanta.Models
{
    public class Santa
    {
        public Person santa { get; set; }
        public Person giftRecipient { get; set; }
    }
}
