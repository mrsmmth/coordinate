'use strict';

const NOTE_NAMES = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];
const MAJOR_SCALE = [0,2,4,5,7,9,11];
const ROMANS = ['I','ii','iii','IV','V','vi','vii°'];
const DEGREE_TRIADS = [
  {quality:'maj', intervals:[0,4,7]}, {quality:'min', intervals:[0,3,7]},
  {quality:'min', intervals:[0,3,7]}, {quality:'maj', intervals:[0,4,7]},
  {quality:'maj', intervals:[0,4,7]}, {quality:'min', intervals:[0,3,7]},
  {quality:'dim', intervals:[0,3,6]}
];

const TEMPLATES = [
  ['王道 4536','4536',['J-POP','アニソン'],['王道','エモい','サビ'],5],
  ['カノン系 1564','1564',['J-POP','バラード'],['王道','切ない','サビ'],5],
  ['小室系 6451','6451',['J-POP','90s'],['王道','力強い','サビ'],5],
  ['循環 1625','1625',['J-POP','Soul'],['王道','おしゃれ','Aメロ'],4],
  ['ポップ 6415','6415',['J-POP','Pop'],['明るい','王道','サビ'],5],
  ['爽快 1456','1456',['J-POP','Rock'],['明るい','爽やか','サビ'],4],
  ['切なめ 6345','6345',['J-POP','バラード'],['切ない','エモい','Bメロ'],4],
  ['上昇感 4565','4565',['J-POP','アニソン'],['壮大','力強い','サビ'],4],
  ['帰還 2516','2516',['Jazz','Soul'],['おしゃれ','夜','Aメロ'],4],
  ['定番 251','251',['Jazz','Soul'],['王道','おしゃれ','解決'],5],
  ['ツーファイブ連結 3625','3625',['Jazz','R&B'],['おしゃれ','都会的','Aメロ'],4],
  ['ジャズ循環 6251','6251',['Jazz','R&B'],['おしゃれ','切ない','夜'],5],
  ['ブルース寄り 1411','1411',['Blues','Rock'],['王道','渋い','Aメロ'],4],
  ['ロック定番 1564','1564',['Rock','Pop'],['力強い','王道','サビ'],5],
  ['ロック直進 1454','1454',['Rock'],['力強い','シンプル','Aメロ'],4],
  ['パワーポップ 1645','1645',['Rock','Pop'],['明るい','爽やか','サビ'],4],
  ['オルタナ 6145','6145',['Rock','Indie'],['エモい','個性的','サビ'],3],
  ['R&B 4362','4362',['R&B','Soul'],['おしゃれ','夜','Aメロ'],3],
  ['R&B 6413','6413',['R&B','Neo Soul'],['おしゃれ','切ない','夜'],3],
  ['都会的 3426','3426',['R&B','City Pop'],['おしゃれ','都会的','Aメロ'],3],
  ['シティポップ 2645','2645',['City Pop','J-POP'],['おしゃれ','夜','Bメロ'],4],
  ['シティポップ 4365','4365',['City Pop','J-POP'],['都会的','切ない','サビ'],4],
  ['EDM 6415','6415',['EDM','Pop'],['王道','壮大','サビ'],5],
  ['EDM 4561','4561',['EDM','Future Bass'],['壮大','エモい','サビ'],4],
  ['Future Bass 6341','6341',['EDM','Future Bass'],['エモい','おしゃれ','サビ'],3],
  ['House 1645','1645',['EDM','House'],['明るい','反復','サビ'],4],
  ['劇伴 6412','6412',['劇伴','Game'],['壮大','切ない','展開'],3],
  ['劇伴 4361','4361',['劇伴','Anime'],['エモい','壮大','展開'],3],
  ['不穏 6713','6713',['劇伴','Game'],['緊張感','個性的','Bメロ'],2],
  ['幻想 3614','3614',['劇伴','Fantasy'],['幻想的','切ない','Aメロ'],3],
  ['ワルツ王道 1451','1451',['Waltz','バラード'],['王道','優雅','3拍子'],4],
  ['ワルツ切なめ 6415','6415',['Waltz','劇伴'],['切ない','優雅','3拍子'],4],
  ['6/8 バラード 1564','1564',['6/8','バラード'],['王道','切ない','ゆったり'],5],
  ['6/8 壮大 4536','4536',['6/8','劇伴'],['壮大','エモい','ゆったり'],4],
  ['シンプル 1415','1415',['Folk','Pop'],['シンプル','王道','Aメロ'],4],
  ['フォーク 1541','1541',['Folk','J-POP'],['温かい','王道','Aメロ'],4],
  ['爽やか 4156','4156',['J-POP','Pop'],['爽やか','明るい','サビ'],4],
  ['泣き 6453','6453',['J-POP','バラード'],['切ない','泣ける','サビ'],4],
  ['浮遊 4316','4316',['Indie','Neo Soul'],['おしゃれ','浮遊感','Aメロ'],3],
  ['少し変 3514','3514',['Indie','劇伴'],['個性的','おしゃれ','展開'],2]
].map((x,i)=>({id:i,name:x[0],degrees:x[1].split('').map(Number),genres:x[2],moods:x[3],spread:x[4]}));

