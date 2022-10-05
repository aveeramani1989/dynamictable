using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Reflection;
using System.Data;

using static dynamictable.Models.clsCommon;
using dynamictable.Models.bal;


namespace dynamictable.Controllers
{
    public class StudentController : Controller
    {
        public string result;
        // GET: Student
        public ActionResult Index()
        {

            return View();
        }
        public string getStudentdetails1(studet objstudet)
        {
            Businesslayer objBal = new Businesslayer();
            List<studet> Objlst = objBal.getStudentdetails(objstudet);
            result = JsonConvert.SerializeObject(Objlst, Formatting.Indented);
            return result;
        }

        public ActionResult getStudentdetails()
        {
            PropertyInfo[] propertyInfos = typeof(studet).GetProperties(); 
            var columns = propertyInfos.Select(s => s.Name).ToArray();
            ViewBag.Columns = columns;
            return View();
        }
    }
}