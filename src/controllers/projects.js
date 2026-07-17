// Import any needed model functions
import { getAllProjects } from '../models/projects.js';
import { getUpcomingProjects } from '../models/projects.js';
import { getProjectDetails } from '../models/projects.js';
import { getCategoriesByProjectId } from '../models/categories.js';

const NUMBER_OF_UPCOMING_PROJECTS = 5

// Define any controller functions
const showProjectsPage = async (req, res) => {
    const projects = await getUpcomingProjects(NUMBER_OF_UPCOMING_PROJECTS);
    const title = 'Upcoming Service Projects';

    res.render('projects', { title, projects });
};

const showProjectsDetailPage = async (req, res) => {
    const id = req.params.id;
    const project_details = await getProjectDetails(id);
    const categories = await getCategoriesByProjectId(id)
    res.render('project', {title: "Service Projects Details", categories, project_details });
}

// Export any controller functions
export { showProjectsPage, showProjectsDetailPage };


