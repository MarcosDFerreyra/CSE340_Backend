import db from './db.js'

const getAllProjects = async () => {
    const query = `
        SELECT p.project_id, p.organization_id, o.name AS organization_name, p.title, p.description, p.location, p.starting_date
      FROM public.projects p
      join organizations o
      on p.organization_id = o.organization_id;
    `;

    const result = await db.query(query);

    return result.rows;
}

const getProjectsByOrganizationId = async (organizationId) => {
  const query = `
        SELECT
          project_id,
          organization_id,
          title,
          description,
          location,
          starting_date
        FROM projects
        WHERE organization_id = $1
        ORDER BY starting_date;
      `;

  const queryParams = [organizationId];
  const result = await db.query(query, queryParams);

  return result.rows;
};

const getUpcomingProjects = async (number_of_projects) => {
  const query = `
    select
      p.project_id,
      p.title,
      p.description,
      p.starting_date,
      p.location,
      p.organization_id,
      o.name as organization_name
    from projects p
    join organizations o
    on p.organization_id = o.organization_id
    where p.starting_date >= current_date
    order by p.starting_date
    limit $1
  `
  const results = await db.query(query, [number_of_projects]);
  return results.rows;
};

const getProjectDetails = async (id) => {
  const query = `
    select
      p.project_id,
      p.title,
      p.description,
      p.starting_date,
      p.location,
      p.organization_id,
      o.name as organization_name
    from projects p
    join organizations o
    on p.organization_id = o.organization_id
    where p.project_id = $1
  `
  const results = await db.query(query, [id]);
  return results.rows[0];
}

export {getAllProjects, getProjectsByOrganizationId, getUpcomingProjects, getProjectDetails}