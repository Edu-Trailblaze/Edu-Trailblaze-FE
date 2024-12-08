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
        public string RoleName { get; set; }
        // [Required]
        public string? RoleNameFormat
        { 
        get => CultureInfo.CurrentCulture.TextInfo.ToTitleCase(RoleName?.ToLower());
        set => RoleName = value;
        }
    }

    //internal class CapitalizeFirstLetterAttribute : ValidationAttribute
    //{
    //    public override bool IsValid(object value)
    //    {
    //        if (value is string roleName)
    //        {
               
    //            var formattedRoleName = CultureInfo.CurrentCulture.TextInfo.ToTitleCase(roleName.ToLower());

                
    //            value = formattedRoleName;

    //            return true;
    //        }

    //        return false;
    //    }
    //    public override string FormatErrorMessage(string name)
    //    {
    //        return $"{name} must be a valid role name.";
    //    }
    //}
}
