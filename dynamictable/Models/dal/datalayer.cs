using Microsoft.Practices.EnterpriseLibrary.Data.Sql;
using Microsoft.Practices.EnterpriseLibrary.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Configuration;
using System.Data.Common;
using System.Data;
using System.Configuration;
using Newtonsoft.Json;
using static dynamictable.Models.clsCommon;

namespace dynamictable.Models.dal
{
    public class datalayer
    {
        private string DbConn = WebConfigurationManager.ConnectionStrings["LoginConnection"].ToString();
        public string result;
        public List<studet> getStudentdetails(studet objstudets)
        {

            Database db = new SqlDatabase(DbConn);
            DbCommand dbCommand = db.GetStoredProcCommand("sp_studentdetailsqry");
            //db.AddInParameter(dbCommand, "@mode", DbType.String, "select");
            DataSet ds = db.ExecuteDataSet(dbCommand);
            result = JsonConvert.SerializeObject(ds.Tables[0], Formatting.Indented);
            List<studet> Objlst = JsonConvert.DeserializeObject<List<studet>>(result);
            return Objlst;


        }
    }
   

}