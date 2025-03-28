
const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');
const Banner = require('../../models/admin/bannerModel'); // Import Banner model
const multer = require('multer');
const upload = multer({ dest: 'uploads/banners/' });



const bannerPage = (req, res) => {
    res.render('pages/WebsiteManagement/banner');
}

const bannerList = async (req, res) => {

    try {
        let search = req.body.search?.value || '';
        let start = parseInt(req.body.start) || 0;
        let length = parseInt(req.body.length) || 10;

        let query = {};

        if (search) {
            query = {
                $or: [
                    { name: { $regex: search, $options: 'i' } },
                    { email: { $regex: search, $options: 'i' } },
                    { mobile: { $regex: search, $options: 'i' } }
                ]
            };
        }

        let totalRecords = await Banner.countDocuments();
        let filteredRecords = await Banner.countDocuments(query);
        let users = await Banner.find(query).skip(start).limit(length);

        res.json({
            draw: req.body.draw,
            recordsTotal: totalRecords,
            recordsFiltered: filteredRecords,
            data: users // must be array of objects matching columns
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Something went wrong' });
    }
};


// Configure AWS S3
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});

const saveBanner = async (req, res) => {
    try {
        console.log("Received file:", req.file); // Debugging
        console.log("Received body:", req.body); // Debugging

        const { title, type, status } = req.body;
        let file = req.file;

        if (!file) {
            return res.status(400).json({ message: 'Image file is required' });
        }

        const s3Params = {
            Bucket: process.env.AWS_S3_BUCKET,
            Key: `banners/${Date.now()}_${file.originalname}`,
            Body: fs.createReadStream(file.path),
            ContentType: file.mimetype,
        };

        try {
            const s3Upload = await s3.upload(s3Params).promise();
            imagePath = s3Upload.Location; // Store S3 URL
        } catch (error) {
            console.error('S3 Upload Error:', error);
            const uploadDir = 'uploads/banners';
            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir, { recursive: true });
            }
            const localPath = path.join(uploadDir, file.filename);
            fs.renameSync(file.path, localPath);
            imagePath = localPath;
        }

        const banner = new Banner({
            title,
            type,
            status: status === 'Active',
            image: imagePath,
        });
        await banner.save();

        res.status(201).json({ message: 'Banner saved successfully', banner });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};



module.exports = { bannerPage, bannerList, saveBanner }





