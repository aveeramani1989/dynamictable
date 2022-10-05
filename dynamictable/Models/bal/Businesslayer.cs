using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using static dynamictable.Models.clsCommon;
using dynamictable.Models.dal;
namespace dynamictable.Models.bal
{
    public class Businesslayer
    {
        public List<studet> getStudentdetails(studet objstudet)
        {
            datalayer objBal = new datalayer();

            List<studet> Objlst = objBal.getStudentdetails(objstudet);
            return Objlst;
        }

    }
    
}