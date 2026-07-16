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

export { getAllProjects, getProjectsByOrganizationId }