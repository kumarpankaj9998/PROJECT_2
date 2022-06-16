import jwt from 'jsonwebtoken'

const auth=async(req,res,next)=>{
   try {
        const token=req.headers.authorization.split(" ")[1];

        const isCoustonAuth = token.length<500;
   
        let decodedData;

        if(token && isCoustonAuth)
        {  
           decodedData= jwt.verify(token, 'test');
  
           req.userId=decodedData?.id;
          
         }
         else
         {
            decodedData=jwt.decode(token);

            req.userId=decodedData?.sub;//sub is basically a id which is given by the google to differentiate the user
           
         }
      

         next();
     } catch (error) {
    console.error(error);
   }

}     

export default auth;
    
    
  