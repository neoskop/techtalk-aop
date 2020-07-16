import { ExampleApi } from "./api";
import { AopManager } from '@neoskop/phantom';
import { LoggingAspect } from "./logging.aspect";
import { CachingAspect } from "./caching.aspect";

new AopManager().install([
    new CachingAspect(),
    new LoggingAspect(),
]);

async function main() {
    const api = new ExampleApi();

    await api.get('1');
    await api.get('1');
    await api.get('1');

    const data = await api.get('1');
    data.data = 'FOOBAR';
    await api.update(data);

    await api.get('1');
    await api.get('1');
}

main().catch(err => {
    console.error(err);
    process.exit(1);
})