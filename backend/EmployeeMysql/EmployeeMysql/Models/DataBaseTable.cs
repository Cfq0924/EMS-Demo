using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
namespace EmployeeMysql.Models
{
    public class DataBaseTable
    {
    }
    public class CoreDbContext : DbContext
    {
        public virtual DbSet<LogIn> login { get; set; }
        public virtual DbSet<Basic_info> basic_info { get; set; }
        public CoreDbContext(DbContextOptions<CoreDbContext> options) : base(options)
        {

        }
    }
    public class LogIn 
    {
        public int id { get; set; }
        public string user_name { get; set; }
        public string password { get; set; }
        public string permission { get; set; }
    }

    public class Basic_info
    {
        public int id { get; set; }
        public string name { get; set; }
        public string SSO { get; set; }
        public string email { get; set; }
        public string phone { get; set; }
        public string base_addr { get; set; }
        public string onboard_time { get; set; }
        public string sex { get; set; }
        public string birth { get; set; }
        public string password { get; set; }
        public string permission { get; set; }

    }
}
