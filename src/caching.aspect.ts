import { Around, JoinpointContext, After } from '@neoskop/phantom';
import { ExampleApi, Payload } from './api';

export class CachingAspect {
    cache = new Map<string, Promise<Payload>>();

    @Around(ExampleApi, 'get')
    async aroundGet(jp: JoinpointContext<ExampleApi, 'get'>) {
        if(!this.cache.has(jp.getArgument(0)!)) {
            this.cache.set(jp.getArgument(0)!, jp.proceed());
        }

        return this.cache.get(jp.getArgument(0)!);
    }

    @After(ExampleApi, 'update')
    async afterUpdate(jp: JoinpointContext<ExampleApi, 'update'>) {
        this.cache.delete((await jp.getResult())!.id);
    }
}