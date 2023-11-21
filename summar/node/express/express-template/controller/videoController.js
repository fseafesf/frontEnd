exports.list = async (req,res,next) =>{
    console.log(req.method)
    res.send('/video-list')
}