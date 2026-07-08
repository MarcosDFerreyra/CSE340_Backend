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