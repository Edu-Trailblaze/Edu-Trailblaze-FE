using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EduTrailblaze.Services.Models
{
    public class AssignRoleModel
    {
        [Display(Name = "User Id")]
        [Required]
        public string UserId { get; set; }
        [Display(Name = "Role Name")]
        [Required]
        public string RoleNameFormat { get; set; }
      
        public string? RoleName
        { 
        get => CultureInfo.CurrentCulture.TextInfo.ToTitleCase(RoleNameFormat?.ToLower());
        set => RoleNameFormat = value;
        }
    }

  
}
