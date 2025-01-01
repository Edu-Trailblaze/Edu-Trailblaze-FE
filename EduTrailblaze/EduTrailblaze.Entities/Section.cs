﻿using EduTrailblaze.API.Domain;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EduTrailblaze.Entities
{
    public class Section : EntityBase<int>
    {
        [Required, ForeignKey("Course")]
        public int CourseId { get; set; }

        [Required, StringLength(50)]
        public string Title { get; set; }

        [Required, StringLength(int.MaxValue)]
        public string Description { get; set; }


        // Navigation properties
        public virtual Course Course { get; set; }
        public virtual ICollection<Lecture> Lectures { get; set; }
        public virtual ICollection<UserProgress> UserProgresses { get; set; }
    }
}