const PATTERNS = [
  {id:'block',name:'Block Chord',tags:['王道','シンプル']},
  {id:'quarters',name:'Quarter Pulse',tags:['ポップ','シンプル']},
  {id:'eighths',name:'8th Pulse',tags:['ロック','ポップ']},
  {id:'arpUp',name:'Arpeggio Up',tags:['バラード','おしゃれ']},
  {id:'arpDown',name:'Arpeggio Down',tags:['切ない','バラード']},
  {id:'arpWave',name:'Arpeggio Wave',tags:['エモい','劇伴']},
  {id:'bassChord',name:'Bass + Chord',tags:['王道','伴奏']},
  {id:'octavePulse',name:'Octave Pulse',tags:['力強い','サビ']},
  {id:'waltz',name:'Waltz Bass + Chord',tags:['3拍子','優雅']},
  {id:'sixEight',name:'6/8 Rolling',tags:['6/8','バラード']},
  {id:'syncopated',name:'Syncopated Pop',tags:['おしゃれ','ポップ']},
  {id:'swing',name:'Swing Triplet',tags:['Jazz','スイング']}
];

const state = {
  key:0,bpm:120,meter:4,genre:'ALL',mood:'ALL',keyword:'',
  current:TEMPLATES[0], degrees:[4,5,3,6], substituteIndex:0,
  pattern:'block',grid:8,complexity:3,variation:2,accentDiff:3,humanize:1,swing:0,register:3,density:3,octave:2,
  accents:[3,1,2,1], timers:[], audio:null
};

const $ = id => document.getElementById(id);
const els = {};

function init(){
  ['keySelect','bpmInput','meterSelect','genreFilters','moodFilters','keywordInput','progressionList','resultCount','currentName','spreadStars','currentChords','similarList','substituteTarget','substituteList','backingChords','patternSelect','gridSelect','complexity','variation','accentDiff','humanize','swing','register','density','octave','accentButtons','backingSummary','guideDialog'].forEach(id=>els[id]=$(id));
  NOTE_NAMES.forEach((n,i)=>els.keySelect.add(new Option(n,n,i===0,i===0)));
  PATTERNS.forEach(p=>els.patternSelect.add(new Option(`${p.name} — ${p.tags.join(' / ')}`,p.id)));
  renderFilters(); bind(); selectTemplate(TEMPLATES[0]); updateBackingControls();
}

