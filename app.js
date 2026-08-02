'use strict';

const NOTE_NAMES=['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];
const MAJOR_SCALE=[0,2,4,5,7,9,11];
const ROMANS=['I','ii','iii','IV','V','vi','vii°'];
const DEGREE_TRIADS=[
  {quality:'maj',intervals:[0,4,7]},{quality:'min',intervals:[0,3,7]},{quality:'min',intervals:[0,3,7]},
  {quality:'maj',intervals:[0,4,7]},{quality:'maj',intervals:[0,4,7]},{quality:'min',intervals:[0,3,7]},{quality:'dim',intervals:[0,3,6]}
];
const TEMPLATE_ROWS=[
 ['王道進行 4536','4536',['J-POP','アニソン'],['王道','エモい','サビ'],5,'4小節'],
 ['カノン進行 15634145','15634145',['J-POP','バラード'],['王道','切ない','サビ'],5,'8小節'],
 ['小室進行 6451','6451',['J-POP','90s'],['王道','力強い','サビ'],5,'4小節'],
 ['丸ノ内進行 4361','4361',['J-POP','City Pop'],['おしゃれ','都会的','Aメロ'],4,'4小節'],
 ['循環進行 1625','1625',['J-POP','Soul'],['王道','おしゃれ','Aメロ'],4,'4小節'],
 ['ポップ定番 6415','6415',['J-POP','Pop'],['明るい','王道','サビ'],5,'4小節'],
 ['レット・イット・ビー系 1564','1564',['Pop','Rock'],['王道','温かい','サビ'],5,'4小節'],
 ['明るい展開 1456','1456',['J-POP','Rock'],['明るい','爽やか','サビ'],4,'4小節'],
 ['下降感のある8コード 15654325','15654325',['J-POP','バラード'],['切ない','王道','サビ'],4,'8小節'],
 ['ツーファイブワン 251','251',['Jazz','Soul'],['王道','おしゃれ','解決'],5,'3小節'],
 ['リズムチェンジ系 3625','3625',['Jazz','R&B'],['おしゃれ','都会的','Aメロ'],4,'4小節'],
 ['ジャズ循環 6251','6251',['Jazz','R&B'],['おしゃれ','切ない','夜'],5,'4小節'],
 ['ターンアラウンド 1625','1625',['Jazz','Soul'],['循環','王道','終止'],4,'4小節'],
 ['ブルース断片 1411','1411',['Blues','Rock'],['王道','渋い','Aメロ'],4,'4小節'],
 ['ロック直進 1454','1454',['Rock'],['力強い','シンプル','Aメロ'],4,'4小節'],
 ['パワーポップ 1645','1645',['Rock','Pop'],['明るい','爽やか','サビ'],4,'4小節'],
 ['オルタナ系 6145','6145',['Rock','Indie'],['エモい','個性的','サビ'],3,'4小節'],
 ['R&B循環 4362','4362',['R&B','Soul'],['おしゃれ','夜','Aメロ'],3,'4小節'],
 ['ネオソウル系 6413','6413',['R&B','Neo Soul'],['おしゃれ','切ない','夜'],3,'4小節'],
 ['都会的循環 3426','3426',['R&B','City Pop'],['おしゃれ','都会的','Aメロ'],3,'4小節'],
 ['シティポップ系 2645','2645',['City Pop','J-POP'],['おしゃれ','夜','Bメロ'],4,'4小節'],
 ['EDMアンセム 4561','4561',['EDM','Future Bass'],['壮大','エモい','サビ'],4,'4小節'],
 ['Future Bass系 6341','6341',['EDM','Future Bass'],['エモい','おしゃれ','サビ'],3,'4小節'],
 ['House循環 1645','1645',['EDM','House'],['明るい','反復','サビ'],4,'4小節'],
 ['劇伴・余韻 6412','6412',['劇伴','Game'],['壮大','切ない','展開'],3,'4小節'],
 ['劇伴・高揚 4361','4361',['劇伴','Anime'],['エモい','壮大','展開'],3,'4小節'],
 ['不穏循環 6713','6713',['劇伴','Game'],['緊張感','個性的','Bメロ'],2,'4小節'],
 ['幻想循環 3614','3614',['劇伴','Fantasy'],['幻想的','切ない','Aメロ'],3,'4小節'],
 ['ワルツ基本 1451','1451',['Waltz','バラード'],['王道','優雅','3拍子'],4,'4小節'],
 ['ワルツ切なめ 6415','6415',['Waltz','劇伴'],['切ない','優雅','3拍子'],4,'4小節'],
 ['6/8バラード 1564','1564',['6/8','バラード'],['王道','切ない','ゆったり'],5,'4小節'],
 ['6/8アンセム 4536','4536',['6/8','劇伴'],['壮大','エモい','ゆったり'],4,'4小節'],
 ['フォーク基本 1541','1541',['Folk','J-POP'],['温かい','王道','Aメロ'],4,'4小節'],
 ['爽やかポップ 4156','4156',['J-POP','Pop'],['爽やか','明るい','サビ'],4,'4小節'],
 ['泣き進行 6453','6453',['J-POP','バラード'],['切ない','泣ける','サビ'],4,'4小節'],
 ['浮遊系 4316','4316',['Indie','Neo Soul'],['おしゃれ','浮遊感','Aメロ'],3,'4小節'],
 ['ドゥーワップ進行 1645','1645',['Oldies','Pop'],['懐かしい','王道','明るい'],5,'4小節'],
 ['アンダルシア進行 6713','6713',['Flamenco','劇伴'],['緊張感','情熱的','展開'],3,'4小節'],
 ['パッヘルベル完全形 15634145','15634145',['Classical','J-POP'],['王道','循環','壮大'],5,'8小節'],
 ['50s循環 1645','1645',['Oldies','Ballad'],['懐かしい','甘い','王道'],5,'4小節'],
 ['サビ終止 4531','4531',['J-POP','アニソン'],['解決','壮大','サビ'],4,'4小節'],
 ['Aメロ安定 1415','1415',['J-POP','Folk'],['シンプル','安定','Aメロ'],4,'4小節'],
 ['Bメロ上昇 2345','2345',['J-POP','アニソン'],['上昇','期待感','Bメロ'],4,'4小節'],
 ['切ない下降 6543','6543',['J-POP','Ballad'],['切ない','下降','Bメロ'],4,'4小節'],
 ['ドラマチック 4563','4563',['J-POP','劇伴'],['ドラマチック','エモい','サビ'],4,'4小節'],
 ['明暗反転 1436','1436',['J-POP','Indie'],['個性的','明暗','展開'],3,'4小節'],
 ['終わらない循環 4516','4516',['J-POP','Pop'],['循環','爽やか','サビ'],4,'4小節'],
 ['余白のある進行 6142','6142',['Indie','劇伴'],['余韻','静か','Aメロ'],3,'4小節']
];
const TEMPLATES=TEMPLATE_ROWS.map((x,i)=>({id:i,name:x[0],degrees:x[1].split('').map(Number),genres:x[2],moods:x[3],spread:x[4],cycleLabel:x[5]}));

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
 pattern:'bassChord',grid:16,click:false,countIn:false,clickVolume:65,randomNotes:3,freedom:12,complexity:34,density:58,variation:24,rangeMotion:22,octave:24,swing:0,humanize:8,accentWidth:48,
 rangeLow:36,rangeHigh:84,melodic:62,chordChance:40,chordThickness:3,chordWindows:[],accents:[3,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0],audio:null,master:null,audioUnlocked:false,sources:[],timers:[],lastEvents:null,seed:1,isPlaying:false,stopAt:0
};
const $=id=>document.getElementById(id);
const els={};

