import {app, corsOptions } from "..";
import {Router ,Request, Response} from "express";
import {PrismaClient} from "@prisma/client";
const cors = require('cors');
const router= Router();
const prismaClient = new PrismaClient();
 

router.get("/getuser", async(req: Request, res: Response)=>{
    const user = await prismaClient.user.findUnique({
        where: {
          address: 'mywalletaddress',
        },
      })
      console.log(user);

      return res.json({user});
    })
router.post("/createaccount", async (req: Request, res: Response)=>{
    const user = await prismaClient.user.findUnique({
        where: {
          address: 'mywallress',
        },
      })
    console.log(user);
    if(user==null){
        const response = await prismaClient.user.create({
            data: {
                address : "mywalletaddress",
                rewards: 0
                
            }
        });
        return res.json({response});
    }
    else{
        return res.json({
            data :"Account already exist.."
        })
    }
    
    
})


router.get("/getquestion",cors(corsOptions), async (req: Request, res: Response)=>{
        const question = req.body;
    console.log(question);
        const response = await prismaClient.question.findFirst({

            where: question
        });

        const responses = await prismaClient.answer.findMany({
            where:{
                question_id: response?.id
            }
        });
        const result = {
            question: response,
            answers: responses
        };
        // console.log(response);
        console.log(result);
        return res.json({result});
})
router.post("/postquestion",cors(corsOptions), async(req: Request, res: Response)=>{
    const body = await req.body;
    // const response = await prismaClient.question.create({
    //     data: body
    // });
    console.log(body)
    // return res.json({response});
})

router.post("/postanswer",async(req: Request, res: Response)=>{
    const data=req.body;
    data.upvote = 0;
    data.downvote = 0;

    console.log(data);
    
    const response = await prismaClient.answer.create({
        data: data
    });
    return res.json({response});
})

router.put("/updateanswer", async(req: Request, res: Response)=>{
    const response = await prismaClient.answer.updateMany({
        where:{
            user_id: 1,
            question_id: 1,
        },
        data: {
            content : "hey hii answerrr"            
        }
    });
    return res.json({response});
})

router.put("/upvoteanswer", async(req: Request, res: Response)=>{
    const response = await prismaClient.answer.updateMany({
        where:{
            user_id: 1,
            question_id: 1,
        },
        data: {            
            upvote:1
        }
    });
    return res.json({response});
})
router.put("/downvoteanswer", async(req: Request, res: Response)=>{
    const response = await prismaClient.answer.updateMany({
        where:{
            user_id: 1,
            question_id: 1,
        },
        data: {            
            downvote:1
        }
    });
    return res.json({response});
})


router.get("/getanswer", async(req: Request, res: Response)=>{
    const response = await prismaClient.answer.findFirst({
        where: {
            user_id: 1,
            question_id: 1
            
        }
    });
    return res.json({response});
})

router.put("/rewards",async (req: Request, res: Response)=>{
    
    const response = await prismaClient.user.update({
        where: {
            address: 'mywalletaddress',
          },
        data: {
            rewards: 1
        }
    });
    return res.json({response});
})




export default router;

