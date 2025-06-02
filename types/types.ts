export type Tricycle = {
  id: string;
  operator_id: string;
  tricycle_details: {
    model: string;
    year: string;
    seating_capacity: string;
    body_number: string;
    fuel_type: string;
    mileage: string;
    maintenance_status: string;
  };
  compliance_details: {
    registration_number: string;
    franchise_number: string;
    or_number: string;
    cr_number: string;
  };
  status: string;
  plate_number: string;
  registration_expiration: Date;
  franchise_expiration: Date;
  last_maintenance_date: Date;
};
