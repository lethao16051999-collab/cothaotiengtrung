const {pinyin}=require('pinyin-pro');const V=require('./vocab.json');
const D={};
for(const n in V)for(const w of V[n].words){const k=w[0].replace(/[（(].*$/,'').trim();if(/^[一-鿿]+$/.test(k)&&!D[k])D[k]=w[1].trim()}
// extra / overrides
Object.assign(D,{"谁":"shéi","里":"lǐ","哪里":"nǎlǐ","李文":"Lǐ Wén","安妮":"Ānnī","白家月":"Bái Jiāyuè","王一飞":"Wáng Yīfēi","小语":"Xiǎoyǔ","陈天中":"Chén Tiānzhōng","天中":"Tiānzhōng","阮明":"Ruǎn Míng","越南":"Yuènán","越南人":"Yuènánrén","中国人":"Zhōngguórén","法国人":"Fǎguórén","泰国人":"Tàiguórén","美国":"Měiguó","美国人":"Měiguórén","河内":"Hénèi","北京":"Běijīng",
"不客气":"bú kèqi","谢谢":"xièxie","什么":"shénme","名字":"míngzi","东西":"dōngxi","认识":"rènshi","没关系":"méi guānxi","对不起":"duìbuqǐ","没事":"méishì","哥哥":"gēge","姐姐":"jiějie","妹妹":"mèimei","弟弟":"dìdi","爸爸":"bàba","妈妈":"māma","孩子":"háizi","儿子":"érzi","朋友":"péngyou","女朋友":"nǚpéngyou","男朋友":"nánpéngyou","学生":"xuésheng","大学生":"dàxuéshēng","中学生":"zhōngxuéshēng","小学生":"xiǎoxuéshēng","时候":"shíhou","觉得":"juéde","知道":"zhīdao","喜欢":"xǐhuan","漂亮":"piàoliang","衣服":"yīfu","便宜":"piányi","怎么样":"zěnmeyàng","怎么":"zěnme","多少":"duōshao","桌子":"zhuōzi","椅子":"yǐzi","杯子":"bēizi","包子":"bāozi","饺子":"jiǎozi","面条儿":"miàntiáor","哪儿":"nǎr","那儿":"nàr","这儿":"zhèr","一点儿":"yìdiǎnr","有点儿":"yǒudiǎnr","玩儿":"wánr","我们":"wǒmen","你们":"nǐmen","他们":"tāmen","她们":"tāmen","它们":"tāmen","同学们":"tóngxuémen","学生们":"xuéshengmen","孩子们":"háizimen","老师们":"lǎoshīmen","小朋友":"xiǎopéngyou","休息":"xiūxi","明天":"míngtiān","昨天":"zuótiān","今天":"jīntiān","星期":"xīngqī","星期几":"xīngqī jǐ","这个":"zhège","那个":"nàge","哪个":"nǎge","这些":"zhèxiē","那些":"nàxiē","哪些":"nǎxiē","有些":"yǒuxiē","一些":"yìxiē","医生":"yīshēng","病人":"bìngrén","看病":"kànbìng","生病":"shēngbìng","睡觉":"shuìjiào","起床":"qǐchuáng","说话":"shuōhuà","上课":"shàngkè","下课":"xiàkè","上班":"shàngbān","下班":"xiàbān","做饭":"zuòfàn","吃饭":"chīfàn","不太":"bú tài","没有":"méiyǒu","还没":"hái méi","不要":"búyào","不是":"bú shì","请问":"qǐngwèn","再见":"zàijiàn","大家":"dàjiā","您好":"nín hǎo","你好":"nǐ hǎo","老师":"lǎoshī","王老师":"Wáng lǎoshī","好吃":"hǎochī","好看":"hǎokàn","好听":"hǎotīng","好喝":"hǎohē","电影院":"diànyǐngyuàn","出租车":"chūzūchē","西安饭店":"Xī'ān Fàndiàn","中文":"Zhōngwén","汉语":"Hànyǔ","汉字":"Hànzì","中国":"Zhōngguó","法国":"Fǎguó","泰国":"Tàiguó","今年":"jīnnián","明年":"míngnián","多大":"duō dà","几岁":"jǐ suì","一下":"yíxià","第一":"dì-yī","上面":"shàngmiàn","下面":"xiàmiàn","前面":"qiánmiàn","后面":"hòumiàn","里面":"lǐmiàn","外面":"wàimiàn","前边":"qiánbian","后边":"hòubian","外边":"wàibian","上边":"shàngbian","下边":"xiàbian","里边":"lǐbian","这边":"zhèbian","那边":"nàbian","小猫":"xiǎomāo","小狗":"xiǎogǒu","火车":"huǒchē","手机":"shǒujī","电话":"diànhuà","电脑":"diànnǎo","电视":"diànshì","电影":"diànyǐng","超市":"chāoshì","牛奶":"niúnǎi","米饭":"mǐfàn","晚饭":"wǎnfàn","午饭":"wǔfàn","水果":"shuǐguǒ","苹果":"píngguǒ","商店":"shāngdiàn","书店":"shūdiàn","学校":"xuéxiào","医院":"yīyuàn","公司":"gōngsī","房间":"fángjiān","饭店":"fàndiàn","大学":"dàxué","中学":"zhōngxué","小学":"xiǎoxué","天气":"tiānqì","下雨":"xiàyǔ","下雪":"xiàxuě","工作":"gōngzuò","学习":"xuéxí","读书":"dúshū","高兴":"gāoxìng","非常":"fēicháng","现在":"xiànzài","早上":"zǎoshang","上午":"shàngwǔ","中午":"zhōngwǔ","下午":"xiàwǔ","晚上":"wǎnshang","白天":"báitiān","分钟":"fēnzhōng","正在":"zhèngzài","开车":"kāichē","看见":"kànjiàn","听见":"tīngjiàn","售货员":"shòuhuòyuán","女儿":"nǚ'ér","星期天":"xīngqītiān","星期日":"xīngqīrì","可以":"kěyǐ","一共":"yígòng","咖啡":"kāfēi","喝水":"hē shuǐ","热水":"rè shuǐ","这里":"zhèlǐ","那里":"nàlǐ","哪里":"nǎlǐ","上学":"shàngxué","唱歌":"chànggē","面包":"miànbāo","同学":"tóngxué","客气":"kèqi"});
const T=s=>{const m=s.normalize('NFD').match(/[̄́̌̀]/);return m?{"̄":1,"́":2,"̌":3,"̀":4}[m[0]]:0};
const KEYS=Object.keys(D).sort((a,b)=>b.length-a.length);
const PUN={'，':',','。':'.','？':'?','！':'!','：':':','、':',','；':';','——':' —','…':'…','（':'(','）':')','“':'"','”':'"'};
const DG=['líng','yī','èr','sān','sì','wǔ','liù','qī','bā','jiǔ'];
function numPy(r,nx){if(nx==='年'||r.length>2)return [...r].map(d=>DG[+d]).join(' ');const n=+r;if(n<10)return DG[n];const t=Math.floor(n/10),o=n%10;let x=(t>1?DG[t]:'')+'shí';if(o)x+=(/^[aeo]/.test(DG[o].normalize('NFD'))?"'":'')+DG[o];return x}
function seg(s){const out=[];let i=0;while(i<s.length){const c=s[i];
 if(/[0-9]/.test(c)){let j=i;while(j<s.length&&/[0-9]/.test(s[j]))j++;const r=s.slice(i,j);out.push({h:r,py:numPy(r,s[j])});i=j;continue}
 if(/[A-Za-z＿_]/.test(c)){let j=i;while(j<s.length&&/[A-Za-z＿_]/.test(s[j]))j++;out.push({h:s.slice(i,j),py:s.slice(i,j)});i=j;continue}
 if(!/[一-鿿]/.test(c)){out.push({p:c});i++;continue}
 let k=KEYS.find(k=>s.startsWith(k,i));if(k){out.push({h:k,py:D[k]});i+=k.length;continue}
 out.push({h:c,py:pinyin(c)});i++}return out}
function sandhi(tk){ // syllable-level 不 / 一
 const syl=[];tk.forEach((t,ti)=>{if(!t.h)return;const ps=t.py.split(/\s+/);const hs=[...t.h];if(ps.length==hs.length)hs.forEach((h,j)=>syl.push({h,ti,j,p:ps[j]}));else syl.push({h:t.h,ti,j:0,p:t.py,whole:1})});
 return syl}
function py(s,opt={}){s=s.replace(/——/g,'—');let tk=seg(s);
 // apply sandhi to single-char tokens 不 / 一
 const flat=[];tk.forEach((t,i)=>{if(t.h)flat.push(i)});
 flat.forEach((ti,x)=>{const t=tk[ti];if(t.h!=='不'&&t.h!=='一')return;const nx=flat[x+1]!=null?tk[flat[x+1]]:null;const nt=nx?T(nx.py.split(/[\s']/)[0]):-1;
  if(t.h==='不')t.py=nt===4?'bú':'bù';
  else{const pv=flat[x-1]!=null?tk[flat[x-1]].h:'';if(/第|十$/.test(pv)||!nx||/[一二三四五六七八九十零]/.test(nx.h[0]))t.py='yī';else t.py=(nt===4||nx.h==='个')?'yí':'yì'}});
 // number words: 十 etc fine
 let o='';tk.forEach((t,i)=>{if(t.h){o+=(o&&!/[\s(“"]$/.test(o)?' ':'')+t.py}else{const p=PUN[t.p]!=null?PUN[t.p]:t.p;if(/^[,.?!:;)…]/.test(p))o+=p;else if(p===' —')o+=' —';else o+=(o&&!/\s$/.test(o)?' ':'')+p}});
 o=o.replace(/\s+/g,' ').trim().replace(/ ([,.?!:;])/g,'$1');
 // merge digits: Arabic numbers handled as is
 if(!opt.lc)o=o.replace(/^([^a-zA-ZāáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜĀÁǍÀ]*)(.)/,(m,a,b)=>a+b.toUpperCase());
 // capitalize after sentence end
 o=o.replace(/([.?!] )(.)/g,(m,a,b)=>a+b.toUpperCase()).replace(/(— )(.)/g,(m,a,b)=>a+b.toUpperCase());
 return o}
module.exports={py,D,seg};
if(require.main===module){for(const x of process.argv.slice(2))console.log(x,'=>',py(x))}
// số chữ Hán 11–99
(()=>{const C='零一二三四五六七八九',P=['líng','yī','èr','sān','sì','wǔ','liù','qī','bā','jiǔ'];
 for(let n=11;n<100;n++){const t=Math.floor(n/10),o=n%10;const h=(t>1?C[t]:'')+'十'+(o?C[o]:'');let p=(t>1?P[t]:'')+'shí';if(o)p+=(/^[aeo]/.test(P[o].normalize('NFD'))?"'":'')+P[o];if(!D[h])D[h]=p}
 KEYS.splice(0,KEYS.length,...Object.keys(D).sort((a,b)=>b.length-a.length))})();
