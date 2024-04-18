import { ApiPromise,WsProvider,Keyring} from "@polkadot/api";
import "@polkadot/api-augment";
import type {FrameSystemAccountInfo} from "@polkadot/types/lookup";
import {KeyringPair} from "@polkadot/keyring/types";
const WEB_SOCKET="ws://127.0.0.1:9944";
const connect=async () => {
const wsProvider=new WsProvider(WEB_SOCKET);
const api= await ApiPromise.create({provider:wsProvider,types:{}});
await api.isReady;
return api;

}
const sleep=(ms:number)=>new Promise(r => setTimeout(r,ms));
const getConst=async (api:ApiPromise) =>{
    const con=await api.consts.balances.existentialDeposit.toHuman();
	return con;
}
const getFree=async(api:ApiPromise,address:string)=>{
	const {data:{free,},}:FrameSystemAccountInfo =await
	api.query.system.account(address);
	return free;
}
const transfer=async(api:ApiPromise,from:KeyringPair,to:string,count:number)=>{
	await api.tx.balances.transfer(to,count).signAndSend(from,res => {
		console.log("transfer=",res.status);
	});
} 
const subcrib=async(api:ApiPromise,address:string)=>{
	await api.query.system.account(address,info=>{
		const free=info.data.free;
		console.log("sub fre=",free.toHuman());
	})

}
const main = async () =>{
const api=await connect();
const deposit=await getConst(api);
const keyring=new Keyring({type:"sr25519"});
const alice=keyring.addFromUri("//Alice");
const bob=keyring.addFromUri("//Bob");
const free=await getFree(api,bob.address);
console.log("deposit==",deposit);
console.log("free=",free.toHuman());
await subcrib(api,alice.address);
await transfer(api,alice,bob.address,10 ** 10 +1);
await sleep(10000);
const after_free=await getFree(api,bob.address);
console.log("free=",after_free.toHuman());
}
main().then(() =>{
console.log("then");
process.exit(0);
}).catch(err =>{
	console.log("error=",err);
	process.exit(1);
});
