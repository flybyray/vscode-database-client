import { Node } from "@/model/interface/node";
import { RedisConnection } from "@/service/connect/redisConnection";
import { ConnectionManager } from "@/service/connectionManager";
import {Cluster, Redis} from "ioredis";


export default abstract class RedisBaseNode extends Node {
    pattern = "*";
    level = 0;

    abstract getChildren(): Promise<Node[]>;

    public async getClient(): Promise<Redis|Cluster> {

        const redis = (await ConnectionManager.getConnection(this)) as RedisConnection
        return new Promise(res => { redis.run(res) })
    }

}