function unique(field){return [...new Set(TEMPLATES.flatMap(t=>t[field]))].sort((a,b)=>a.localeCompare(b,'ja'));}
function renderFilters(){
  makeFilterButtons(els.genreFilters,['ALL',...unique('genres')],'genre');
  makeFilterButtons(els.moodFilters,['ALL',...unique('moods')],'mood');
}
function makeFilterButtons(root,items,key){
  root.innerHTML=''; items.forEach(v=>{const b=document.createElement('button');b.type='button';b.className='chip'+(state[key]===v?' active':'');b.textContent=v;b.addEventListener('click',()=>{state[key]=v;makeFilterButtons(root,items,key);renderLibrary();});root.append(b);});
}

function bind(){
  document.querySelectorAll('.tab').forEach(b=>b.addEventListener('click',()=>switchTab(b.dataset.tab)));
  els.keySelect.addEventListener('change',()=>{state.key=NOTE_NAMES.indexOf(els.keySelect.value);renderCurrent();});
  els.bpmInput.addEventListener('input',()=>{state.bpm=clamp(+els.bpmInput.value||120,40,240);updateSummary();});
  els.meterSelect.addEventListener('change',()=>{state.meter=+els.meterSelect.value;normalizeAccents();renderAccents();updateSummary();});
  els.keywordInput.addEventListener('input',()=>{state.keyword=els.keywordInput.value.trim().toLowerCase();renderLibrary();});
  $('playProgression').addEventListener('click',()=>play(false)); $('stopButton').addEventListener('click',stopAudio); $('exportChordsMidi').addEventListener('click',()=>exportMidi(false));
  $('playBacking').addEventListener('click',()=>play(true)); $('stopBacking').addEventListener('click',stopAudio); $('exportBackingMidi').addEventListener('click',()=>exportMidi(true));
  $('guideButton').addEventListener('click',()=>els.guideDialog.showModal());
  els.patternSelect.addEventListener('change',()=>{state.pattern=els.patternSelect.value;updateSummary();});
  els.gridSelect.addEventListener('change',()=>{state.grid=+els.gridSelect.value;if(state.grid===24&&state.swing===0){state.swing=50;els.swing.value=50;}updateBackingControls();});
  ['complexity','variation','accentDiff','humanize','swing','register','density','octave'].forEach(id=>els[id].addEventListener('input',()=>{state[id]=+els[id].value;updateBackingControls();}));
}
function switchTab(tab){document.querySelectorAll('.tab').forEach(b=>b.classList.toggle('active',b.dataset.tab===tab));$('progressionPanel').classList.toggle('active',tab==='progression');$('backingPanel').classList.toggle('active',tab==='backing');}
function renderLibrary(){
  const k=state.keyword; const list=TEMPLATES.filter(t=>(state.genre==='ALL'||t.genres.includes(state.genre))&&(state.mood==='ALL'||t.moods.includes(state.mood))&&(!k||[t.name,t.degrees.join(''),...t.genres,...t.moods].join(' ').toLowerCase().includes(k)));
  els.resultCount.textContent=list.length; els.progressionList.innerHTML='';
  if(!list.length){els.progressionList.innerHTML='<div class="empty">該当する進行がありません。</div>';return;}
  list.forEach(t=>{const b=document.createElement('button');b.type='button';b.className='progression-item'+(state.current.id===t.id?' active':'');b.innerHTML=`<div class="item-top"><span class="item-name">${t.name}</span><span class="item-degrees">${t.degrees.join('')}</span></div><div class="item-tags">${t.genres.concat(t.moods).slice(0,5).join(' · ')}</div><div class="stars">${stars(t.spread)}</div>`;b.addEventListener('click',()=>selectTemplate(t));els.progressionList.append(b);});
}
function selectTemplate(t){state.current=t;state.degrees=[...t.degrees];state.substituteIndex=0;renderLibrary();renderCurrent();}
function renderCurrent(){
  els.currentName.textContent=state.current.name;els.spreadStars.innerHTML=`<span title="独自指標：蔓延率">蔓延率 ${stars(state.current.spread)}</span>`;
  renderChordStrip(els.currentChords,state.degrees);renderChordStrip(els.backingChords,state.degrees);renderSimilar();renderSubstitutes();updateSummary();
}
function renderChordStrip(root,degrees){root.innerHTML='';degrees.forEach((d,i)=>{const c=degreeChord(d);const div=document.createElement('div');div.className='chord-cell';div.innerHTML=`${c.name}<small>${ROMANS[d-1]||d} / ${i+1}小節</small>`;root.append(div);});}
function degreeChord(d){const idx=(d-1)%7;const root=(state.key+MAJOR_SCALE[idx])%12;const q=DEGREE_TRIADS[idx];return {degree:d,root,quality:q.quality,intervals:q.intervals,name:NOTE_NAMES[root]+(q.quality==='min'?'m':q.quality==='dim'?'dim':'')};}
function renderSimilar(){
  const scored=TEMPLATES.filter(t=>t.id!==state.current.id).map(t=>({t,score:similarity(state.current,t)})).sort((a,b)=>b.score-a.score).slice(0,5);els.similarList.innerHTML='';
  scored.forEach(({t,score})=>{const b=document.createElement('button');b.type='button';b.className='compact-item';b.innerHTML=`<span>${t.name}<small class="item-tags"><br>${t.degrees.join('')}</small></span><strong>${Math.round(score)}%</strong>`;b.addEventListener('click',()=>selectTemplate(t));els.similarList.append(b);});
}
function similarity(a,b){let same=0;const n=Math.max(a.degrees.length,b.degrees.length);for(let i=0;i<n;i++)if(a.degrees[i]===b.degrees[i])same++;const tags=a.genres.concat(a.moods).filter(x=>b.genres.includes(x)||b.moods.includes(x)).length;return same/n*70+Math.min(tags*8,30);}
function renderSubstitutes(){
  els.substituteTarget.innerHTML='';state.degrees.forEach((d,i)=>{const b=document.createElement('button');b.type='button';b.className='target-tab'+(state.substituteIndex===i?' active':'');b.textContent=degreeChord(d).name;b.addEventListener('click',()=>{state.substituteIndex=i;renderSubstitutes();});els.substituteTarget.append(b);});
  const d=state.degrees[state.substituteIndex];const choices=substitutesFor(d);els.substituteList.innerHTML='';choices.forEach(x=>{const c=degreeChord(x.degree);const b=document.createElement('button');b.type='button';b.className='compact-item';b.innerHTML=`<span>${c.name}<small class="item-tags"><br>${x.reason}</small></span><strong>${ROMANS[x.degree-1]}</strong>`;b.addEventListener('click',()=>{state.degrees[state.substituteIndex]=x.degree;renderCurrent();});els.substituteList.append(b);});
}
function substitutesFor(d){const map={1:[[6,'トニック代理・共通音2/3'],[3,'トニック代理・柔らかい']],2:[[4,'サブドミナント代理'],[7,'ドミナントへの接続']],3:[[1,'トニック代理'],[6,'共通音2/3']],4:[[2,'サブドミナント代理'],[6,'柔らかい展開']],5:[[7,'ドミナント代理'],[3,'共通音を残す']],6:[[1,'トニック代理'],[4,'共通音2/3']],7:[[5,'ドミナント代理'],[2,'緊張を弱める']]};return (map[d]||[]).map(([degree,reason])=>({degree,reason}));}
function stars(n){return '★'.repeat(n)+'☆'.repeat(5-n);}

