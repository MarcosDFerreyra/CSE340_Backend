import express, { Router } from 'express';

import { showHomePage } from './controllers/index.js';
import {
    processEditOrganizationForm,
    showEditOrganizationForm,
    showOrganizationsPage,
    showOrganizationDetailsPage,
    showNewOrganizationForm,
    processNewOrganizationForm,
    organizationValidation} from './controllers/organizations.js';
import { showProjectsPage, showProjectsDetailPage, showNewProjectForm, processNewProjectForm, projectValidation, processEditProjectForm, showEditProjectForm } from './controllers/projects.js';
import { showCategoriesPage, showCategoryDetails, showAssignCategoriesForm, processAssignCategoriesForm } from './controllers/categories.js';
import { testErrorPage } from './controllers/errors.js';

const router = express.Router();

router.get('/', showHomePage);
router.get('/organizations', showOrganizationsPage);
router.get('/projects', showProjectsPage);
router.get('/categories', showCategoriesPage);
router.get('/organization/:id', showOrganizationDetailsPage);
router.get('/project/:id', showProjectsDetailPage);
router.get('/category/:id', showCategoryDetails);
// Route to handle new organization form submission
router.get('/new-organization', showNewOrganizationForm);
router.post('/new-organization', organizationValidation, processNewOrganizationForm);
// Route to handle the edit organization form submission
router.get('/edit-organization/:id', showEditOrganizationForm);
router.post('/edit-organization/:id', organizationValidation, processEditOrganizationForm);
// Route to handle new project form submission
router.get('/new-project', showNewProjectForm);
router.post('/new-project', projectValidation, processNewProjectForm);
// Routes to handle the assign categories to project form
router.get('/assign-categories/:projectId', showAssignCategoriesForm);
router.post('/assign-categories/:projectId', processAssignCategoriesForm);
router.get('/edit-project/:id', showEditProjectForm);
router.post('/edit-project/:id', processEditProjectForm)

// error-handling routes
router.get('/test-error', testErrorPage);

export default router;