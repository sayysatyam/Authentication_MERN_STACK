const user = require('../models/user');
const uploadProfilePic = async(req,res)=>{
    try {
        if(!req.file){
                 return res.status(400).json({
        success: false,
        message: "Profile picture is required",
      });
        }
          const userId = req.userId;
        const updateUser = await user.findByIdAndUpdate(
                userId,
                { profilePic: req.file.path },
                 { new: true }
        );
        if (!updateUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
         res.status(200).json({
      success: true,
      message: "Profile picture updated successfully",
      profilePic: updateUser.profilePic,
    });
    } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }  ;
};
module.exports = { uploadProfilePic};