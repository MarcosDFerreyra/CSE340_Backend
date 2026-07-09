import db from './db.js'

const getAllProjects = async () => {
    const query = `
        SELECT p.project_id, p.organization_id, o.name AS organization_name, p.title, p.description, p.location, p.project_date
      FROM public.projects p
      join organizations o
      on p.organization_id = o.organization_id;
    `;

    const result = await db.query(query);

    return result.rows;
}

export { getAllProjects }