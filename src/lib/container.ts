import { asClass, createContainer, type Constructor } from 'awilix';
import { scopePerRequest } from 'awilix-express';
import { type Application } from 'express';
import services from '@/services';

export const loadContainer = (app: Application) => {
  const container = createContainer({ injectionMode: 'CLASSIC' });

  services.forEach(service => {
    const serviceKey = `${service.name[0].toLowerCase()}${service.name.substring(1)}`;
    container.register({ [serviceKey]: asClass(service as Constructor<any>).scoped() });
  });

  app.use(scopePerRequest(container));

  return container;
};
