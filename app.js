'use strict';

const NOTE_NAMES=['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];
const MAJOR_SCALE=[0,2,4,5,7,9,11];
const ROMANS=['I','ii','iii','IV','V','vi','vii°'];
const DEGREE_TRIADS=[
  {quality:'maj',intervals:[0,4,7]},{quality:'min',intervals:[0,3,7]},{quality:'min',intervals:[0,3,7]},
  {quality:'maj',intervals:[0,4,7]},{quality:'maj',intervals:[0,4,7]},{quality:'min',intervals:[0,3,7]},{quality:'dim',intervals:[0,3,6]}
];
const TEMPLATES=[
 ['王道 4536','4536',['J-POP','アニソン'],['王道','エモい','サビ'],5],['カノン系 1564','1564',['J-POP','バラード'],['王道','切ない','サビ'],5],['小室系 6451','6451',['J-POP','90s'],['王道','力強い','サビ'],5],['循環 1625','1625',['J-POP','Soul'],['王道','おしゃれ','Aメロ'],4],['ポップ 6415','6415',['J-POP','Pop'],['明るい','王道','サビ'],5],['爽快 1456','1456',['J-POP','Rock'],['明るい','爽やか','サビ'],4],['切なめ 6345','6345',['J-POP','バラード'],['切ない','エモい','Bメロ'],4],['上昇感 4565','4565',['J-POP','アニソン'],['壮大','力強い','サビ'],4],['帰還 2516','2516',['Jazz','Soul'],['おしゃれ','夜','Aメロ'],4],['定番 251','251',['Jazz','Soul'],['王道','おしゃれ','解決'],5],['ツーファイブ連結 3625','3625',['Jazz','R&B'],['おしゃれ','都会的','Aメロ'],4],['ジャズ循環 6251','6251',['Jazz','R&B'],['おしゃれ','切ない','夜'],5],['ブルース寄り 1411','1411',['Blues','Rock'],['王道','渋い','Aメロ'],4],['ロック直進 1454','1454',['Rock'],['力強い','シンプル','Aメロ'],4],['パワーポップ 1645','1645',['Rock','Pop'],['明るい','爽やか','サビ'],4],['オルタナ 6145','6145',['Rock','Indie'],['エモい','個性的','サビ'],3],['R&B 4362','4362',['R&B','Soul'],['おしゃれ','夜','Aメロ'],3],['R&B 6413','6413',['R&B','Neo Soul'],['おしゃれ','切ない','夜'],3],['都会的 3426','3426',['R&B','City Pop'],['おしゃれ','都会的','Aメロ'],3],['シティポップ 2645','2645',['City Pop','J-POP'],['おしゃれ','夜','Bメロ'],4],['EDM 4561','4561',['EDM','Future Bass'],['壮大','エモい','サビ'],4],['Future Bass 6341','6341',['EDM','Future Bass'],['エモい','おしゃれ','サビ'],3],['House 1645','1645',['EDM','House'],['明るい','反復','サビ'],4],['劇伴 6412','6412',['劇伴','Game'],['壮大','切ない','展開'],3],['劇伴 4361','4361',['劇伴','Anime'],['エモい','壮大','展開'],3],['不穏 6713','6713',['劇伴','Game'],['緊張感','個性的','Bメロ'],2],['幻想 3614','3614',['劇伴','Fantasy'],['幻想的','切ない','Aメロ'],3],['ワルツ王道 1451','1451',['Waltz','バラード'],['王道','優雅','3拍子'],4],['ワルツ切なめ 6415','6415',['Waltz','劇伴'],['切ない','優雅','3拍子'],4],['6/8 バラード 1564','1564',['6/8','バラード'],['王道','切ない','ゆったり'],5],['6/8 壮大 4536','4536',['6/8','劇伴'],['壮大','エモい','ゆったり'],4],['シンプル 1415','1415',['Folk','Pop'],['シンプル','王道','Aメロ'],4],['フォーク 1541','1541',['Folk','J-POP'],['温かい','王道','Aメロ'],4],['爽やか 4156','4156',['J-POP','Pop'],['爽やか','明るい','サビ'],4],['泣き 6453','6453',['J-POP','バラード'],['切ない','泣ける','サビ'],4],['浮遊 4316','4316',['Indie','Neo Soul'],['おしゃれ','浮遊感','Aメロ'],3],['少し変 3514','3514',['Indie','劇伴'],['個性的','おしゃれ','展開'],2]
].map((x,i)=>({id:i,name:x[0],degrees:x[1].split('').map(Number),genres:x[2],moods:x[3],spread:x[4]}));

const PATTERNS=[
 {id:'block',name:'Block Theory',desc:'拍頭を和音で支える',tags:['王道','シンプル']},
 {id:'pulse8',name:'8th Pulse',desc:'8分刻みの安定した骨格',tags:['ポップ','ロック']},
 {id:'arpUp',name:'Arpeggio Up',desc:'低音から上昇する分散',tags:['バラード','王道']},
 {id:'arpWave',name:'Arpeggio Wave',desc:'上下に往復する分散',tags:['バラード','おしゃれ']},
 {id:'bassChord',name:'Bass + Chord',desc:'低音と右手和音を分離',tags:['王道','ポップ']},
 {id:'sync',name:'Syncopated',desc:'裏拍を使うポップ骨格',tags:['おしゃれ','ポップ']},
 {id:'rock',name:'Rock Octave',desc:'低音オクターブと刻み',tags:['ロック','力強い']},
 {id:'waltz',name:'Waltz',desc:'低音＋2・3拍目の和音',tags:['3拍子','バラード']},
 {id:'sixEight',name:'6/8 Rolling',desc:'6/8の流れる分散',tags:['バラード','王道']},
 {id:'swing',name:'Triplet Swing',desc:'3連後半へ置くスイング',tags:['スイング','おしゃれ']},
 {id:'broken',name:'Broken Chord',desc:'和音を小さく分割',tags:['おしゃれ','バラード']},
 {id:'anthem',name:'Anthem',desc:'サビ向けの広い配置',tags:['王道','ロック']}
];

const state={
 theme:'ocean',key:0,bpm:120,meter:4,genre:'ALL',mood:'ALL',keyword:'',current:TEMPLATES[0],degrees:[4,5,3,6],substituteIndex:0,
 pattern:'block',grid:16,click:false,countIn:false,clickVolume:65,randomNotes:4,freedom:35,complexity:45,density:55,variation:35,rangeMotion:30,octave:30,swing:0,humanize:15,accentWidth:55,
 rangeLow:36,rangeHigh:84,accents:[3,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0],audio:null,timers:[],lastEvents:null,seed:1
};
const $=id=>document.getElementById(id);
const els={};

function init(){
 ['themeSelect','meterSelect','keySelect','genreFilters','moodFilters','keywordInput','progressionList','resultCount','currentName','spreadStars','currentChords','similarList','substituteTarget','substituteList','backingChords','patternCards','gridSelect','styleFilter','accentButtons','backingSummary','engineSummary','guideDialog','rangeFill','rangeLowHandle','rangeHighHandle','rangeLowLabel','rangeHighLabel','rangeReadout'].forEach(id=>els[id]=$(id));
 NOTE_NAMES.forEach((n,i)=>els.keySelect.add(new Option(n,n,i===0,i===0)));
 renderFilters();renderPatternCards();renderAccents();bind();selectTemplate(TEMPLATES[0]);updateAllControls();
 const saved=localStorage.getItem('coordinate-theme');if(saved&&['ocean','minimal','junk','pop'].includes(saved)){state.theme=saved;els.themeSelect.value=saved;document.body.dataset.theme=saved;}
}
function bind(){
 document.querySelectorAll('.mode-tab').forEach(b=>b.addEventListener('click',()=>switchTab(b.dataset.tab)));
 els.themeSelect.addEventListener('change',()=>{state.theme=els.themeSelect.value;document.body.dataset.theme=state.theme;localStorage.setItem('coordinate-theme',state.theme);});
 els.keySelect.addEventListener('change',()=>{state.key=NOTE_NAMES.indexOf(els.keySelect.value);renderCurrent();});
 els.meterSelect.addEventListener('change',()=>{state.meter=+els.meterSelect.value;renderAccents();updateSummary();});
 els.keywordInput.addEventListener('input',()=>{state.keyword=els.keywordInput.value.trim().toLowerCase();renderLibrary();});
 $('clickToggle').addEventListener('change',e=>state.click=e.target.checked);
 $('countInToggle').addEventListener('change',e=>state.countIn=e.target.checked);
 $('guideButton').addEventListener('click',()=>els.guideDialog.showModal());
 $('playProgression').addEventListener('click',()=>play(false));$('globalPlay').addEventListener('click',()=>play(document.querySelector('[data-tab="backing"]').classList.contains('active')));
 $('globalStop').addEventListener('click',stopAudio);$('exportChordsMidi').addEventListener('click',()=>exportMidi(false));
 $('playBacking').addEventListener('click',()=>play(true));$('regenerateBacking').addEventListener('click',()=>{state.seed++;state.lastEvents=buildBackingEvents();flashSummary();});$('exportBackingMidi').addEventListener('click',()=>exportMidi(true));
 els.gridSelect.addEventListener('change',()=>{state.grid=+els.gridSelect.value;if(state.grid===24&&state.swing<40)setParam('swing',50);updateSummary();});
 els.styleFilter.addEventListener('change',renderPatternCards);
 setupDragValues();setupKnobs();setupDualRange();
}
function setupDragValues(){document.querySelectorAll('.value-drag').forEach(el=>makeDragControl(el,el.dataset.param));}
function attachDoubleTap(el,fn){let last=0;el.addEventListener('pointerup',e=>{if(e.pointerType!=='touch')return;const now=Date.now();if(now-last<340){e.preventDefault();fn();last=0;}else last=now;});}
function makeDragControl(el,param){
 let startX=0,startY=0,start=0,moved=false;
 const ranges={bpm:[40,240,1],clickVolume:[0,100,1]};
 const [min,max,step]=ranges[param];
 const begin=e=>{const p=point(e);startX=p.x;startY=p.y;start=state[param];moved=false;el.setPointerCapture?.(e.pointerId);e.preventDefault();};
 const move=e=>{if(e.buttons===0&&e.pointerType!=='touch')return;const p=point(e),delta=(p.x-startX)-(p.y-startY);if(Math.abs(delta)>2)moved=true;setParam(param,clamp(Math.round((start+delta*step)/step)*step,min,max));};
 el.addEventListener('pointerdown',begin);el.addEventListener('pointermove',move);
 el.addEventListener('dblclick',()=>promptValue(param,min,max));attachDoubleTap(el,()=>promptValue(param,min,max));
 el.addEventListener('keydown',e=>{if(e.key==='ArrowUp'||e.key==='ArrowRight'){setParam(param,clamp(state[param]+step,min,max));e.preventDefault();}if(e.key==='ArrowDown'||e.key==='ArrowLeft'){setParam(param,clamp(state[param]-step,min,max));e.preventDefault();}if(e.key==='Enter')promptValue(param,min,max);});
}
function setupKnobs(){document.querySelectorAll('.knob-unit[data-param]').forEach(unit=>{
 const param=unit.dataset.param,min=+unit.dataset.min,max=+unit.dataset.max;setParam(param,+unit.dataset.value,false);
 let sx=0,sy=0,sv=0;
 unit.addEventListener('pointerdown',e=>{const p=point(e);sx=p.x;sy=p.y;sv=state[param];unit.setPointerCapture?.(e.pointerId);e.preventDefault();});
 unit.addEventListener('pointermove',e=>{if(e.buttons===0&&e.pointerType!=='touch')return;const p=point(e);const sensitivity=(max-min)/220;setParam(param,clamp(Math.round(sv+((p.x-sx)-(p.y-sy))*sensitivity),min,max));});
 unit.addEventListener('dblclick',()=>promptValue(param,min,max));attachDoubleTap(unit,()=>promptValue(param,min,max));
 });}
function promptValue(param,min,max){const value=prompt(`${param.toUpperCase()} (${min}–${max})`,String(state[param]));if(value!==null&&!Number.isNaN(+value))setParam(param,clamp(+value,min,max));}
function point(e){return {x:e.clientX??e.touches?.[0]?.clientX??0,y:e.clientY??e.touches?.[0]?.clientY??0};}
function setParam(param,value,refresh=true){state[param]=value;const valueEl=$(`${param}Value`);if(valueEl)valueEl.textContent=Math.round(value);const unit=document.querySelector(`.knob-unit[data-param="${param}"]`);if(unit){const min=+unit.dataset.min,max=+unit.dataset.max,ratio=(value-min)/(max-min);unit.querySelector('.knob').style.setProperty('--angle',`${-135+ratio*270}deg`);}const drag=document.querySelector(`.value-drag[data-param="${param}"]`);if(drag)drag.setAttribute('aria-valuenow',String(value));if(refresh)updateSummary();}

function setupDualRange(){
 const track=els.rangeLowHandle.parentElement;let active=null;
 const begin=(which,e)=>{active=which;track.setPointerCapture?.(e.pointerId);move(e);e.preventDefault();};
 const move=e=>{if(!active)return;const r=track.getBoundingClientRect();const ratio=clamp((r.bottom-e.clientY)/r.height,0,1);let midi=Math.round(24+ratio*72);if(active==='low')state.rangeLow=Math.min(midi,state.rangeHigh-5);else state.rangeHigh=Math.max(midi,state.rangeLow+5);renderRange();updateSummary();};
 els.rangeLowHandle.addEventListener('pointerdown',e=>begin('low',e));els.rangeHighHandle.addEventListener('pointerdown',e=>begin('high',e));
 track.addEventListener('pointermove',move);track.addEventListener('pointerup',()=>active=null);track.addEventListener('pointercancel',()=>active=null);
 [els.rangeLowHandle,els.rangeHighHandle].forEach((h,i)=>{const edit=()=>{const key=i?'rangeHigh':'rangeLow';const v=prompt(`${i?'最高':'最低'}MIDIノート (24–96)`,state[key]);if(v!==null&&!isNaN(+v)){state[key]=clamp(+v,24,96);if(state.rangeLow>state.rangeHigh-5){if(i)state.rangeLow=state.rangeHigh-5;else state.rangeHigh=state.rangeLow+5;}renderRange();}};h.addEventListener('dblclick',edit);attachDoubleTap(h,edit);});
 renderRange();
}
function renderRange(){const toPct=n=>(n-24)/72*100;const low=toPct(state.rangeLow),high=toPct(state.rangeHigh);els.rangeLowHandle.style.bottom=`${low}%`;els.rangeHighHandle.style.bottom=`${high}%`;els.rangeFill.style.bottom=`${low}%`;els.rangeFill.style.height=`${high-low}%`;els.rangeLowLabel.textContent=noteLabel(state.rangeLow);els.rangeHighLabel.textContent=noteLabel(state.rangeHigh);els.rangeReadout.textContent=`${noteLabel(state.rangeLow)} — ${noteLabel(state.rangeHigh)}`;}

function unique(field){return [...new Set(TEMPLATES.flatMap(t=>t[field]))].sort((a,b)=>a.localeCompare(b,'ja'));}
function renderFilters(){makeFilterButtons(els.genreFilters,['ALL',...unique('genres')],'genre');makeFilterButtons(els.moodFilters,['ALL',...unique('moods')],'mood');}
function makeFilterButtons(root,items,key){root.innerHTML='';items.forEach(v=>{const b=document.createElement('button');b.type='button';b.className='chip'+(state[key]===v?' active':'');b.textContent=v;b.addEventListener('click',()=>{state[key]=v;makeFilterButtons(root,items,key);renderLibrary();});root.append(b);});}
function renderLibrary(){const k=state.keyword;const list=TEMPLATES.filter(t=>(state.genre==='ALL'||t.genres.includes(state.genre))&&(state.mood==='ALL'||t.moods.includes(state.mood))&&(!k||[t.name,t.degrees.join(''),...t.genres,...t.moods].join(' ').toLowerCase().includes(k)));els.resultCount.textContent=list.length;els.progressionList.innerHTML='';if(!list.length){els.progressionList.innerHTML='<div class="empty">該当なし</div>';return;}list.forEach(t=>{const b=document.createElement('button');b.type='button';b.className='progression-item'+(state.current.id===t.id?' active':'');b.innerHTML=`<div class="item-top"><span class="item-name">${t.name}</span><span class="item-degrees">${t.degrees.join('')}</span></div><div class="item-tags">${t.genres.concat(t.moods).slice(0,5).join(' · ')}</div><div class="stars">${stars(t.spread)}</div>`;b.addEventListener('click',()=>selectTemplate(t));els.progressionList.append(b);});}
function selectTemplate(t){state.current=t;state.degrees=[...t.degrees];state.substituteIndex=0;renderLibrary();renderCurrent();}
function renderCurrent(){els.currentName.textContent=state.current.name;els.spreadStars.textContent=`蔓延率 ${stars(state.current.spread)}`;renderChordStrip(els.currentChords,state.degrees);renderChordStrip(els.backingChords,state.degrees);renderSimilar();renderSubstitutes();updateSummary();}
function renderChordStrip(root,degrees){root.innerHTML='';degrees.forEach((d,i)=>{const c=degreeChord(d),div=document.createElement('div');div.className='chord-cell';div.innerHTML=`${c.name}<small>${ROMANS[d-1]||d} / ${i+1}</small>`;root.append(div);});}
function degreeChord(d){const idx=(d-1)%7,root=(state.key+MAJOR_SCALE[idx])%12,q=DEGREE_TRIADS[idx];return {degree:d,root,quality:q.quality,intervals:q.intervals,name:NOTE_NAMES[root]+(q.quality==='min'?'m':q.quality==='dim'?'dim':'')};}
function renderSimilar(){const scored=TEMPLATES.filter(t=>t.id!==state.current.id).map(t=>({t,score:similarity(state.current,t)})).sort((a,b)=>b.score-a.score).slice(0,5);els.similarList.innerHTML='';scored.forEach(({t,score})=>{const b=document.createElement('button');b.type='button';b.className='compact-item';b.innerHTML=`<span>${t.name}<small class="item-tags"><br>${t.degrees.join('')}</small></span><strong>${Math.round(score)}%</strong>`;b.addEventListener('click',()=>selectTemplate(t));els.similarList.append(b);});}
function similarity(a,b){let same=0,n=Math.max(a.degrees.length,b.degrees.length);for(let i=0;i<n;i++)if(a.degrees[i]===b.degrees[i])same++;const tags=a.genres.concat(a.moods).filter(x=>b.genres.concat(b.moods).includes(x)).length;return same/n*65+Math.min(tags*9,27)+Math.max(0,8-Math.abs(a.spread-b.spread)*2);}
function renderSubstitutes(){els.substituteTarget.innerHTML='';state.degrees.forEach((d,i)=>{const b=document.createElement('button');b.type='button';b.className='target-tab'+(state.substituteIndex===i?' active':'');b.textContent=degreeChord(d).name;b.addEventListener('click',()=>{state.substituteIndex=i;renderSubstitutes();});els.substituteTarget.append(b);});const d=state.degrees[state.substituteIndex],opts=[d,d===1?6:d===6?1:d===4?2:d===5?3:((d+1)%7)+1,d===7?5:7].filter((x,i,a)=>x>=1&&x<=7&&a.indexOf(x)===i);els.substituteList.innerHTML='';opts.forEach(x=>{const b=document.createElement('button');b.type='button';b.className='compact-item';b.innerHTML=`<span>${degreeChord(x).name}<small class="item-tags"><br>${ROMANS[x-1]}</small></span><strong>置換</strong>`;b.addEventListener('click',()=>{state.degrees[state.substituteIndex]=x;renderCurrent();});els.substituteList.append(b);});}
function stars(n){return '★'.repeat(n)+'☆'.repeat(5-n);}
function switchTab(tab){document.querySelectorAll('.mode-tab').forEach(b=>b.classList.toggle('active',b.dataset.tab===tab));$('progressionPanel').classList.toggle('active',tab==='progression');$('backingPanel').classList.toggle('active',tab==='backing');}

function renderPatternCards(){const filter=els.styleFilter?.value||'ALL';els.patternCards.innerHTML='';PATTERNS.filter(p=>filter==='ALL'||p.tags.includes(filter)).forEach(p=>{const b=document.createElement('button');b.type='button';b.className='pattern-card'+(state.pattern===p.id?' active':'');b.innerHTML=`<strong>${p.name}</strong><small>${p.desc}<br>${p.tags.join(' · ')}</small>`;b.addEventListener('click',()=>{state.pattern=p.id;renderPatternCards();updateSummary();});els.patternCards.append(b);});}
function renderAccents(){els.accentButtons.innerHTML='';for(let i=0;i<16;i++){const b=document.createElement('button');b.type='button';b.className='accent-step';b.dataset.level=state.accents[i];b.innerHTML=`${i+1}<small>${['—','W','M','S'][state.accents[i]]}</small>`;b.addEventListener('click',()=>{state.accents[i]=(state.accents[i]+1)%4;renderAccents();});els.accentButtons.append(b);}}
function updateAllControls(){['bpm','clickVolume','randomNotes','freedom','complexity','density','variation','rangeMotion','octave','swing','humanize','accentWidth'].forEach(p=>setParam(p,state[p],false));renderRange();updateSummary();}
function updateSummary(){const p=PATTERNS.find(x=>x.id===state.pattern);els.backingSummary.textContent=`${p?.name||'Theory'} / ${meterLabel()} / ${state.bpm} BPM`;els.engineSummary.textContent=`Complexity ${state.complexity} · Freedom ${state.freedom} · Random ${state.randomNotes} · Range ${noteLabel(state.rangeLow)}–${noteLabel(state.rangeHigh)}`;$('bpmValue').textContent=state.bpm;$('clickVolumeValue').textContent=state.clickVolume;}
function meterLabel(){return state.meter===6?'6/8':`${state.meter}/4`;}
function flashSummary(){els.engineSummary.animate([{opacity:.2},{opacity:1}],{duration:350});}

function audioContext(){if(!state.audio)state.audio=new (window.AudioContext||window.webkitAudioContext)();return state.audio;}
function stopAudio(){state.timers.forEach(t=>clearTimeout(t));state.timers=[];if(state.audio){try{state.audio.close();}catch{}state.audio=null;}}
function secondsPerBeat(){return 60/state.bpm;}
function play(backing){stopAudio();const ctx=audioContext();const countBeats=state.countIn?(state.meter===6?6:state.meter):0;const delay=countBeats*secondsPerBeat();if(state.click||state.countIn)scheduleClick(ctx,countBeats,delay,backing);const events=backing?buildBackingEvents():buildChordEvents();if(backing)state.lastEvents=events;events.forEach(e=>scheduleNotes(ctx,e.time+delay,e.duration,e.notes,e.velocity));}
function scheduleClick(ctx,countBeats,delay,includeMain){const beatsPerBar=state.meter===6?6:state.meter,total=countBeats+(includeMain?state.degrees.length*beatsPerBar:state.degrees.length*beatsPerBar);for(let i=0;i<total;i++){if(i>=countBeats&&!state.click)continue;const t=i*secondsPerBeat();const strong=i%beatsPerBar===0;scheduleTone(ctx,t,.045,strong?1400:900,Math.max(.015,state.clickVolume/100*.09),true);}}
function scheduleNotes(ctx,time,duration,notes,velocity=90){notes.forEach((n,i)=>{const freq=440*Math.pow(2,(n-69)/12);scheduleTone(ctx,time,duration,freq,Math.max(.025,velocity/127*.12)/(1+i*.07),false);});}
function scheduleTone(ctx,time,duration,freq,gainValue,click){const o=ctx.createOscillator(),g=ctx.createGain(),f=ctx.createBiquadFilter();o.type=click?'square':'triangle';o.frequency.value=freq;f.type='lowpass';f.frequency.value=click?2400:1800;g.gain.setValueAtTime(.0001,ctx.currentTime+time);g.gain.exponentialRampToValueAtTime(gainValue,ctx.currentTime+time+.008);g.gain.exponentialRampToValueAtTime(.0001,ctx.currentTime+time+Math.max(.04,duration));o.connect(f).connect(g).connect(ctx.destination);o.start(ctx.currentTime+time);o.stop(ctx.currentTime+time+duration+.05);}

function buildChordEvents(){const beats=state.meter===6?6:state.meter,spb=secondsPerBeat(),events=[];state.degrees.forEach((d,bar)=>{const c=degreeChord(d),root=fitRange(48+c.root),notes=c.intervals.map(x=>fitRange(root+x));events.push({time:bar*beats*spb,duration:beats*spb*.92,notes:[...new Set(notes)],velocity:88});});return events;}
function buildBackingEvents(){
 const beats=state.meter===6?6:state.meter,spb=secondsPerBeat(),events=[],rand=mulberry32(state.seed++ + Date.now()%100000);
 state.degrees.forEach((d,bar)=>{const chord=degreeChord(d),barEvents=basePattern(chord,beats,rand);const manipulated=manipulateEvents(barEvents,chord,beats,rand,bar);manipulated.forEach(e=>{let beat=e.beat;const step=Math.round((beat%1)*4)%4;if(state.grid===24||state.swing>0){if(step===1||step===3)beat+=state.swing/100*0.165;}const human=(rand()-.5)*(state.humanize/100)*.055;const accentIndex=Math.floor((beat/beats)*16)%16;const vel=accentVelocity(state.accents[accentIndex],rand);events.push({time:(bar*beats+beat)*spb+human,duration:e.len*spb,notes:e.notes.map(n=>fitRange(n)),velocity:vel});});});
 return events.sort((a,b)=>a.time-b.time);
}
function basePattern(chord,beats,rand){const root=48+chord.root,triad=chord.intervals.map(i=>root+i),ev=[];const p=state.pattern;
 if(p==='block'){for(let b=0;b<beats;b++)ev.push({beat:b,len:.78,notes:triad});}
 else if(p==='pulse8'){for(let i=0;i<beats*2;i++)ev.push({beat:i*.5,len:.38,notes:i%2?[triad[1],triad[2]]:[triad[0],triad[2]]});}
 else if(p==='bassChord'){for(let b=0;b<beats;b++){ev.push({beat:b,len:.65,notes:[root-12]});ev.push({beat:b+.5,len:.38,notes:[triad[1],triad[2],triad[0]+12]});}}
 else if(p==='sync'){[0,.75,1.5,2.25,3.25,4.5,5.25].filter(x=>x<beats).forEach((x,i)=>ev.push({beat:x,len:.42,notes:i%2?[triad[1],triad[2]]:[triad[0],triad[2]]}));}
 else if(p==='rock'){for(let i=0;i<beats*2;i++)ev.push({beat:i*.5,len:.35,notes:i%2?[root,root+12]:[root-12,root]});}
 else if(p==='waltz'){for(let b=0;b<beats;b++)ev.push({beat:b,len:.68,notes:b%3===0?[root-12]:[triad[1],triad[2],triad[0]+12]});}
 else if(p==='sixEight'){for(let i=0;i<beats;i++)ev.push({beat:i,len:.72,notes:[triad[[0,1,2,1,2,1][i%6]]+(i>=3?12:0)]});}
 else if(p==='swing'){for(let b=0;b<beats;b++){ev.push({beat:b,len:.52,notes:[root-12]});ev.push({beat:b+2/3,len:.25,notes:[triad[(b+1)%3]]});}}
 else if(p==='broken'){for(let i=0;i<beats*4;i++)ev.push({beat:i*.25,len:.2,notes:[triad[[0,2,1,2][i%4]]+(i%8>4?12:0)]});}
 else if(p==='anthem'){for(let b=0;b<beats;b++)ev.push({beat:b,len:.82,notes:[root-12,root,triad[1]+12,triad[2]+12]});}
 else {const seq=p==='arpUp'?[0,1,2,1]:[0,1,2,1,2,1,0,1];for(let i=0;i<beats*2;i++)ev.push({beat:i*.5,len:.4,notes:[triad[seq[i%seq.length]]+(p==='arpWave'&&i%8>=4?12:0)]});}
 return ev;
}
function manipulateEvents(events,chord,beats,rand,bar){
 let out=events.map(e=>({beat:e.beat,len:e.len,notes:[...e.notes]}));
 const complexity=state.complexity/100,freedom=state.freedom/100,variation=state.variation/100,density=state.density/100;
 // Density can thin or duplicate the underlying theory.
 out=out.filter(()=>rand()<.42+density*.68);
 const targetExtra=Math.round(state.randomNotes*(.35+freedom*.65));
 for(let i=0;i<targetExtra;i++){
   const slot=Math.floor(rand()*beats*4)/4;const root=48+chord.root;const scale=[0,2,4,5,7,9,11];let interval;
   if(rand()>freedom*.65)interval=chord.intervals[Math.floor(rand()*chord.intervals.length)];else interval=scale[Math.floor(rand()*scale.length)]+(rand()<complexity*.25?12:0);
   out.push({beat:slot,len:.18+rand()*.5,notes:[root+interval]});
 }
 out.forEach((e,i)=>{
   if(rand()<complexity*.55&&e.notes.length<4){const base=e.notes[0];e.notes.push(base+(rand()<.55?12:7));}
   if(rand()<state.octave/100*.45)e.notes=e.notes.map((n,j)=>n+(j===0&&rand()<.5?-12:12));
   if(rand()<freedom*.32){e.beat=clamp(e.beat+(rand()-.5)*(.25+freedom*.55),0,beats-.05);e.len=clamp(e.len*(.65+rand()*.9),.08,1.5);}
   if(rand()<variation*.3&&bar%2===1)e.notes.reverse();
   const motion=Math.round((rand()-.5)*(state.rangeMotion/100)*24);e.notes=e.notes.map(n=>n+motion);
 });
 return out.filter(e=>e.beat<beats).sort((a,b)=>a.beat-b.beat);
}
function accentVelocity(level,rand){const width=state.accentWidth/100;const center=84,spread=10+width*34;const offsets=[-spread*.55,-spread*.2,spread*.25,spread];return clamp(center+offsets[level]+(rand()-.5)*state.humanize*.22,1,127);}
function fitRange(note){while(note<state.rangeLow)note+=12;while(note>state.rangeHigh)note-=12;return clamp(Math.round(note),state.rangeLow,state.rangeHigh);}
function noteLabel(n){return NOTE_NAMES[((n%12)+12)%12]+(Math.floor(n/12)-1);}
function mulberry32(a){return function(){let t=a+=0x6D2B79F5;t=Math.imul(t^t>>>15,t|1);t^=t+Math.imul(t^t>>>7,t|61);return ((t^t>>>14)>>>0)/4294967296;};}

function exportMidi(backing){const events=backing?(state.lastEvents||buildBackingEvents()):buildChordEvents();const data=makeMidi(events,backing?'COORDINATE_BACKING':'COORDINATE_PROGRESSION');downloadBlob(new Blob([data],{type:'audio/midi'}),`${backing?'COORDINATE_BACKING':'COORDINATE_PROGRESSION'}_${state.bpm}BPM.mid`);}
function makeMidi(events,name){const tpq=480,tempo=Math.round(60000000/state.bpm),bytes=[],push=(...x)=>bytes.push(...x),str=s=>[...s].map(c=>c.charCodeAt(0));push(...str('MThd'),0,0,0,6,0,1,0,1,(tpq>>8)&255,tpq&255);let tr=[],tpush=(...x)=>tr.push(...x);tpush(0,0xff,0x03,name.length,...str(name));tpush(0,0xff,0x51,3,(tempo>>16)&255,(tempo>>8)&255,tempo&255);const denom=state.meter===6?8:4,nn=state.meter===6?6:state.meter;tpush(0,0xff,0x58,4,nn,Math.log2(denom),24,8);const flat=[];events.forEach(e=>{const start=Math.max(0,Math.round(e.time/secondsPerBeat()*tpq)),end=start+Math.max(30,Math.round(e.duration/secondsPerBeat()*tpq));e.notes.forEach(n=>{flat.push({tick:start,on:true,n,vel:Math.round(e.velocity)});flat.push({tick:end,on:false,n,vel:0});});});flat.sort((a,b)=>a.tick-b.tick||Number(a.on)-Number(b.on));let last=0;flat.forEach(e=>{tpush(...vlq(e.tick-last),e.on?0x90:0x80,e.n,e.vel);last=e.tick;});tpush(0,0xff,0x2f,0);push(...str('MTrk'),(tr.length>>>24)&255,(tr.length>>>16)&255,(tr.length>>>8)&255,tr.length&255,...tr);return new Uint8Array(bytes);}
function vlq(v){let b=[v&127];while(v>>=7)b.unshift((v&127)|128);return b;}
function downloadBlob(blob,name){const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=name;document.body.append(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove();},1000);}
function clamp(v,min,max){return Math.max(min,Math.min(max,v));}

document.addEventListener('DOMContentLoaded',init);
