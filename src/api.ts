import { sleep } from "./utils";

export interface Payload {
  id: string;
  data: string;
}

export class ExampleApi {
  protected data: Payload[] = [
    { id: "1", data: "foobar" },
    { id: "2", data: "foo" },
    { id: "3", data: "baz" },
  ];

  async get(id: string): Promise<Payload> {
    await sleep(2500);
    const data = this.data.find((d) => d.id === id);

    return JSON.parse(JSON.stringify(data));
  }

  async update(payload: Payload): Promise<Payload> {
    await sleep(5000);

    const data = this.data.find((d) => d.id === payload.id)!;

    Object.assign(data, payload);

    return JSON.parse(JSON.stringify(data));
  }
}