function normalizeAccents(){const count=state.meter===6?6:state.meter;state.accents=Array.from({length:count},(_,i)=>state.accents[i]??(i===0?3:1));}
function renderAccents(){normalizeAccents();els.accentButtons.innerHTML='';const names=['なし','弱','中','強'];state.accents.forEach((lv,i)=>{const b=document.createElement('button');b.type='button';b.className='accent-button';b.dataset.level=lv;b.innerHTML=`${i+1}<small>${names[lv]}</small>`;b.addEventListener('click',()=>{state.accents[i]=(state.accents[i]+1)%4;renderAccents();});els.accentButtons.append(b);});}
function updateBackingControls(){
  ['complexity','variation','accentDiff','humanize','register','density','octave'].forEach(id=>$(id+'Out').textContent=state[id]);$('swingOut').textContent=state.swing+'%';renderAccents();updateSummary();
}
function updateSummary(){const p=PATTERNS.find(x=>x.id===state.pattern);els.backingSummary.textContent=`${p?.name||state.pattern} / ${state.meter===6?'6/8':state.meter+'/4'} / ${state.bpm} BPM`;}

function stopAudio(){state.timers.forEach(clearTimeout);state.timers=[];if(state.audio){try{state.audio.close();}catch{}state.audio=null;}}
function ensureAudio(){stopAudio();state.audio=new (window.AudioContext||window.webkitAudioContext)();return state.audio;}
function play(backing){const ctx=ensureAudio();const events=backing?buildBackingEvents():buildChordEvents();events.forEach(e=>{const id=setTimeout(()=>playNotes(ctx,e.notes,e.duration,e.velocity),Math.max(0,e.time*1000));state.timers.push(id);});}
function playNotes(ctx,notes,duration,velocity){const now=ctx.currentTime;notes.forEach((m,i)=>{const o=ctx.createOscillator(),g=ctx.createGain(),f=ctx.createBiquadFilter();o.type='triangle';o.frequency.value=440*Math.pow(2,(m-69)/12);f.type='lowpass';f.frequency.value=1800;g.gain.setValueAtTime(0.0001,now);g.gain.exponentialRampToValueAtTime(Math.max(.015,velocity/127*.13),now+.012+i*.002);g.gain.exponentialRampToValueAtTime(.0001,now+Math.max(.08,duration*.9));o.connect(f).connect(g).connect(ctx.destination);o.start(now);o.stop(now+duration);});}
function secondsPerBeat(){return 60/state.bpm;}
function buildChordEvents(){const beat=secondsPerBeat();const beats=state.meter===6?6:state.meter;return state.degrees.map((d,i)=>({time:i*beats*beat,duration:beats*beat*.92,velocity:92,notes:chordMidi(d,4)}));}
function chordMidi(d,oct=4){const c=degreeChord(d);const base=12*(oct+1)+c.root;return c.intervals.map(x=>base+x);}
function buildBackingEvents(){
  const beat=secondsPerBeat();const beats=state.meter===6?6:state.meter;let all=[];state.degrees.forEach((d,bar)=>{const events=patternEvents(d,beats);events.forEach((e,idx)=>{const swingDelay=(state.grid===24||state.swing>0)&&idx%2===1?beat*(state.swing/100)*.22:0;const human=(Math.random()-.5)*state.humanize*.006;all.push({time:bar*beats*beat+e.beat*beat+swingDelay+human,duration:e.len*beat,velocity:velocityForBeat(Math.floor(e.beat)),notes:e.notes});});});return all;
}
function velocityForBeat(beatIndex){const lv=state.accents[beatIndex%state.accents.length]??1;const spread=[0,4,9,16,24,32][state.accentDiff];return clamp(76+(lv-1)*spread+(Math.random()-.5)*state.humanize*3,30,127);}
function patternEvents(d,beats){
  const reg=2+state.register;const triad=chordMidi(d,reg);const root=triad[0]-12;const octave=root+12;const p=state.pattern;const density=state.density;let ev=[];
  if(state.meter===3||p==='waltz'){for(let b=0;b<3;b++)ev.push({beat:b,len:.82,notes:b===0?[root]:triad});return ev;}
  if(state.meter===6||p==='sixEight'){for(let b=0;b<6;b++)ev.push({beat:b,len:.55,notes:[b%3===0?root:triad[(b-1)%3]]});return ev;}
  if(p==='block')return [{beat:0,len:beats*.92,notes:triad.concat(state.octave>3?[triad[0]+12]:[])}];
  if(p==='quarters'){for(let b=0;b<beats;b++)ev.push({beat:b,len:.8,notes:triad});return ev;}
  if(p==='eighths'){for(let b=0;b<beats*2;b++)ev.push({beat:b/2,len:.4,notes:b%2?[triad[1],triad[2]]:[root,triad[0]]});return ev;}
  if(p==='bassChord'){for(let b=0;b<beats;b++){ev.push({beat:b,len:.8,notes:b%2===0?[root]:triad});}return ev;}
  if(p==='octavePulse'){for(let b=0;b<beats*2;b++)ev.push({beat:b/2,len:.42,notes:b%2?[triad[1],triad[2],triad[0]+12]:[root,octave]});return ev;}
  if(p==='syncopated'){const pos=[0,.75,1.5,2.5,3.25];pos.filter(x=>x<beats).forEach((x,i)=>ev.push({beat:x,len:.45,notes:i%2?[triad[1],triad[2]]:[root,triad[0],triad[2]]}));return ev;}
  if(p==='swing'){for(let b=0;b<beats;b++){ev.push({beat:b,len:.5,notes:[root]});ev.push({beat:b+2/3,len:.28,notes:[triad[(b+1)%3]]});}return ev;}
  const seq=p==='arpDown'?[2,1,0,1]:p==='arpWave'?[0,1,2,1]:[0,1,2,1];const steps=Math.max(beats*2,beats*(density>=4?4:2));for(let i=0;i<steps;i++){let note=triad[seq[i%seq.length]];if(state.octave>=3&&i%8>=4)note+=12;ev.push({beat:i*(beats/steps),len:(beats/steps)*.82,notes:[note]});}return ev;
}

