import db from './db.js'

const getAllCategories = async () => {
    const query = `
      SELECT category_id, category_name
      FROM public.categories 
    `;

    const result = await db.query(query);

    return result.rows;
}

const getCategoryById = async (categoryId) => {
  const query = `
    select
      category_id,
      category_name
    from categories
    where category_id = $1
  `
  const result = await db.query(query, [categoryId])
  return result.rows[0]

}

const getCategoriesByProjectId = async (projectId) => {
  const query = `
    select
      c.category_id,
      c.category_name
    from categories c
    join project_categories pc
    on c.category_id = pc.category_id
    where pc.project_id = $1
  `
  const result = await db.query(query, [projectId])
  return result.rows
}

const getProjectsByCategoryId = async (categoryId) => {
  const query = `
  select
    p.project_id,
    p.title
    from projects p
    join project_categories pc
    on p.project_id = pc.project_id
    where pc.category_id = $1
  `
  const result = await db.query(query, [categoryId])
  return result.rows
}

const assignCategoryToProject = async (categoryId, projectId) => {
  const query = `
        INSERT INTO project_categories (category_id, project_id)
        VALUES ($1, $2);
    `;

  await db.query(query, [categoryId, projectId]);
}

const updateCategoryAssignments = async (projectId, categoryIds) => {
  // First, remove existing category assignments for the project
  const deleteQuery = `
        DELETE FROM project_categories
        WHERE project_id = $1;
    `;
  await db.query(deleteQuery, [projectId]);

  // Next, add the new category assignments
  for (const categoryId of categoryIds) {
    await assignCategoryToProject(categoryId, projectId);
  }
}

export {assignCategoryToProject, updateCategoryAssignments, getAllCategories, getCategoryById, getCategoriesByProjectId, getProjectsByCategoryId }