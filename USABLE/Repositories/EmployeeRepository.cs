using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using USABLE.Models;

namespace USABLE.Repositories
{
    
    public class EmployeeRepository
    {
        private string connectionString;

        public EmployeeRepository()
        {
            connectionString = "Server=(localdb)\\MSSQLLocalDB;;Database=Restaurant;Trusted_Connection=True;MultipleActiveResultSets=True";
        }

        public IDbConnection Connection
        {
            get 
            {
                return new SqlConnection(connectionString);
            }
        }

        public void Add(Employee employee)
        {
            using (IDbConnection dbConnection = Connection)
            {
                string sQuery = @"INSERT INTO Employee (Name, Quantity, Price) VALUES(@Name, @) ";
            }
        }
    }
}
