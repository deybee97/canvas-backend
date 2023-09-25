 const path = require('path');
// const { StatusCodes } = require('http-status-codes');
// const CustomError = require('../errors');

const {v2: cloudinary} = require('cloudinary');
const fs = require('fs');
require("dotenv").config()


          
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.CLOUD_API_KEY, 
  api_secret: process.env.CLOUD_API_SECRET
});


const uploadProductImageLocal = async (req, res) => {
  if (!req.files) {
    throw new CustomError.BadRequestError('No File Uploaded');
  }
  const productImage = req.files.image;
  console.log(productImage)
  if (!productImage.mimetype.startsWith('image')) {
    throw new CustomError.BadRequestError('Please Upload Image');
  }
  const maxSize = 1024 * 1024;
  if (productImage.size > maxSize) {
    console.log('Please upload image smaller 1MB');
  }
  const imagePath = path.join(
    __dirname,
    '../public/uploads/' + `${productImage.name}`
  );
  await productImage.mv(imagePath);
  return res
    .status(200)
    .json({ image: { src: `/uploads/${productImage.name}` } });
};

const uploadProductImage = async (req, res) => {
  const result = await cloudinary.uploader.upload(
    req.files.image.tempFilePath,
    {
      use_filename: true,
      folder: 'file-upload',
    }
  );

  console.log(result)
  fs.unlinkSync(req.files.image.tempFilePath);
  return res.status(200).json({ image: { src: result.secure_url } });
};


module.exports = {
    uploadProductImageLocal,
    uploadProductImage,
}
