import { Around, JoinpointContext } from '@neoskop/phantom';
import { ExampleApi } from './api';

export class LoggingAspect {
    @Around(ExampleApi, [ 'get', 'update'])
    async around(jp: JoinpointContext<ExampleApi, 'get' | 'update'>) {
        const start = Date.now();
        const data = await jp.proceed();

        const runtime = Date.now() - start;
        console.log(`${jp.getPointcut().cls.name}::${jp.getProperty()} ran in ${runtime} ms`);

        return data;
    }
}