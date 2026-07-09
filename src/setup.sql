create table organizations(
	organization_id serial primary key,
	name varchar(120) not null,
	description text not null,
	email varchar(100) not null,
	logo_filename varchar(100) not null
);

insert into organizations (name, description, email, logo_filename)
values
	('BrightFuture Builders', 'A nonprofit focused on improving community infrastructure through sustainable construction projects.', 'info@brightfuturebuilders.org', 'brightfuture-logo.png'),
	('GreenHarvest Growers', 'An urban farming collective promoting food sustainability and education in local neighborhoods.', 'contact@greenharvest.org', 'greenharvest-logo.png'),
	('UnityServe Volunteers', 'A volunteer coordination group supporting local charities and service initiatives.', 'hello@unityserve.org', 'unityserve-logo.png');

select * from organizations;

CREATE TABLE projects (
    project_id SERIAL PRIMARY KEY,
    organization_id INT NOT NULL REFERENCES organizations(organization_id),
    title VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(100) NOT NULL,
    starting_date DATE NOT NULL
);

INSERT INTO projects (organization_id, title, description, location, project_date)
VALUES
    (1, 'Community Center Renovation', 'Volunteers renovate an aging community center by repairing walls, painting, and improving accessibility.', 'Springfield Community Center', '2026-08-15'),
    (1, 'Playground Construction', 'Build a safe playground for children in a neighborhood park.', 'Lincoln Park', '2026-09-05'),
    (1, 'School Roof Repair', 'Replace damaged roofing to improve safety at the local elementary school.', 'Maple Elementary School', '2026-09-20'),
    (1, 'Accessible Ramp Installation', 'Install wheelchair-accessible ramps for families in need.', 'East Springfield', '2026-10-10'),
    (1, 'Community Garden Shed Construction', 'Build a storage shed for tools used by community garden volunteers.', 'Riverside Community Garden', '2026-10-25'),

    (2, 'Community Garden Expansion', 'Add new planting areas and raised beds to the community garden.', 'Green Valley Garden', '2026-08-18'),
    (2, 'Tree Planting Initiative', 'Volunteers plant native trees to improve local green spaces.', 'Riverfront Park', '2026-09-12'),
    (2, 'School Vegetable Garden', 'Create a vegetable garden where students can learn sustainable gardening.', 'Oakwood Middle School', '2026-09-30'),
    (2, 'Urban Farming Workshop', 'Teach residents how to grow vegetables in small urban spaces.', 'Downtown Community Hall', '2026-10-14'),
    (2, 'Pollinator Garden Project', 'Plant flowers that attract bees and butterflies to support local ecosystems.', 'Harmony Nature Park', '2026-11-01'),

    (3, 'Food Bank Distribution', 'Organize volunteers to sort and distribute food to local families.', 'Hope Food Bank', '2026-08-22'),
    (3, 'Clothing Donation Drive', 'Collect, sort, and distribute donated clothing to people in need.', 'City Outreach Center', '2026-09-08'),
    (3, 'Senior Companion Program', 'Volunteers visit senior citizens to provide companionship and assistance.', 'Golden Years Residence', '2026-09-26'),
    (3, 'Neighborhood Cleanup Day', 'Remove litter and beautify streets and public spaces with community volunteers.', 'Westside Neighborhood', '2026-10-17'),
    (3, 'Holiday Toy Collection', 'Collect and distribute toys to children during the holiday season.', 'Unity Community Center', '2026-12-05');

select * from projects

create table categories (
	category_id serial primary key,
	category_name varchar(70) not null
);

create table project_categories (
	category_id int not null references categories (category_id),
	project_id int not null references projects (project_id),
	primary key (project_id, category_id)
);

insert into categories (category_name)
values 
	('Construction'),
	('Environment'),
	('Community Support');

select * from categories;

insert into project_categories (category_id, project_id)
values
	(1, 1),
    (1, 2),
    (1, 3),
    (1, 4),
    (1, 5),

    -- Environment
    (2, 5),
    (2, 6),
    (2, 7),
    (2, 8),
    (2, 9),
    (2, 10),
    (2, 14),

    -- Community Support
    (3, 2),
    (3, 4),
    (3, 8),
    (3, 9),
    (3, 11),
    (3, 12),
    (3, 13),
    (3, 14),
    (3, 15);

select * from project_categories;