const sampleER = {
 
    "conceptual_er_model": {
        "entities": [
            {
                "name": "Department",
                "type": "strong",
                "attributes": [
                    {
                        "name": "dept_id",
                        "type": "simple",
                        "isKey": true,
                        "isPartialKey": false,
                        "nullable": false
                    },
                    {
                        "name": "Name",
                        "type": "simple",
                        "isKey": false,
                        "isPartialKey": false,
                        "nullable": true
                    },
                    {
                        "name": "Location",
                        "type": "composite",
                        "isKey": false,
                        "isPartialKey": false,
                        "nullable": true,
                        "components": [
                            "city",
                            "state"
                        ]
                    }
                ],
                "ownerEntity": null
            },
            {
                "name": "Employee",
                "type": "strong",
                "attributes": [
                    {
                        "name": "emp_id",
                        "type": "simple",
                        "isKey": true,
                        "isPartialKey": false,
                        "nullable": false
                    },
                    {
                        "name": "Name",
                        "type": "composite",
                        "isKey": false,
                        "isPartialKey": false,
                        "nullable": true,
                        "components": [
                            "first_name",
                            "last_name"
                        ]
                    },
                    {
                        "name": "Email",
                        "type": "simple",
                        "isKey": false,
                        "isPartialKey": false,
                        "nullable": true
                    },
                    {
                        "name": "Skills",
                        "type": "multivalued",
                        "isKey": false,
                        "isPartialKey": false,
                        "nullable": false
                    }
                ],
                "ownerEntity": null
            },
            {
                "name": "Dependent",
                "type": "weak",
                "attributes": [
                    {
                        "name": "dependent_name",
                        "type": "simple",
                        "isKey": false,
                        "isPartialKey": true,
                        "nullable": false
                    },
                    {
                        "name": "Relationship",
                        "type": "simple",
                        "isKey": false,
                        "isPartialKey": false,
                        "nullable": true
                    }
                ],
                "ownerEntity": "Employee"
            },
            {
                "name": "Project",
                "type": "strong",
                "attributes": [
                    {
                        "name": "proj_id",
                        "type": "simple",
                        "isKey": true,
                        "isPartialKey": false,
                        "nullable": false
                    },
                    {
                        "name": "Title",
                        "type": "simple",
                        "isKey": false,
                        "isPartialKey": false,
                        "nullable": true
                    },
                    {
                        "name": "Budget",
                        "type": "simple",
                        "isKey": false,
                        "isPartialKey": false,
                        "nullable": true
                    }
                ],
                "ownerEntity": null
            },
            {
                "name": "WorksOn",
                "type": "associative",
                "attributes": [
                    {
                        "name": "hours_logged",
                        "type": "simple",
                        "isKey": false,
                        "isPartialKey": false,
                        "nullable": true
                    },
                    {
                        "name": "role_name",
                        "type": "simple",
                        "isKey": false,
                        "isPartialKey": false,
                        "nullable": true
                    }
                ],
                "ownerEntity": null
            },
            {
                "name": "Asset",
                "type": "strong",
                "attributes": [
                    {
                        "name": "asset_id",
                        "type": "simple",
                        "isKey": true,
                        "isPartialKey": false,
                        "nullable": false
                    },
                    {
                        "name": "purchase_date",
                        "type": "simple",
                        "isKey": false,
                        "isPartialKey": false,
                        "nullable": true
                    },
                    {
                        "name": "cost",
                        "type": "simple",
                        "isKey": false,
                        "isPartialKey": false,
                        "nullable": true
                    }
                ],
                "ownerEntity": null
            },
            {
                "name": "Laptop",
                "type": "strong",
                "attributes": [
                    {
                        "name": "asset_id",
                        "type": "simple",
                        "isKey": true,
                        "isPartialKey": false,
                        "nullable": false
                    },
                    {
                        "name": "cpu_speed",
                        "type": "simple",
                        "isKey": false,
                        "isPartialKey": false,
                        "nullable": true
                    },
                    {
                        "name": "ram_size",
                        "type": "simple",
                        "isKey": false,
                        "isPartialKey": false,
                        "nullable": true
                    }
                ],
                "ownerEntity": null
            },
            {
                "name": "Vehicle",
                "type": "strong",
                "attributes": [
                    {
                        "name": "asset_id",
                        "type": "simple",
                        "isKey": true,
                        "isPartialKey": false,
                        "nullable": false
                    },
                    {
                        "name": "plate_number",
                        "type": "simple",
                        "isKey": false,
                        "isPartialKey": false,
                        "nullable": true
                    },
                    {
                        "name": "mileage",
                        "type": "simple",
                        "isKey": false,
                        "isPartialKey": false,
                        "nullable": true
                    }
                ],
                "ownerEntity": null
            }
        ],
        "relationships": [
            {
                "name": "WorksIn",
                "type": "strong",
                "entities": [
                    {
                        "name": "Department",
                        "cardinality": "1",
                        "participation": "partial"
                    },
                    {
                        "name": "Employee",
                        "cardinality": "N",
                        "participation": "total"
                    }
                ],
                "attributes": []
            },
            {
                "name": "Manages",
                "type": "recursive",
                "entities": [
                    {
                        "name": "Employee",
                        "cardinality": "1",
                        "participation": "partial",
                        "role": "Manager"
                    },
                    {
                        "name": "Employee",
                        "cardinality": "N",
                        "participation": "partial",
                        "role": "Subordinate"
                    }
                ],
                "attributes": []
            },
            {
                "name": "HasDependent",
                "type": "identifying",
                "entities": [
                    {
                        "name": "Employee",
                        "cardinality": "1",
                        "participation": "partial"
                    },
                    {
                        "name": "Dependent",
                        "cardinality": "N",
                        "participation": "total"
                    }
                ],
                "attributes": []
            },
            {
                "name": "AssignedTo",
                "type": "strong",
                "entities": [
                    {
                        "name": "Employee",
                        "cardinality": "M",
                        "participation": "partial"
                    },
                    {
                        "name": "Project",
                        "cardinality": "N",
                        "participation": "partial"
                    },
                    {
                        "name": "WorksOn",
                        "cardinality": "1",
                        "participation": "total"
                    }
                ],
                "attributes": []
            }
        ],
        "specializations": [
            {
                "superclass": "Asset",
                "subclasses": [
                    "Laptop",
                    "Vehicle"
                ],
                "type": "disjoint",
                "participation": "partial"
            }
        ]
    }
}




export default sampleER;
