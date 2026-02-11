export const adminOnly = (req,res,next) => {
    console.log(req.user,'role');
    
    if(req.user.role !== "admin"){
        return res.status(401).json({
            message:"Admin access only"
        });
    }
    next();
}