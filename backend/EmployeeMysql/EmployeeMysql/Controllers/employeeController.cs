using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EmployeeMysql.Models;
using Microsoft.AspNetCore.Cors;

namespace EmployeeMysql.Controllers
{
    [Route("[controller]/[action]")]
    [EnableCors("any")]
    public class employeeController : Controller
    {
        private readonly CoreDbContext _coreDbContext;
        public employeeController(CoreDbContext coreDbContext)
        {
            _coreDbContext = coreDbContext;
        }
        // GET: testController
        [HttpGet]
        public AllEmployees GetAllEmployees(string name) 
        {
            //var tmp = _coreDbContext.Set<LogIn>().Single(s => s.user_name == "陈富强");
            if (name == null)
            {
                AllEmployees ae = new AllEmployees();
                ae.list = _coreDbContext.Set<Basic_info>().ToList();
                ae.count = 20;
                ae.code = 20000;
                return ae;
            }
            else {
                AllEmployees ae = new AllEmployees();
                ae.list = _coreDbContext.Set<Basic_info>().ToList().Where(item=>item.name == name).ToList();
                ae.count = 20;
                ae.code = 20000;
                return ae;
            }

        }
        [HttpPut]
        public AllEmployees ChangeEmployee(int id, [FromBody] Basic_info baseInfo) {
            var findItem = _coreDbContext.Set<Basic_info>().Single(item => item.id == id);
            findItem.name = baseInfo.name;
            findItem.sex = baseInfo.sex;
            findItem.SSO = baseInfo.SSO;
            findItem.email = baseInfo.email;
            findItem.base_addr = baseInfo.base_addr;
            findItem.phone = baseInfo.phone;
            findItem.birth = baseInfo.birth; 
            findItem.onboard_time = baseInfo.onboard_time;
            findItem.permission = baseInfo.permission;
            findItem.password = baseInfo.password;
            _coreDbContext.SaveChanges();

            AllEmployees ae = new AllEmployees();
            ae.list = _coreDbContext.Set<Basic_info>().ToList();
            ae.count = 20;
            ae.code = 20000;
            return ae;
        }

        [HttpPost]
        public AllEmployees AddEmployee([FromBody] Basic_info baseInfo) {
            AllEmployees ae = new AllEmployees();
            //var tmpout = _coreDbContext.Find<Basic_info>(baseInfo.id);
            var tmpout = _coreDbContext.Set<Basic_info>().ToList().Where(item => item.SSO == baseInfo.SSO);
            if (tmpout.Count()==0)
            {
                _coreDbContext.Add<Basic_info>(baseInfo);
                _coreDbContext.SaveChanges();
            }
            ae.list = _coreDbContext.Set<Basic_info>().ToList();
            ae.count = 20;
            ae.code = 20000;
            return ae;
        }
        [HttpDelete]
        public void DeleteEmployee(int id) {

            var entity = _coreDbContext.Find<Basic_info>(id);
            _coreDbContext.Remove(entity);
            _coreDbContext.SaveChanges();
        }
         
    }
    public class AllEmployees {
    
        public List<Basic_info> list { get; set; }
        public int code { get; set; }
        public int count { get; set; }

    }
}
