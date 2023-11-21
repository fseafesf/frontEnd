exports.register = async (req,res,next) =>{
    console.log(req.body)
    res.send('/user-register')
}

exports.list = async (req,res,next) =>{
    console.log(req.method)
    res.send('/user-list')
}

exports.delete = async (req,res,next) =>{
    console.log(req.method)
    res.send('/user-list')
}