import jwt from 'jsonwebtoken'

const auth=async(req,res,next)=>{
   try {
        const token=req.headers.authorization.split(" ")[1];

        const isCoustonAuth = token.length<500;

        

    
   } catch (error) {
    console.error(error);
   }

}