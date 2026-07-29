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

const createProject = async (title, description, location, starting_date, organizationId) => {
  const query = `
      INSERT INTO projects (title, description, location, starting_date, organization_id)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING project_id;
    `;

  const queryParams = [title, description, location, starting_date, organizationId];
  const result = await db.query(query, queryParams);

  if (result.rows.length === 0) {
    throw new Error('Failed to create project');
  }

  if (process.env.ENABLE_SQL_LOGGING === 'true') {
    console.log('Created new project with ID:', result.rows[0].project_id);
  }

  return result.rows[0].project_id;
}

const updateProject = async (project_id, title, description, location, starting_date, organization_id) =>{
  const query = `
  update projects
  set
  title = $1,
  description = $2,
  location = $3,
  starting_date = $4,
  organization_id = $5
  where project_id = $6
  returning project_id
  `;
  const queryParams = [
    title,
    description,
    location,
    starting_date,
    organization_id,
    project_id
  ]

  const result = await db.query(query, queryParams);

  if (result.rows.length === 0) {
    throw new Error("Project not found");
  }

  if (process.env.ENABLE_SQL_LOGGING === "true") {
    console.log("Updated project with ID:", project_id);
  }

  return result.rows[0].project_id;
}


export {updateProject, createProject, getAllProjects, getProjectsByOrganizationId, getUpcomingProjects, getProjectDetails}