function init(){
 ['themeSelect','meterSelect','keySelect','genreFilters','moodFilters','keywordInput','progressionList','resultCount','currentName','spreadStars','currentChords','similarList','substituteTarget','substituteList','backingChords','patternCards','gridSelect','styleFilter','accentButtons','backingSummary','engineSummary','guideDialog','rangeFill','rangeLowHandle','rangeHighHandle','rangeLowLabel','rangeHighLabel','rangeReadout','cycleInfo','chordTimingGrid'].forEach(id=>els[id]=$(id));
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
 $('playProgression').addEventListener('click',()=>togglePlay(false));$('globalPlay').addEventListener('click',()=>togglePlay(document.querySelector('[data-tab="backing"]').classList.contains('active')));
 $('exportChordsMidi').addEventListener('click',()=>exportMidi(false));
 $('playBacking').addEventListener('click',()=>togglePlay(true));$('regenerateBacking').addEventListener('click',()=>{state.seed++;state.lastEvents=buildBackingEvents();flashSummary();});$('exportBackingMidi').addEventListener('click',()=>exportMidi(true));
 els.gridSelect.addEventListener('change',()=>{state.grid=+els.gridSelect.value;if(state.grid===24&&state.swing<40)setParam('swing',50);updateSummary();});
 els.styleFilter.addEventListener('change',renderPatternCards);
 setupDragValues();setupKnobs();setupDualRange();
 ['globalPlay','playProgression','playBacking'].forEach(id=>{const b=$(id);if(b)b.addEventListener('pointerdown',unlockAudioNow,{passive:true});});
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
function selectTemplate(t){state.current=t;state.degrees=[...t.degrees];state.chordWindows=state.degrees.map(()=>({start:0,end:16}));state.substituteIndex=0;renderLibrary();renderCurrent();}
function renderCurrent(){els.currentName.textContent=state.current.name;els.spreadStars.textContent=`蔓延率 ${stars(state.current.spread)}`;renderChordStrip(els.currentChords,state.degrees);renderChordStrip(els.backingChords,state.degrees);els.cycleInfo.textContent=`最小周期：${state.current.cycleLabel||state.degrees.length+'小節'} / ${state.degrees.length}コード`;renderChordTiming();renderSimilar();renderSubstitutes();updateSummary();}
function renderChordStrip(root,degrees){root.innerHTML='';degrees.forEach((d,i)=>{const c=degreeChord(d),div=document.createElement('div');div.className='chord-cell';const w=state.chordWindows[i]||{start:0,end:16};div.innerHTML=`${c.name}<small>${ROMANS[d-1]||d} / ${i+1}</small><span class="offset">${formatWindow(w)}</span>`;root.append(div);});}
function formatOffset(step){if(step===0)return '拍頭';const beat=Math.floor(step/4)+1,sub=step%4;return sub===0?`${beat}拍目`:`${beat}拍目 + ${sub}/16`; }
function formatWindow(w){return `${formatOffset(w.start)} → ${w.end===16?'小節末':formatOffset(w.end)}`;}
function renderChordTiming(){
 if(!els.chordTimingGrid)return;
 els.chordTimingGrid.innerHTML='';
 state.degrees.forEach((d,i)=>{
   const row=document.createElement('div');row.className='timing-row';
   const chordName=degreeChord(d).name;
   const lab=document.createElement('div');lab.className='timing-label';lab.innerHTML=`<strong>${chordName}</strong><small>${formatWindow(state.chordWindows[i]||{start:0,end:16})}</small>`;
   const track=document.createElement('div');track.className='timing-window';track.setAttribute('aria-label',`${chordName} の白玉範囲`);
   const ticks=document.createElement('div');ticks.className='timing-ticks';
   for(let st=0;st<17;st++){const tick=document.createElement('i');if(st%4===0)tick.className='beat';ticks.append(tick);}
   const block=document.createElement('div');block.className='timing-block';block.innerHTML=`<button class="edge-handle left" type="button" aria-label="開始位置"></button><span>${chordName}</span><button class="edge-handle right" type="button" aria-label="終了位置"></button>`;
   const left=block.querySelector('.left'),right=block.querySelector('.right');
   const getWindow=()=>state.chordWindows[i]||(state.chordWindows[i]={start:0,end:16});
   const commit=()=>{lab.querySelector('small').textContent=formatWindow(getWindow());renderChordStrip(els.currentChords,state.degrees);renderChordStrip(els.backingChords,state.degrees);state.lastEvents=null;updateSummary();};
   const paint=()=>{const w=getWindow();block.style.left=`${w.start/16*100}%`;block.style.width=`${(w.end-w.start)/16*100}%`;commit();};
   const stepFromEvent=e=>{const r=track.getBoundingClientRect();return clamp(Math.round((e.clientX-r.left)/r.width*16),0,16);};
   let mode=null,origin=0,baseStart=0,baseEnd=16;
   const begin=(m,e)=>{mode=m;origin=stepFromEvent(e);const w=getWindow();baseStart=w.start;baseEnd=w.end;block.setPointerCapture?.(e.pointerId);e.preventDefault();e.stopPropagation();};
   const move=e=>{if(!mode)return;const cur=stepFromEvent(e),w=getWindow();if(mode==='left')w.start=clamp(cur,0,w.end-1);else if(mode==='right')w.end=clamp(cur,w.start+1,16);else{const delta=cur-origin,width=baseEnd-baseStart;w.start=clamp(baseStart+delta,0,16-width);w.end=w.start+width;}paint();};
   const stop=()=>{mode=null;};
   left.addEventListener('pointerdown',e=>begin('left',e));right.addEventListener('pointerdown',e=>begin('right',e));block.querySelector('span').addEventListener('pointerdown',e=>begin('move',e));
   block.addEventListener('pointermove',move);block.addEventListener('pointerup',stop);block.addEventListener('pointercancel',stop);
   track.addEventListener('dblclick',()=>{state.chordWindows[i]={start:0,end:16};paint();});
   track.append(ticks,block);row.append(lab,track);els.chordTimingGrid.append(row);paint();
 });
}
function degreeChord(d){const idx=(d-1)%7,root=(state.key+MAJOR_SCALE[idx])%12,q=DEGREE_TRIADS[idx];return {degree:d,root,quality:q.quality,intervals:q.intervals,name:NOTE_NAMES[root]+(q.quality==='min'?'m':q.quality==='dim'?'dim':'')};}
function renderSimilar(){const scored=TEMPLATES.filter(t=>t.id!==state.current.id).map(t=>({t,score:similarity(state.current,t)})).sort((a,b)=>b.score-a.score).slice(0,5);els.similarList.innerHTML='';scored.forEach(({t,score})=>{const b=document.createElement('button');b.type='button';b.className='compact-item';b.innerHTML=`<span>${t.name}<small class="item-tags"><br>${t.degrees.join('')}</small></span><strong>${Math.round(score)}%</strong>`;b.addEventListener('click',()=>selectTemplate(t));els.similarList.append(b);});}
function similarity(a,b){let same=0,n=Math.max(a.degrees.length,b.degrees.length);for(let i=0;i<n;i++)if(a.degrees[i]===b.degrees[i])same++;const tags=a.genres.concat(a.moods).filter(x=>b.genres.concat(b.moods).includes(x)).length;return same/n*65+Math.min(tags*9,27)+Math.max(0,8-Math.abs(a.spread-b.spread)*2);}
function renderSubstitutes(){els.substituteTarget.innerHTML='';state.degrees.forEach((d,i)=>{const b=document.createElement('button');b.type='button';b.className='target-tab'+(state.substituteIndex===i?' active':'');b.textContent=degreeChord(d).name;b.addEventListener('click',()=>{state.substituteIndex=i;renderSubstitutes();});els.substituteTarget.append(b);});const d=state.degrees[state.substituteIndex],opts=[d,d===1?6:d===6?1:d===4?2:d===5?3:((d+1)%7)+1,d===7?5:7].filter((x,i,a)=>x>=1&&x<=7&&a.indexOf(x)===i);els.substituteList.innerHTML='';opts.forEach(x=>{const b=document.createElement('button');b.type='button';b.className='compact-item';b.innerHTML=`<span>${degreeChord(x).name}<small class="item-tags"><br>${ROMANS[x-1]}</small></span><strong>置換</strong>`;b.addEventListener('click',()=>{state.degrees[state.substituteIndex]=x;renderCurrent();});els.substituteList.append(b);});}
function stars(n){return '★'.repeat(n)+'☆'.repeat(5-n);}
function switchTab(tab){document.querySelectorAll('.mode-tab').forEach(b=>b.classList.toggle('active',b.dataset.tab===tab));$('progressionPanel').classList.toggle('active',tab==='progression');$('backingPanel').classList.toggle('active',tab==='backing');}

function renderPatternCards(){const filter=els.styleFilter?.value||'ALL';els.patternCards.innerHTML='';PATTERNS.filter(p=>filter==='ALL'||p.tags.includes(filter)).forEach(p=>{const b=document.createElement('button');b.type='button';b.className='pattern-card'+(state.pattern===p.id?' active':'');b.innerHTML=`<strong>${p.name}</strong><small>${p.desc}<br>${p.tags.join(' · ')}</small>`;b.addEventListener('click',()=>{state.pattern=p.id;renderPatternCards();updateSummary();});els.patternCards.append(b);});}
function renderAccents(){els.accentButtons.innerHTML='';for(let i=0;i<16;i++){const b=document.createElement('button');b.type='button';b.className='accent-step';b.dataset.level=state.accents[i];b.innerHTML=`${i+1}<small>${['—','W','M','S'][state.accents[i]]}</small>`;b.addEventListener('click',()=>{state.accents[i]=(state.accents[i]+1)%4;renderAccents();});els.accentButtons.append(b);}}
function updateAllControls(){['bpm','clickVolume','randomNotes','freedom','complexity','density','variation','rangeMotion','octave','swing','humanize','melodic','chordChance','chordThickness','accentWidth'].forEach(p=>setParam(p,state[p],false));renderRange();updateSummary();}
function updateSummary(){const p=PATTERNS.find(x=>x.id===state.pattern);els.backingSummary.textContent=`${p?.name||'Theory'} / ${meterLabel()} / ${state.bpm} BPM`;els.engineSummary.textContent=`旋律性 ${state.melodic} · 和音率 ${state.chordChance} · 和音厚 ${state.chordThickness} · Complexity ${state.complexity} · Freedom ${state.freedom} · Random ${state.randomNotes} · Range ${noteLabel(state.rangeLow)}–${noteLabel(state.rangeHigh)}`;$('bpmValue').textContent=state.bpm;$('clickVolumeValue').textContent=state.clickVolume;}
function meterLabel(){return state.meter===6?'6/8':`${state.meter}/4`;}
function flashSummary(){els.engineSummary.animate([{opacity:.2},{opacity:1}],{duration:350});}

function secondsPerBeat(){return 60/Math.max(1,Number(state.bpm)||120);}

function audioContext(){
 if(!state.audio || state.audio.state==='closed'){
   const Ctx=window.AudioContext||window.webkitAudioContext;
   if(!Ctx)throw new Error('Web Audio API is not supported');
   state.audio=new Ctx();
 }
 if(state.audio.state==='suspended')state.audio.resume().catch(()=>{});
 return state.audio;
}
function stopAudio(){
 state.timers.forEach(t=>clearTimeout(t));state.timers=[];
 state.sources.forEach(n=>{try{n.stop();}catch{}});state.sources=[];
 state.isPlaying=false;updatePlayButtons();
}
function updatePlayButtons(){const txt=state.isPlaying?'■ 停止':'▶ 再生';if($('playBacking'))$('playBacking').textContent=txt;if($('globalPlay'))$('globalPlay').innerHTML=`<span>${state.isPlaying?'■':'▶'}</span> ${state.isPlaying?'STOP':'PLAY'}`;}
async function unlockAudioNow(){
 try{
   const ctx=audioContext();
   if(ctx.state==='suspended')await ctx.resume();
   if(ctx.state!=='running')throw new Error('AudioContext state: '+ctx.state);
   state.audioUnlocked=true;
   return ctx;
 }catch(err){console.error('Audio unlock failed',err);return null;}
}
async function togglePlay(backing){
 if(state.isPlaying){stopAudio();return;}
 const ctx=await unlockAudioNow();
 if(!ctx){showAudioError('音声エンジンを開始できませんでした');return;}
 try{await play(backing,ctx);}catch(err){console.error(err);showAudioError('再生処理でエラーが発生しました: '+err.message);stopAudio();}
}
function showAudioError(message){
 const target=$('engineSummary');
 if(target){target.textContent='⚠ '+message+'。端末音量・消音設定・Safariの自動再生設定を確認してください。';target.classList.add('audio-error');}
}
async function play(backing,ctx=audioContext()){
 stopAudio();
 if(ctx.state==='suspended')await ctx.resume();
 if(ctx.state!=='running')throw new Error('AudioContext state: '+ctx.state);
 const events=backing?buildBackingEvents():buildChordEvents();
 if(!events.length)throw new Error('No playback events');
 if(backing)state.lastEvents=events;
 state.isPlaying=true;updatePlayButtons();
 $('engineSummary')?.classList.remove('audio-error');
 const countBeats=state.countIn?(state.meter===6?6:state.meter):0;
 const delay=countBeats*beatSeconds();
 const lead=.08;
 if(state.click||state.countIn)scheduleClick(ctx,countBeats,lead);
 events.forEach(e=>scheduleNotes(ctx,e.time+delay+lead,e.duration,e.notes,e.velocity));
 const end=Math.max(...events.map(e=>e.time+e.duration))+delay+lead+.25;
 state.timers.push(setTimeout(stopAudio,end*1000));
}
function scheduleClick(ctx,countBeats,delay){const beatsPerBar=state.meter===6?6:state.meter,total=countBeats+state.degrees.length*beatsPerBar;for(let i=0;i<total;i++){if(i>=countBeats&&!state.click)continue;const t=delay+i*beatSeconds();playClickTone(i%beatsPerBar===0?1500:950,t,.055,Math.max(.03,state.clickVolume/100*.13),ctx);}}
function scheduleNotes(ctx,time,duration,notes,velocity=90){notes.forEach((n,i)=>playPianoTone(n,time,duration,Math.max(.055,velocity/127*.22)/(1+i*.07),ctx));}
function playPianoTone(midi,start=0,duration=.72,volume=.18,ctx=audioContext()){
 const now=ctx.currentTime+Math.max(0,start),master=ctx.createGain(),filter=ctx.createBiquadFilter();
 filter.type='lowpass';filter.frequency.setValueAtTime(2800,now);filter.Q.value=.65;
 master.gain.setValueAtTime(.0001,now);
 master.gain.exponentialRampToValueAtTime(Math.max(.001,volume),now+.012);
 master.gain.exponentialRampToValueAtTime(Math.max(.0005,volume*.34),now+Math.min(.2,duration*.35));
 master.gain.exponentialRampToValueAtTime(.0001,now+Math.max(.07,duration));
 master.connect(filter);filter.connect(ctx.destination);
 const base=440*Math.pow(2,(midi-69)/12);
 [[1,1,'triangle'],[2,.26,'sine'],[3,.09,'sine']].forEach(([mult,level,type])=>{
   const osc=ctx.createOscillator(),g=ctx.createGain();
   osc.type=type;osc.frequency.setValueAtTime(base*mult,now);g.gain.value=level;
   osc.connect(g);g.connect(master);osc.start(now);osc.stop(now+Math.max(.09,duration)+.04);state.sources.push(osc);
   osc.addEventListener('ended',()=>{const i=state.sources.indexOf(osc);if(i>=0)state.sources.splice(i,1);},{once:true});
 });
}
function playClickTone(freq,start,duration,volume,ctx=audioContext()){
 const now=ctx.currentTime+Math.max(0,start),osc=ctx.createOscillator(),gain=ctx.createGain();
 osc.type='square';osc.frequency.setValueAtTime(freq,now);
 gain.gain.setValueAtTime(Math.max(.001,volume),now);gain.gain.exponentialRampToValueAtTime(.0001,now+duration);
 osc.connect(gain);gain.connect(ctx.destination);osc.start(now);osc.stop(now+duration+.01);state.sources.push(osc);
}

function chordStartBeat(index,beats){const w=state.chordWindows[index]||{start:0,end:16};return index*beats+w.start/4;}
function chordDurationBeats(index,beats){const w=state.chordWindows[index]||{start:0,end:16};return Math.max(.25,(w.end-w.start)/4);}
function beatSeconds(){return secondsPerBeat()*(state.meter===6?.5:1);}
function buildChordEvents(){
 const beats=state.meter===6?6:state.meter,spb=beatSeconds(),events=[];
 state.degrees.forEach((d,i)=>{const c=degreeChord(d),root=fitRange(48+c.root),notes=c.intervals.map(x=>fitRange(root+x));const st=chordStartBeat(i,beats),dur=chordDurationBeats(i,beats);events.push({time:st*spb,duration:dur*spb*.96,notes:[...new Set(notes)],velocity:88});});
 return events;
}
function buildBackingEvents(){
 const beats=state.meter===6?6:state.meter,spb=beatSeconds(),events=[],rand=mulberry32(state.seed++ + Date.now()%100000);
 state.degrees.forEach((d,bar)=>{
   const chord=degreeChord(d),start=chordStartBeat(bar,beats),dur=chordDurationBeats(bar,beats);
   const local=generateBar(chord,dur,rand,bar);
   local.forEach(e=>{
     let beat=e.beat;
     if((state.grid===24||state.swing>0)&&!e.foundation){const frac=beat%1;if(frac>.2&&frac<.8)beat+=state.swing/100*.16;}
     const human=e.foundation?0:(rand()-.5)*(state.humanize/100)*.026;
     const globalBeat=start+beat;
     const accentIndex=Math.floor((((globalBeat%beats)+beats)%beats)/beats*16)%16;
     events.push({time:Math.max(0,globalBeat*spb+human),duration:Math.max(.09,e.len)*spb,notes:[...new Set(e.notes.map(fitRange))],velocity:e.foundation?82:accentVelocity(state.accents[accentIndex],rand)});
   });
 });
 return events.sort((a,b)=>a.time-b.time);
}
function generateBar(chord,beats,rand,bar){
 const out=[];
 const rootPc=chord.root;
 const lowRoot=fitLowRoot(rootPc);
 const tones=makeChordTonePool(chord);
 const complexity=state.complexity/100,density=state.density/100,variation=state.variation/100;
 const melodic=state.melodic/100,chordChance=state.chordChance/100,freedom=state.freedom/100;
 const varied=rand()<variation;
 const recipe=getPatternRecipe(state.pattern,beats,complexity,varied,rand);
 // 左手は必ずコードの頭を示す。白玉／ルート骨格を先に作り、その上へ右手を載せる。
 recipe.left.forEach((step,idx)=>{
   const note=step.role==='fifth'?fitRange(lowRoot+7):step.role==='octave'?fitRange(lowRoot+12):lowRoot;
   out.push({beat:step.beat,len:Math.min(step.len,Math.max(.25,beats-step.beat)),notes:step.octaves?[note,note+12]:[note],foundation:idx===0});
 });
 let last=nearestTone(tones,60);
 recipe.right.forEach((step,idx)=>{
   if(rand()>densityBoost(step,density))return;
   let note=chooseChordTone(tones,last,melodic,state.rangeMotion/100,rand,step.toneIndex);
   // 外音はFreedomのごく一部だけ。強拍は必ずコード構成音へ戻す。
   if(!step.strong&&freedom>0&&rand()<freedom*.12)note=choosePassingTone(note,chord,rand);
   else note=snapToChordTone(note,tones);
   last=snapToChordTone(note,tones);
   let notes=[note];
   if((step.chord&&rand()<Math.max(.18,chordChance))||rand()<chordChance*(.25+complexity*.55)){
     const maxVoices=clamp(Math.round(state.chordThickness),1,4);
     const requested=step.voices||clamp(2+Math.floor(rand()*Math.max(1,maxVoices-1)),2,maxVoices);
     const count=clamp(requested,2,maxVoices);
     notes=chooseVoicing(tones,note,count,state.rangeMotion/100,rand);
   }
   if(rand()<state.octave/100*.22&&notes.length<4){const oct=fitRange(notes[0]+12);if(!notes.includes(oct))notes.push(oct);}
   const gate=(.84+(1-freedom)*.12)*(step.gate||1);
   const len=Math.min(Math.max(.24,step.len*gate),Math.max(.25,beats-step.beat));
   out.push({beat:step.beat,len,notes:notes.map(n=>snapToChordTone(n,tones))});
 });
 // RANDOM NOTESは既存の文法内へ追加する。完全に任意の音は作らない。
 const extras=Math.round(state.randomNotes*(.25+.75*complexity));
 for(let i=0;i<extras;i++){
   if(rand()>.35+density*.55)continue;
   const unit=state.grid===24?1/3:.25;
   const beat=Math.floor(rand()*Math.max(1,beats/unit))*unit;
   const strong=Math.abs(beat-Math.round(beat))<.01;
   let note=chooseChordTone(tones,last,melodic,state.rangeMotion/100,rand);
   if(!strong&&rand()<freedom*.08)note=choosePassingTone(note,chord,rand);
   else note=snapToChordTone(note,tones);
   last=snapToChordTone(note,tones);
   const notes=rand()<chordChance*.45&&state.chordThickness>1?chooseVoicing(tones,last,Math.min(state.chordThickness,2+Math.floor(rand()*state.chordThickness)),state.rangeMotion/100,rand):[last];
   out.push({beat:clamp(beat,0,beats-.05),len:unit*(1.8+complexity*2.2),notes});
 }
 return out.sort((a,b)=>a.beat-b.beat||Number(b.foundation)-Number(a.foundation));
}
function getPatternRecipe(id,beats,complexity,varied,rand){
 const is68=state.meter===6, unit=is68?.5:.5;
 const q=(beat,len,toneIndex=0,strong=false,chord=false,voices=0,gate=1)=>({beat,len,toneIndex,strong,chord,voices,gate});
 const l=(beat,len,role='root',octaves=false)=>({beat,len,role,octaves});
 let left=[l(0,beats*.96,'root')],right=[];
 if(id==='block'){
   right=[q(0,Math.min(2,beats),0,true,true,3),q(Math.min(2,beats-1),Math.max(1,beats-2),1,true,true,3)];
 }else if(id==='pulse8'){
   for(let b=0;b<beats;b+=unit)right.push(q(b,unit*.92,Math.round(b/unit)%3,b%1===0,true,2));
 }else if(id==='arpUp'){
   const seq=[0,2,1,2,0,2,1,2];for(let b=0,i=0;b<beats;b+=unit,i++)right.push(q(b,unit*.96,seq[i%seq.length],b===0,false));
 }else if(id==='arpWave'){
   const seq=[0,1,2,1,0,1,2,1];for(let b=0,i=0;b<beats;b+=unit,i++)right.push(q(b,unit*.96,seq[i%seq.length],b===0,false));
 }else if(id==='sync'){
   left=[l(0,beats*.96,'root')];for(let b=.5;b<beats;b+=1)right.push(q(b,.92,Math.floor(b)%3,false,true,2));
 }else if(id==='rock'){
   left=[];for(let b=0;b<beats;b+=.5)left.push(l(b,.46,b%1===0?'root':'octave',true));for(let b=0;b<beats;b+=1)right.push(q(b,.8,0,true,true,2));
 }else if(id==='waltz'||state.meter===3){
   left=[l(0,beats*.96,'root')];right=[q(1,.85,0,false,true,3),q(2,.85,1,false,true,3)];
 }else if(id==='sixEight'||is68){
   left=[l(0,2.9,'root'),l(3,2.8,'fifth')];const seq=[0,1,2,1,2,1];for(let b=0;b<6;b+=.5)right.push(q(b,.46,seq[Math.floor(b*2)%seq.length],b===0||b===3,false));
 }else if(id==='swing'){
   const pos=[0,2/3,1,1+2/3,2,2+2/3,3,3+2/3].filter(x=>x<beats);pos.forEach((b,i)=>right.push(q(b,.58,i%3,b%1===0,i%3===0,2)));
 }else if(id==='broken'){
   const seq=[0,2,1,2];for(let b=0,i=0;b<beats;b+=.5,i++)right.push(q(b,.47,seq[i%4],b===0,false));
 }else if(id==='anthem'){
   left=[l(0,beats*.96,'root',true)];right=[q(0,1.75,0,true,true,3),q(2,1.75,2,true,true,3)];
 }else{ // Bass + Chord: 聞きやすいデフォルト
   left=[l(0,beats*.96,'root')];
   if(beats>=4){right=[q(0,1.8,0,true,true,3),q(2,1.75,1,true,true,3)];if(complexity>.55)right.splice(1,0,q(1,.78,2,false,false));}
   else right=[q(0,1.35,0,true,true,3),q(1.5,1.2,1,false,true,3)];
 }
 if(varied&&right.length>2){const movable=right.filter(x=>!x.strong);movable.forEach(x=>{if(rand()<.35*state.variation/100)x.toneIndex=(x.toneIndex+1+Math.floor(rand()*2))%3;});}
 return {left,right};
}
function densityBoost(step,density){return clamp(.28+density*.72+(step.strong?.18:0),0,1);}
function fitLowRoot(pc){let n=36+pc;while(n<state.rangeLow)n+=12;while(n>Math.min(state.rangeHigh,55))n-=12;return clamp(n,state.rangeLow,state.rangeHigh);}
function makeChordTonePool(chord){
 const pool=[];
 for(let oct=2;oct<=7;oct++){const base=12*(oct+1)+chord.root;chord.intervals.forEach(iv=>{const n=base+iv;if(n>=state.rangeLow&&n<=state.rangeHigh)pool.push(n);});}
 return [...new Set(pool)].sort((a,b)=>a-b);
}
function nearestTone(pool,target){return pool.reduce((a,b)=>Math.abs(b-target)<Math.abs(a-target)?b:a,pool[0]||target);}
function snapToChordTone(note,pool){return nearestTone(pool,fitRange(note));}
function chooseChordTone(pool,last,melodic,motion,rand,forcedIndex){
 if(forcedIndex!==undefined){const around=pool.filter(n=>n>=48&&n<=76);const src=around.length?around:pool;return src[clamp(forcedIndex,0,src.length-1)%src.length];}
 const center=last+(rand()-.5)*motion*24;
 const ranked=[...pool].sort((a,b)=>Math.abs(a-center)-Math.abs(b-center));
 const keep=Math.max(1,Math.round(1+(1-melodic)*5+motion*3));return ranked[Math.floor(rand()*Math.min(keep,ranked.length))];
}
function choosePassingTone(note,chord,rand){
 const dir=rand()<.5?-1:1,candidate=fitRange(note+dir*(rand()<.75?2:1));
 const scalePcs=MAJOR_SCALE.map(x=>(state.key+x)%12);return scalePcs.includes((candidate+120)%12)?candidate:note;
}
function chooseVoicing(pool,anchor,count,motion,rand){
 const around=[...pool].sort((a,b)=>Math.abs(a-anchor)-Math.abs(b-anchor));
 const result=[snapToChordTone(anchor,pool)];
 for(const n of around){if(result.length>=count)break;if(!result.includes(n)&&Math.abs(n-result[0])<=12+motion*12)result.push(n);}
 while(result.length<count){const n=pool[Math.floor(rand()*pool.length)];if(!result.includes(n))result.push(n);else break;}
 return result.sort((a,b)=>a-b).slice(0,count);
}
function accentVelocity(level,rand){const width=state.accentWidth/100;const center=84,spread=10+width*34;const offsets=[-spread*.55,-spread*.2,spread*.25,spread];return clamp(center+offsets[level]+(rand()-.5)*state.humanize*.22,1,127);}
function fitRange(note){while(note<state.rangeLow)note+=12;while(note>state.rangeHigh)note-=12;return clamp(Math.round(note),state.rangeLow,state.rangeHigh);}
function noteLabel(n){return NOTE_NAMES[((n%12)+12)%12]+(Math.floor(n/12)-1);}
function mulberry32(a){return function(){let t=a+=0x6D2B79F5;t=Math.imul(t^t>>>15,t|1);t^=t+Math.imul(t^t>>>7,t|61);return ((t^t>>>14)>>>0)/4294967296;};}

function exportMidi(backing){const events=backing?(state.lastEvents||buildBackingEvents()):buildChordEvents();const data=makeMidi(events,backing?'COORDINATE_BACKING':'COORDINATE_PROGRESSION');downloadBlob(new Blob([data],{type:'audio/midi'}),`${backing?'COORDINATE_BACKING':'COORDINATE_PROGRESSION'}_${state.bpm}BPM.mid`);}
function makeMidi(events,name){const tpq=480,tempo=Math.round(60000000/state.bpm),bytes=[],push=(...x)=>bytes.push(...x),str=s=>[...s].map(c=>c.charCodeAt(0));push(...str('MThd'),0,0,0,6,0,1,0,1,(tpq>>8)&255,tpq&255);let tr=[],tpush=(...x)=>tr.push(...x);tpush(0,0xff,0x03,name.length,...str(name));tpush(0,0xff,0x51,3,(tempo>>16)&255,(tempo>>8)&255,tempo&255);const denom=state.meter===6?8:4,nn=state.meter===6?6:state.meter;tpush(0,0xff,0x58,4,nn,Math.log2(denom),24,8);const flat=[];events.forEach(e=>{const start=Math.max(0,Math.round(e.time/beatSeconds()*tpq)),end=start+Math.max(90,Math.round(e.duration/beatSeconds()*tpq));e.notes.forEach(n=>{flat.push({tick:start,on:true,n,vel:Math.round(e.velocity)});flat.push({tick:end,on:false,n,vel:0});});});flat.sort((a,b)=>a.tick-b.tick||Number(a.on)-Number(b.on));let last=0;flat.forEach(e=>{tpush(...vlq(e.tick-last),e.on?0x90:0x80,e.n,e.vel);last=e.tick;});tpush(0,0xff,0x2f,0);push(...str('MTrk'),(tr.length>>>24)&255,(tr.length>>>16)&255,(tr.length>>>8)&255,tr.length&255,...tr);return new Uint8Array(bytes);}
function vlq(v){let b=[v&127];while(v>>=7)b.unshift((v&127)|128);return b;}
function downloadBlob(blob,name){const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=name;document.body.append(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove();},1000);}
function clamp(v,min,max){return Math.max(min,Math.min(max,v));}

document.addEventListener('DOMContentLoaded',init);
