import {env} from 'cloudflare:workers';
import {getChatGPTUser} from '../../chatgpt-auth';
import seed from '../../../data/seed.json';
// All authenticated visitors may update the shared workspace, as authorized by the owner.
const isEditor=(user:any)=>Boolean(user?.userId && user?.email);
export async function GET(){
 const canEdit=isEditor(await getChatGPTUser());
 const db=env.DB!;
 const entries=Object.entries(seed).flatMap(([kind,rows])=>rows.map((r:any)=>db.prepare('INSERT OR IGNORE INTO records (id,kind,data,revision) VALUES (?,?,?,1)').bind(r.id,kind,JSON.stringify(r))));
 for(let i=0;i<entries.length;i+=50) await db.batch(entries.slice(i,i+50));
 const rs=await db.prepare('SELECT * FROM records').all();const hs=canEdit?await db.prepare('SELECT * FROM history ORDER BY at DESC LIMIT 200').all():{results:[]};
 return Response.json({records:rs.results.map((r:any)=>({...JSON.parse(r.data),kind:r.kind,revision:r.revision})),history:hs.results,canEdit},{headers:{'Cache-Control':'no-store'}});
}
export async function POST(req:Request){
 const user=await getChatGPTUser();if(!isEditor(user))return Response.json({error:'Acesso não autorizado'},{status:401});
 const body:any=await req.json();const {record}=body;
 if(!record||!['cobrancas','cedentes','negociacoes'].includes(record.kind)||typeof record.cedente!=='string'||!record.cedente.trim()||JSON.stringify(record).length>50000)return Response.json({error:'Preencha o cedente e confira os campos.'},{status:400});
 for(const k of ['valor','valorNP','valorProtestado','prometido','entrada','recebido'])if(record[k]!==undefined&&record[k]!==null&&record[k]!==''&&(!Number.isFinite(Number(record[k]))||Number(record[k])<0))return Response.json({error:'Valores devem ser números positivos.'},{status:400});
 const db=env.DB!; const id=record.id||crypto.randomUUID(); const old:any=await db.prepare('SELECT * FROM records WHERE id=?').bind(id).first();
 if(old&&old.revision!==record.revision)return Response.json({error:'Este registro foi atualizado em outra sessão. Atualize a página antes de editar.'},{status:409});
 const rev=(old?.revision||0)+1;const data={...record,id,atualizacao:new Date().toISOString().slice(0,10)};delete data.revision;delete data.kind;
 const stmt=old?db.prepare('UPDATE records SET data=?,revision=? WHERE id=? AND revision=?').bind(JSON.stringify(data),rev,id,old.revision):db.prepare('INSERT INTO records (id,kind,data,revision) VALUES (?,?,?,?)').bind(id,record.kind,JSON.stringify(data),rev);
 const res=await stmt.run();if(!res.meta.changes)return Response.json({error:'Conflito de edição. Atualize a página.'},{status:409});
 await db.prepare('INSERT INTO history (id,record_id,at,actor,data) VALUES (?,?,?,?,?)').bind(crypto.randomUUID(),id,new Date().toISOString(),user!.email,JSON.stringify({antes:old?JSON.parse(old.data):null,depois:data})).run();
 return Response.json({ok:true});
}
