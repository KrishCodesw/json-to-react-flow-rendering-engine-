const universityER = {
    "conceptual_er_model": {
        "entities": [
            {
                "name": "User",
                "type": "strong",
                "attributes": [
                    { "name": "user_id", "type": "simple", "isKey": true, "nullable": false },
                    { "name": "email", "type": "simple", "nullable": false },
                    { "name": "password_hash", "type": "simple", "nullable": false }
                ]
            },
            {
                "name": "Student",
                "type": "strong",
                "attributes": [
                    { "name": "gpa", "type": "simple", "nullable": true }
                ]
            },
            {
                "name": "Instructor",
                "type": "strong",
                "attributes": [
                    { "name": "department", "type": "simple", "nullable": false },
                    { "name": "expertise", "type": "multivalued", "nullable": true }
                ]
            },
            {
                "name": "Course",
                "type": "strong",
                "attributes": [
                    { "name": "course_code", "type": "simple", "isKey": true, "nullable": false },
                    { "name": "syllabus", "type": "simple", "nullable": true }
                ]
            }
        ],
        "specializations": [
            {
                "superclass": "User",
                "subclasses": ["Student", "Instructor"],
                "type": "disjoint",
                "participation": "total"
            }
        ],
        "relationships": [
            {
                "name": "Teaches",
                "type": "strong",
                "entities": [
                    { "name": "Instructor", "cardinality": "1", "participation": "partial" },
                    { "name": "Course", "cardinality": "N", "participation": "total" }
                ]
            },
            {
                "name": "Prerequisite",
                "type": "recursive",
                "entities": [
                    { "name": "Course", "cardinality": "1", "role": "Required", "participation": "partial" },
                    { "name": "Course", "cardinality": "N", "role": "Dependent", "participation": "partial" }
                ]
            },
            {
                "name": "Enrolls",
                "type": "strong",
                "entities": [
                    { "name": "Student", "cardinality": "M", "participation": "total" },
                    { "name": "Course", "cardinality": "N", "participation": "partial" }
                ],
                "attributes": [
                    { "name": "enrollment_date", "type": "simple", "nullable": false },
                    { "name": "final_grade", "type": "simple", "nullable": true }
                ]
            }
        ]
    }
};

export default universityER