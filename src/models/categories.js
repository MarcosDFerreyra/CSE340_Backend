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

export { getAllCategories, getCategoryById, getCategoriesByProjectId, getProjectsByCategoryId }