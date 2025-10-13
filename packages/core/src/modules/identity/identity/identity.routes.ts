import { Router } from 'express';
import type { IdentityService } from './identity.service';
import type { CreateIdentityDTO, UpdateIdentityDTO } from '@arc-id/data';

export function IdentityRoutes(service: IdentityService): Router {
  const router = Router();

  router.post('/', async (req, res) => {
    const data: CreateIdentityDTO = req.body;
    const result = await service.create(data);
    res.json(result);
  });

  router.put('/:id', async (req, res) => {
    const data: UpdateIdentityDTO = req.body;
    const result = await service.update(req.params.id, data);
    res.json(result);
  });

  router.get('/:id', async (req, res) => {
    const result = await service.findById(req.params.id);
    res.json(result);
  });

  router.delete('/:id', async (req, res) => {
    await service.delete(req.params.id);
    res.status(204).send();
  });

  return router;
}
