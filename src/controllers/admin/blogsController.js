const Blog = require('../../models/admin/blogModel'); // Mongoose Blog model
const multer = require('multer');
const path = require('path');

const blogsPage = (req, res) => {
    res.render('pages/WebsiteManagement/blogs');
};

const blogsList = async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.json({ data: blogs });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch blogs' });
    }
};

// Configure file storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/blogs/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage }).fields([
    { name: 'banner_image', maxCount: 1 },
    { name: 'poster_image', maxCount: 1 }
]);

// Create New Blog
const createBlog = (req, res) => {
    upload(req, res, async (err) => {
        if (err) return res.status(400).json({ message: err.message });

        const { blog_title, blog_description, blog_tags, blog_status } = req.body;

        try {
            const newBlog = new Blog({
                title: blog_title,
                description: blog_description,
                tags: blog_tags,
                status: blog_status,
                banner_image: req.files?.banner_image ? req.files.banner_image[0].filename : '',
                poster_image: req.files?.poster_image ? req.files.poster_image[0].filename : '',
            });

            await newBlog.save();
            res.redirect('/admin/blogs');
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    });
};

// Update Blog
const updateBlog = (req, res) => {
    upload(req, res, async (err) => {
        if (err) return res.status(400).json({ message: err.message });

        const { blog_id, blog_title, blog_description, blog_tags, blog_status } = req.body;

        try {
            let updateData = {
                title: blog_title,
                description: blog_description,
                tags: blog_tags,
                status: blog_status,
            };

            if (req.files?.banner_image) updateData.banner_image = req.files.banner_image[0].filename;
            if (req.files?.poster_image) updateData.poster_image = req.files.poster_image[0].filename;

            await Blog.findByIdAndUpdate(blog_id, updateData, { new: true });
            res.redirect('/admin/blogs');
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    });
};

// Delete Blog
const deleteBlog = async (req, res) => {
    try {
        await Blog.findByIdAndDelete(req.params.id);
        res.json({ message: 'Blog deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    blogsPage,
    blogsList,
    createBlog,
    updateBlog,
    deleteBlog
};