function exportMidi(backing){const events=backing?buildBackingEvents():buildChordEvents();const data=makeMidi(events,backing?'COORDINATE_BACKING':'COORDINATE_PROGRESSION');downloadBlob(new Blob([data],{type:'audio/midi'}),`${backing?'COORDINATE_BACKING':'COORDINATE_PROGRESSION'}_${state.bpm}BPM.mid`);}
function makeMidi(events,name){
  const tpq=480;const tempo=Math.round(60000000/state.bpm);const bytes=[];const push=(...x)=>bytes.push(...x);const str=s=>[...s].map(c=>c.charCodeAt(0));
  push(...str('MThd'),0,0,0,6,0,1,0,1,(tpq>>8)&255,tpq&255);
  let tr=[];const tpush=(...x)=>tr.push(...x);tpush(0,0xff,0x03,name.length,...str(name));tpush(0,0xff,0x51,3,(tempo>>16)&255,(tempo>>8)&255,tempo&255);const denom=state.meter===6?8:4;const nn=state.meter===6?6:state.meter;tpush(0,0xff,0x58,4,nn,Math.log2(denom),24,8);
  const flat=[];events.forEach(e=>{const start=Math.max(0,Math.round(e.time/secondsPerBeat()*tpq));const end=start+Math.max(30,Math.round(e.duration/secondsPerBeat()*tpq));e.notes.forEach(n=>{flat.push({tick:start,on:true,n,vel:Math.round(e.velocity)});flat.push({tick:end,on:false,n,vel:0});});});flat.sort((a,b)=>a.tick-b.tick||Number(a.on)-Number(b.on));let last=0;flat.forEach(e=>{tpush(...vlq(e.tick-last),e.on?0x90:0x80,e.n,e.vel);last=e.tick;});tpush(0,0xff,0x2f,0);push(...str('MTrk'),(tr.length>>>24)&255,(tr.length>>>16)&255,(tr.length>>>8)&255,tr.length&255,...tr);return new Uint8Array(bytes);
}
function vlq(v){let b=[v&127];while(v>>=7)b.unshift((v&127)|128);return b;}
function downloadBlob(blob,name){const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=name;document.body.append(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove();},1000);}
function clamp(v,min,max){return Math.max(min,Math.min(max,v));}

document.addEventListener('DOMContentLoaded',init);
