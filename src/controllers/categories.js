// Import any needed model functions
import { getAllCategories, getCategoryById, getProjectsByCategoryId, assignCategoryToProject, updateCategoryAssignments, getCategoriesByProjectId, createCategory, updateCategory } from '../models/categories.js';
import { getProjectDetails} from '../models/projects.js'
import { body, param, validationResult } from 'express-validator';

const categoryValidation = [
    body('category_name')
        .trim()
        .notEmpty().withMessage('name is required')
        .isLength({ min: 3, max: 70 }).withMessage('name must be between 3 and 200 characters'),
];


// Define any controller functions
const showCategoriesPage = async (req, res) => {
    const categories = await getAllCategories();
    const title = 'Service Categories';

    res.render('categories', { title, categories });
};

const showCategoryDetails = async (req, res) => {
    const id = req.params.id
    const category = await getCategoryById(id)
    const projects = await getProjectsByCategoryId(id)

    res.render('category', { title: category.category_name, category, projects})
};

const showAssignCategoriesForm = async (req, res) => {
    const projectId = req.params.projectId;

    const projectDetails = await getProjectDetails(projectId);
    const categories = await getAllCategories();
    const assignedCategories = await getCategoriesByProjectId(projectId);

    const title = 'Assign Categories to Project';

    res.render('assign-categories', { title, projectId, projectDetails, categories, assignedCategories });
};

const processAssignCategoriesForm = async (req, res) => {
    const projectId = req.params.projectId;
    const selectedCategoryIds = req.body.categoryIds || [];

    // Ensure selectedCategoryIds is an array
    const categoryIdsArray = Array.isArray(selectedCategoryIds) ? selectedCategoryIds : [selectedCategoryIds];
    await updateCategoryAssignments(projectId, categoryIdsArray);
    req.flash('success', 'Categories updated successfully.');
    res.redirect(`/project/${projectId}`);
};


const showNewCategoryForm = async (req, res) => {
    const title = "Add New Category";

    res.render("new-category", { title });
};

const processNewCategoryForm = async (req, res) => {
    // Check for validation errors
    const results = validationResult(req);
    if (!results.isEmpty()) {
        results.array().forEach((error) => {
            req.flash('error', error.msg);
        });
        return res.redirect('/new-category');
    
    }

    const {category_name} = req.body;
    const categoryId = await createCategory(category_name);
    req.flash('success', 'Category added successfully!');
    res.redirect(`/category/${categoryId}`);
};


const showEditCategoryForm = async (req, res) => {
    const categoryId = req.params.id;
    const categoryDetails = await getCategoryById(categoryId)
    const title = 'Edit Category';
    res.render('edit-category', { title, categoryDetails});
};

const processEditCategoryForm = async (req, res) => {
    const results = validationResult(req);
    if (!results.isEmpty()) {
        // Validation failed - loop through errors
        results.array().forEach((error) => {
            req.flash('error', error.msg);
        });

        // Redirect back to the edit organization form
        return res.redirect('/edit-category/' + req.params.id);
    }

    const category_id = req.params.id;
    const {category_name} = req.body;

    await updateCategory(category_id, category_name);

    // Set a success flash message
    req.flash('success', 'Category updated successfully!');

    res.redirect(`/category/${category_id}`);
};



export {categoryValidation, showEditCategoryForm, processEditCategoryForm, showNewCategoryForm, processNewCategoryForm, showAssignCategoriesForm, processAssignCategoriesForm, showCategoriesPage, showCategoryDetails };
