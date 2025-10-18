import express from "express";

const router = express.Router();

router.post("/api/users/course/:id/buy", async (req, res) => {
    try {

    }catch (error) {
        console.log(error);
        return res.status(500).send({error :"internal server error"});
    }
});

export default router;
