import db from './db.js'

const joinProject = async (user_id, project_id) => {
    const query = `
    insert into volunteers
    values ($1, $2)`
    
    await db.query(query, [user_id, project_id])
};

const leaveProject = async (user_id, project_id) => {
    const query = `
    delete from volunteers
    where user_id = $1 and project_id = $2`
    await db.query(query, [user_id, project_id])
};

const checkVolunteer = async (user_id, project_id) => {
    const query = `
    select * from volunteers
    where user_id = $1 and project_id = $2`;

    const result = await db.query(query, [user_id, project_id]);
    
    if (result.rows.length === 0) {
        return false
    }   
    return true
}

const getProjectsByVolunteerId = async (user_id) => {
    const query = `
    select p.title, p.project_id
    from projects p
    join volunteers v
    on p.project_id = v.project_id
    where v.user_id = $1`
    
    const result = await db.query(query, [user_id])

    return result.rows
};

export { checkVolunteer, joinProject, leaveProject, getProjectsByVolunteerId }