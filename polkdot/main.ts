import { ApiPromise,WsProvider} from "@polkadot/api";
const WEB_SOCKET="ws://127.0.0.1:9944";
const connect=async () => {
const wsProvider=new WsProvider(WEB_SOCKET);
const api= await ApiPromise.create({provider:wsProvider,types:{}});
await api.isReady;
return api;

}
const getConst=async (api:ApiPromise) =>{
    const con=await api.consts.balances.existentialDeposit.toHuman();
	return con;
}
const main = async () =>{
const api=await connect();
const deposit=await getConst(api);
console.log("deposit==",deposit);

}
main().then(() =>{
console.log("then");
process.exit(0);
}).catch(err =>{
	console.log("error=",err);
	process.exit(1);
});
