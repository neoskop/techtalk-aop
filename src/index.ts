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

    console.log((await api.get('1')).data);
    console.log((await api.get('1')).data);
    console.log((await api.get('1')).data);

    const data = await api.get('1');
    data.data = 'FOOBAR';
    await api.update(data);

    console.log((await api.get('1')).data);
    console.log((await api.get('1')).data);
}

main().catch(err => {
    console.error(err);
    process.exit(1);
})