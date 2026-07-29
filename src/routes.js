import express, { Router } from 'express';

import { showHomePage } from './controllers/index.js';
import {showOrganizationsPage, showOrganizationDetailsPage, showNewOrganizationForm, processNewOrganizationForm, organizationValidation} from './controllers/organizations.js';
import { showProjectsPage, showProjectsDetailPage } from './controllers/projects.js';
import { showCategoriesPage, showCategoryDetails } from './controllers/categories.js';
import { testErrorPage } from './controllers/errors.js';

const router = express.Router();

router.get('/', showHomePage);
router.get('/organizations', showOrganizationsPage);
router.get('/projects', showProjectsPage);
router.get('/categories', showCategoriesPage);
router.get('/organization/:id', showOrganizationDetailsPage);
router.get('/project/:id', showProjectsDetailPage);
router.get('/category/:id', showCategoryDetails)
router.get('/new-organization', showNewOrganizationForm);
// Route to handle new organization form submission
router.post('/new-organization', organizationValidation, processNewOrganizationForm);

// error-handling routes
router.get('/test-error', testErrorPage);

export default router;