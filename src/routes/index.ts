import { Router, Request, Response} from 'express'
import { getTableByDate } from '../controllers/RootController.controller';

const router = Router()

router.get('', async (req: Request, res: Response) => {
    const { startDate, endDate, page } = req.query;
    if (!startDate || !endDate || !page) {
      return res.status(400).send('startDate parameter is missing');
    }
    const start = new Date(startDate as string);
    const end = new Date(endDate as string);
    const result = await getTableByDate(start, end, Number(page));
    return res.status(200).send(result);
})

export default router;