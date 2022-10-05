using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace dynamictable.Models
{
    public class clsCommon
    {
        public class studet
        {
            public int stuID { get; set; }
            public string StudentName { get; set; }
            public string Studentphone { get; set; }
            public string studnetAddress { get; set; }

            public string edit { get; set; }
            public string delete { get; set; }
        }      
    }
}