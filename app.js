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
const USE_ALIASES={サビ:'サビ向き',Aメロ:'Aメロ向き',Bメロ:'Bメロ向き',展開:'劇伴向き',終止:'終止向き'};
const TEMPLATES=TEMPLATE_ROWS.map((x,i)=>({id:i,name:x[0],degrees:x[1].split('').map(Number),genres:x[2],moods:[...x[3],...x[3].map(v=>USE_ALIASES[v]).filter(Boolean)],uses:x[3].map(v=>USE_ALIASES[v]).filter(Boolean),spread:x[4],cycleLabel:x[5],minimumBars:x[1].length}));

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
 theme:'ocean',key:0,bpm:120,meter:4,genre:'ALL',moods:new Set(),keyword:'',current:TEMPLATES[0],degrees:[4,5,3,6],substituteIndex:0,
 pattern:'bassChord',leftPattern:'rootWhole',rightPattern:'auto',grid:'16',activeGrid:'16',click:false,countIn:false,clickVolume:65,clickSwing:false,randomNotes:3,freedom:12,complexity:34,density:58,variation:24,rangeMotion:22,octave:24,swing:0,humanize:8,noteLength:65,accentWidth:48,
 rangeLow:36,rangeHigh:84,melodic:62,chordChance:40,chordThickness:3,boundaries:[],chordTriggers:[1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],audio:null,master:null,audioUnlocked:false,sources:[],timers:[],lastEvents:null,seed:1,isPlaying:false,stopAt:0,playheadFrame:0,visualFrame:0,rollView:{zoomX:1,zoomY:1,panX:0,panY:0}
};
const $=id=>document.getElementById(id);
const els={};

function init(){
 ['themeSelect','meterSelect','keySelect','genreFilters','moodFilters','keywordInput','progressionList','resultCount','currentName','spreadStars','currentChords','similarList','substituteTarget','substituteList','previousList','nextList','backingChords','patternCards','gridSelect','activeGridLabel','styleFilter','leftPatternSelect','rightPatternSelect','accentButtons','backingSummary','engineSummary','guideDialog','rangeFill','rangeLowHandle','rangeHighHandle','rangeLowLabel','rangeHighLabel','rangeReadout','cycleInfo','chordTimingGrid','pianoRollViewport','pianoRollCanvas','playhead'].forEach(id=>els[id]=$(id));
 NOTE_NAMES.forEach((n,i)=>els.keySelect.add(new Option(n,n,i===0,i===0)));
 renderFilters();renderPatternCards();renderAccents();bind();selectTemplate(TEMPLATES[0]);updateAllControls();
 const saved=localStorage.getItem('coordinate-theme');if(saved&&['ocean','minimal','junk','pop'].includes(saved)){state.theme=saved;els.themeSelect.value=saved;document.body.dataset.theme=saved;}
}
function bind(){
 document.querySelectorAll('.mode-tab').forEach(b=>b.addEventListener('click',()=>switchTab(b.dataset.tab)));
 els.themeSelect.addEventListener('change',()=>{state.theme=els.themeSelect.value;document.body.dataset.theme=state.theme;localStorage.setItem('coordinate-theme',state.theme);});
 els.keySelect.addEventListener('change',()=>{invalidatePerformance();state.key=NOTE_NAMES.indexOf(els.keySelect.value);renderCurrent();queuePianoRoll();});
 els.meterSelect.addEventListener('change',()=>{invalidatePerformance();state.meter=+els.meterSelect.value;renderAccents();updateSummary();queuePianoRoll();});
 els.keywordInput.addEventListener('input',()=>{state.keyword=els.keywordInput.value.trim().toLowerCase();renderLibrary();});
 $('clickToggle').addEventListener('change',e=>state.click=e.target.checked);
 $('countInToggle').addEventListener('change',e=>state.countIn=e.target.checked);
 $('guideButton').addEventListener('click',()=>els.guideDialog.showModal());
 $('playProgression').addEventListener('click',()=>togglePlay(false));$('globalPlay').addEventListener('click',()=>togglePlay(document.querySelector('[data-tab="backing"]').classList.contains('active')));
 $('exportChordsMidi').addEventListener('click',()=>exportMidi(false));
 $('playBacking').addEventListener('click',()=>togglePlay(true));$('regenerateBacking').addEventListener('click',()=>{stopAudio();state.seed++;state.lastEvents=buildBackingEvents();renderPianoRoll();flashSummary();});$('exportBackingMidi').addEventListener('click',()=>exportMidi(true));
 els.gridSelect.addEventListener('change',()=>{state.grid=els.gridSelect.value;invalidatePerformance();resolveActiveGrid();updateSummary();queuePianoRoll();});
 els.styleFilter.addEventListener('change',renderPatternCards);
 els.leftPatternSelect.addEventListener('change',()=>{state.leftPattern=els.leftPatternSelect.value;invalidatePerformance();queuePianoRoll();});
 els.rightPatternSelect.addEventListener('change',()=>{state.rightPattern=els.rightPatternSelect.value;invalidatePerformance();queuePianoRoll();});
 setupDragValues();setupKnobs();setupDualRange();
 setupPianoRollGestures();addEventListener('resize',queuePianoRoll);queuePianoRoll();
 ['globalPlay','playProgression','playBacking'].forEach(id=>{const b=$(id);if(b)b.addEventListener('pointerdown',unlockAudioNow,{passive:true});});
}
function setupDragValues(){document.querySelectorAll('.value-drag').forEach(el=>makeDragControl(el,el.dataset.param));}
function attachDoubleTap(el,fn){let last=0;el.addEventListener('pointerup',e=>{if(e.pointerType!=='touch')return;const now=Date.now();if(now-last<340){e.preventDefault();fn();last=0;}else last=now;});}
function makeDragControl(el,param){
 let startX=0,startY=0,start=0,moved=false;
 const ranges={bpm:[40,240,1],clickVolume:[0,100,1]};
 const [min,max,step]=ranges[param];
 const begin=e=>{const p=point(e);startX=p.x;startY=p.y;start=state[param];moved=false;el.setPointerCapture?.(e.pointerId);e.preventDefault();};
 const move=e=>{if(e.buttons===0&&e.pointerType!=='touch')return;const p=point(e),delta=((p.x-startX)-(p.y-startY))*.38;if(Math.abs(delta)>2)moved=true;setParam(param,clamp(Math.round((start+delta*step)/step)*step,min,max));};
 el.addEventListener('pointerdown',begin);el.addEventListener('pointermove',move);
 el.addEventListener('dblclick',()=>promptValue(param,min,max));attachDoubleTap(el,()=>promptValue(param,min,max));
 el.addEventListener('keydown',e=>{if(e.key==='ArrowUp'||e.key==='ArrowRight'){setParam(param,clamp(state[param]+step,min,max));e.preventDefault();}if(e.key==='ArrowDown'||e.key==='ArrowLeft'){setParam(param,clamp(state[param]-step,min,max));e.preventDefault();}if(e.key==='Enter')promptValue(param,min,max);});
}
function setupKnobs(){document.querySelectorAll('.knob-unit[data-param]').forEach(unit=>{
 const param=unit.dataset.param,min=+unit.dataset.min,max=+unit.dataset.max;setParam(param,+unit.dataset.value,false);
 let sx=0,sy=0,sv=0;
 unit.addEventListener('pointerdown',e=>{const p=point(e);sx=p.x;sy=p.y;sv=state[param];unit.setPointerCapture?.(e.pointerId);e.preventDefault();});
 unit.addEventListener('pointermove',e=>{if(e.buttons===0&&e.pointerType!=='touch')return;const p=point(e);const sensitivity=(max-min)/620;setParam(param,clamp(Math.round(sv+((p.x-sx)-(p.y-sy))*sensitivity),min,max));});
 unit.addEventListener('dblclick',()=>promptValue(param,min,max));attachDoubleTap(unit,()=>promptValue(param,min,max));
 });}
function promptValue(param,min,max){const value=prompt(`${param.toUpperCase()} (${min}–${max})`,String(state[param]));if(value!==null&&!Number.isNaN(+value))setParam(param,clamp(+value,min,max));}
function point(e){return {x:e.clientX??e.touches?.[0]?.clientX??0,y:e.clientY??e.touches?.[0]?.clientY??0};}
function setParam(param,value,refresh=true){state[param]=value;if(!['clickVolume'].includes(param))invalidatePerformance();const valueEl=$(`${param}Value`);if(valueEl)valueEl.textContent=Math.round(value);const unit=document.querySelector(`.knob-unit[data-param="${param}"]`);if(unit){const min=+unit.dataset.min,max=+unit.dataset.max,ratio=(value-min)/(max-min);unit.querySelector('.knob').style.setProperty('--angle',`${-135+ratio*270}deg`);}const drag=document.querySelector(`.value-drag[data-param="${param}"]`);if(drag)drag.setAttribute('aria-valuenow',String(value));if(refresh){updateSummary();queuePianoRoll();}}

function setupDualRange(){
 const track=els.rangeLowHandle.parentElement;let active=null;
 const begin=(which,e)=>{active=which;track.setPointerCapture?.(e.pointerId);move(e);e.preventDefault();};
 const move=e=>{if(!active)return;invalidatePerformance();const r=track.getBoundingClientRect();const ratio=clamp((r.bottom-e.clientY)/r.height,0,1);let midi=Math.round(24+ratio*72);if(active==='low')state.rangeLow=Math.min(midi,state.rangeHigh-5);else state.rangeHigh=Math.max(midi,state.rangeLow+5);renderRange();updateSummary();queuePianoRoll();};
 els.rangeLowHandle.addEventListener('pointerdown',e=>begin('low',e));els.rangeHighHandle.addEventListener('pointerdown',e=>begin('high',e));
 track.addEventListener('pointermove',move);track.addEventListener('pointerup',()=>active=null);track.addEventListener('pointercancel',()=>active=null);
 [els.rangeLowHandle,els.rangeHighHandle].forEach((h,i)=>{const edit=()=>{const key=i?'rangeHigh':'rangeLow';const v=prompt(`${i?'最高':'最低'}MIDIノート (24–96)`,state[key]);if(v!==null&&!isNaN(+v)){invalidatePerformance();state[key]=clamp(+v,24,96);if(state.rangeLow>state.rangeHigh-5){if(i)state.rangeLow=state.rangeHigh-5;else state.rangeHigh=state.rangeLow+5;}renderRange();queuePianoRoll();}};h.addEventListener('dblclick',edit);attachDoubleTap(h,edit);});
 renderRange();
}
function renderRange(){const toPct=n=>(n-24)/72*100;const low=toPct(state.rangeLow),high=toPct(state.rangeHigh);els.rangeLowHandle.style.bottom=`${low}%`;els.rangeHighHandle.style.bottom=`${high}%`;els.rangeFill.style.bottom=`${low}%`;els.rangeFill.style.height=`${high-low}%`;els.rangeLowLabel.textContent=noteLabel(state.rangeLow);els.rangeHighLabel.textContent=noteLabel(state.rangeHigh);els.rangeReadout.textContent=`${noteLabel(state.rangeLow)} — ${noteLabel(state.rangeHigh)}`;}

function unique(field){return [...new Set(TEMPLATES.flatMap(t=>t[field]))].sort((a,b)=>a.localeCompare(b,'ja'));}
function renderFilters(){makeFilterButtons(els.genreFilters,['ALL',...unique('genres')],'genre');makeFilterButtons(els.moodFilters,['ALL',...unique('moods')],'moods');}
function makeFilterButtons(root,items,key){root.innerHTML='';items.forEach(v=>{const active=key==='moods'?(v==='ALL'?state.moods.size===0:state.moods.has(v)):state[key]===v;const b=document.createElement('button');b.type='button';b.className='chip'+(active?' active':'');b.textContent=v;b.addEventListener('click',()=>{if(key==='moods'){if(v==='ALL')state.moods.clear();else state.moods.has(v)?state.moods.delete(v):state.moods.add(v);}else state[key]=v;makeFilterButtons(root,items,key);renderLibrary();});root.append(b);});}
function renderLibrary(){const k=state.keyword;const list=TEMPLATES.filter(t=>(state.genre==='ALL'||t.genres.includes(state.genre))&&([...state.moods].every(m=>t.moods.includes(m)))&&(!k||[t.name,t.degrees.join(''),...t.genres,...t.moods].join(' ').toLowerCase().includes(k)));els.resultCount.textContent=list.length;els.progressionList.innerHTML='';if(!list.length){els.progressionList.innerHTML='<div class="empty">該当なし</div>';return;}list.forEach(t=>{const row=document.createElement('div');row.className='progression-item'+(state.current.id===t.id?' active':'');row.innerHTML=`<button class="progression-select" type="button"><div class="item-top"><span class="item-name">${t.name}</span><span class="item-degrees">${t.degrees.join('')}</span></div><div class="item-tags">${t.genres.concat(t.moods).slice(0,6).join(' · ')}</div><div class="stars">蔓延率 ${stars(t.spread)}</div><div class="actual-chords">${t.degrees.map(d=>degreeChord(d).name).join(' ｜ ')}</div></button><button class="mini-preview" type="button" aria-label="${t.name}を試聴">▶</button>`;row.querySelector('.progression-select').addEventListener('click',()=>selectTemplate(t));row.querySelector('.mini-preview').addEventListener('click',()=>previewTemplate(t));els.progressionList.append(row);});}
function selectTemplate(t){state.current=t;state.degrees=[...t.degrees];state.boundaries=Array.from({length:state.degrees.length+1},(_,i)=>i*16);state.substituteIndex=0;invalidatePerformance();renderLibrary();renderCurrent();}
function renderCurrent(){els.currentName.textContent=state.current.name;els.spreadStars.textContent=`蔓延率 ${stars(state.current.spread)}`;renderChordStrip(els.currentChords,state.degrees);renderChordStrip(els.backingChords,state.degrees);els.cycleInfo.textContent=`最小周期：${state.current.cycleLabel||state.degrees.length+'小節'} / ${state.degrees.length}コード / 全${totalSteps()}ステップ`;renderChordTiming();renderSimilar();renderSubstitutes();renderConnections();updateSummary();}
function renderChordStrip(root,degrees){root.innerHTML='';degrees.forEach((d,i)=>{const c=degreeChord(d),div=document.createElement('div');div.className='chord-cell';const w=chordWindow(i);div.style.flexGrow=String(w.end-w.start);div.innerHTML=`${c.name}<small>${ROMANS[d-1]||d} / ${i+1}</small><span class="offset">${w.end-w.start}/16 × ${((w.end-w.start)/16).toFixed(2)}小節</span>`;root.append(div);});}
function totalSteps(){return state.degrees.length*16;}
function chordWindow(i){return {start:state.boundaries[i]??i*16,end:state.boundaries[i+1]??(i+1)*16};}
function invalidatePerformance(){if(state.isPlaying)stopAudio();state.lastEvents=null;}
function renderChordTiming(){
 if(!els.chordTimingGrid)return;const total=totalSteps();els.chordTimingGrid.innerHTML='';
 const rail=document.createElement('div');rail.className='boundary-rail';
 state.degrees.forEach((d,i)=>{const w=chordWindow(i),seg=document.createElement('div');seg.className='boundary-segment';seg.style.left=`${w.start/total*100}%`;seg.style.width=`${(w.end-w.start)/total*100}%`;seg.innerHTML=`<strong>${degreeChord(d).name}</strong><small>${w.end-w.start}/16</small>`;rail.append(seg);});
 for(let i=1;i<state.boundaries.length-1;i++){const h=document.createElement('button');h.type='button';h.className='shared-boundary';h.style.left=`${state.boundaries[i]/total*100}%`;h.setAttribute('aria-label',`${i}番目のコード境界`);let dragging=false;
   h.addEventListener('pointerdown',e=>{dragging=true;h.setPointerCapture?.(e.pointerId);e.preventDefault();});
   h.addEventListener('pointermove',e=>{if(!dragging)return;const r=rail.getBoundingClientRect();const step=clamp(Math.round((e.clientX-r.left)/r.width*total),state.boundaries[i-1]+1,state.boundaries[i+1]-1);if(step===state.boundaries[i])return;state.boundaries[i]=step;invalidatePerformance();renderChordStrip(els.currentChords,state.degrees);renderChordStrip(els.backingChords,state.degrees);renderChordTiming();queuePianoRoll();});
   h.addEventListener('pointerup',()=>dragging=false);h.addEventListener('pointercancel',()=>dragging=false);rail.append(h);
 }
 const scale=document.createElement('div');scale.className='boundary-scale';for(let s=0;s<=total;s+=4){const tick=document.createElement('i');tick.style.left=`${s/total*100}%`;tick.dataset.label=s%16===0?String(s/16+1):'';scale.append(tick);}rail.append(scale);els.chordTimingGrid.append(rail);
}
function degreeChord(d){const idx=(d-1)%7,root=(state.key+MAJOR_SCALE[idx])%12,q=DEGREE_TRIADS[idx];return {degree:d,root,quality:q.quality,intervals:q.intervals,name:NOTE_NAMES[root]+(q.quality==='min'?'m':q.quality==='dim'?'dim':'')};}
function renderSimilar(){const scored=TEMPLATES.filter(t=>t.id!==state.current.id).map(t=>({t,score:similarity(state.current,t)})).sort((a,b)=>b.score-a.score).slice(0,5);els.similarList.innerHTML='';scored.forEach(({t,score})=>{const b=document.createElement('button');b.type='button';b.className='compact-item';b.innerHTML=`<span>${t.name}<small class="item-tags"><br>${t.degrees.join('')}</small></span><strong>${Math.round(score)}%</strong>`;b.addEventListener('click',()=>selectTemplate(t));els.similarList.append(b);});}
function similarity(a,b){let same=0,n=Math.max(a.degrees.length,b.degrees.length);for(let i=0;i<n;i++)if(a.degrees[i]===b.degrees[i])same++;const tags=a.genres.concat(a.moods).filter(x=>b.genres.concat(b.moods).includes(x)).length;return same/n*65+Math.min(tags*9,27)+Math.max(0,8-Math.abs(a.spread-b.spread)*2);}
async function previewTemplate(t){const previous={current:state.current,degrees:[...state.degrees],boundaries:[...state.boundaries]};state.current=t;state.degrees=[...t.degrees];state.boundaries=Array.from({length:t.degrees.length+1},(_,i)=>i*16);try{await togglePlay(false);}finally{state.current=previous.current;state.degrees=previous.degrees;state.boundaries=previous.boundaries;}}
function connectionScore(a,b){const last=a.degrees.at(-1),first=b.degrees[0];let score=20;score+=last===5&&first===1?45:0;score+=last===2&&first===5?28:0;score+=last===4&&[1,5].includes(first)?22:0;score+=last===first?12:0;score+=a.genres.filter(g=>b.genres.includes(g)).length*7;score+=a.moods.filter(m=>b.moods.includes(m)).length*3;return Math.min(99,score);}
function renderConnections(){renderConnectionList(els.previousList,TEMPLATES.filter(t=>t.id!==state.current.id).map(t=>({t,score:connectionScore(t,state.current)})).sort((a,b)=>b.score-a.score).slice(0,4),'before');renderConnectionList(els.nextList,TEMPLATES.filter(t=>t.id!==state.current.id).map(t=>({t,score:connectionScore(state.current,t)})).sort((a,b)=>b.score-a.score).slice(0,4),'after');}
function renderConnectionList(root,items,where){root.innerHTML='';items.forEach(({t,score})=>{const row=document.createElement('div');row.className='connection-row';row.innerHTML=`<button type="button" class="connection-preview">▶ ${t.name}<small>${t.degrees.join('')} · 接続 ${score}%</small></button><button type="button" class="connection-add">連結</button>`;row.querySelector('.connection-preview').addEventListener('click',()=>previewTemplate(t));row.querySelector('.connection-add').addEventListener('click',()=>appendTemplate(t,where));root.append(row);});}
function appendTemplate(t,where){state.degrees=where==='before'?[...t.degrees,...state.degrees]:[...state.degrees,...t.degrees];state.current={...state.current,name:`${state.current.name} + ${t.name}`,degrees:[...state.degrees],cycleLabel:`${state.degrees.length}小節`,minimumBars:state.degrees.length};state.boundaries=Array.from({length:state.degrees.length+1},(_,i)=>i*16);invalidatePerformance();renderCurrent();}
function renderSubstitutes(){els.substituteTarget.innerHTML='';state.degrees.forEach((d,i)=>{const b=document.createElement('button');b.type='button';b.className='target-tab'+(state.substituteIndex===i?' active':'');b.textContent=degreeChord(d).name;b.addEventListener('click',()=>{state.substituteIndex=i;renderSubstitutes();});els.substituteTarget.append(b);});const d=state.degrees[state.substituteIndex],opts=[d,d===1?6:d===6?1:d===4?2:d===5?3:((d+1)%7)+1,d===7?5:7].filter((x,i,a)=>x>=1&&x<=7&&a.indexOf(x)===i);els.substituteList.innerHTML='';opts.forEach(x=>{const b=document.createElement('button');b.type='button';b.className='compact-item';b.innerHTML=`<span>${degreeChord(x).name}<small class="item-tags"><br>${ROMANS[x-1]}</small></span><strong>置換</strong>`;b.addEventListener('click',()=>{invalidatePerformance();state.degrees[state.substituteIndex]=x;renderCurrent();queuePianoRoll();});els.substituteList.append(b);});}
function stars(n){return '★'.repeat(n)+'☆'.repeat(5-n);}
function switchTab(tab){document.querySelectorAll('.mode-tab').forEach(b=>b.classList.toggle('active',b.dataset.tab===tab));$('progressionPanel').classList.toggle('active',tab==='progression');$('backingPanel').classList.toggle('active',tab==='backing');}

function renderPatternCards(){const filter=els.styleFilter?.value||'ALL';els.patternCards.innerHTML='';PATTERNS.filter(p=>filter==='ALL'||p.tags.includes(filter)).forEach(p=>{const b=document.createElement('button');b.type='button';b.className='pattern-card'+(state.pattern===p.id?' active':'');b.innerHTML=`<strong>${p.name}</strong><small>${p.desc}<br>${p.tags.join(' · ')}</small>`;b.addEventListener('click',()=>{state.pattern=p.id;invalidatePerformance();renderPatternCards();updateSummary();queuePianoRoll();});els.patternCards.append(b);});}
function renderAccents(){els.accentButtons.innerHTML='';for(let i=0;i<16;i++){const b=document.createElement('button');b.type='button';b.className='accent-step chord-trigger';b.dataset.level=state.chordTriggers[i]?3:0;b.setAttribute('aria-pressed',String(Boolean(state.chordTriggers[i])));b.innerHTML=`${i+1}<small>${state.chordTriggers[i]?'3和音':'—'}</small>`;b.addEventListener('click',()=>{invalidatePerformance();state.chordTriggers[i]=state.chordTriggers[i]?0:1;renderAccents();queuePianoRoll();});els.accentButtons.append(b);}}
function updateAllControls(){['bpm','clickVolume','randomNotes','freedom','complexity','density','variation','rangeMotion','octave','swing','humanize','noteLength','melodic','chordChance','chordThickness'].forEach(p=>setParam(p,state[p],false));renderRange();updateSummary();}
function updateSummary(){const p=PATTERNS.find(x=>x.id===state.pattern);els.backingSummary.textContent=`${p?.name||'Theory'} / ${meterLabel()} / ${state.bpm} BPM`;els.engineSummary.textContent=`音長 ${state.noteLength} · 旋律性 ${state.melodic} · 和音率 ${state.chordChance} · 和音厚 ${state.chordThickness} · Complexity ${state.complexity} · Freedom ${state.freedom} · Range ${noteLabel(state.rangeLow)}–${noteLabel(state.rangeHigh)}`;$('bpmValue').textContent=state.bpm;$('clickVolumeValue').textContent=state.clickVolume;}
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
 cancelAnimationFrame(state.playheadFrame);state.playheadFrame=0;if(els.playhead)els.playhead.style.left='0%';
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
 startPlayhead(ctx.currentTime+lead+delay,Math.max(...events.map(e=>e.time+e.duration)));
 state.timers.push(setTimeout(stopAudio,end*1000));
}
function startPlayhead(audioStart,duration){const ctx=state.audio,tick=()=>{if(!state.isPlaying||!ctx)return;const ratio=clamp((ctx.currentTime-audioStart)/duration,0,1);if(els.playhead){const w=els.pianoRollViewport?.clientWidth||100;els.playhead.style.left=`${36+(w-36)*ratio*state.rollView.zoomX+state.rollView.panX}px`;}if(ratio<1)state.playheadFrame=requestAnimationFrame(tick);};state.playheadFrame=requestAnimationFrame(tick);}
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

function chordStartBeat(index,beats){return chordWindow(index).start/16*beats;}
function chordDurationBeats(index,beats){const w=chordWindow(index);return Math.max(.25,(w.end-w.start)/16*beats);}
function beatSeconds(){return secondsPerBeat()*(state.meter===6?.5:1);}
function resolveActiveGrid(){state.activeGrid=state.grid==='mix'?['4','8','16'][Math.abs(state.seed)%3]:state.grid;if(els.activeGridLabel)els.activeGridLabel.textContent=`現在：${state.activeGrid}分`;return state.activeGrid;}
function rhythmUnit(){const g=resolveActiveGrid();return state.meter===6?(g==='4'?2:g==='8'?1:.5):(g==='4'?1:g==='8'?.5:.25);}
function snapRhythm(beat){const unit=rhythmUnit();return Math.round(beat/unit)*unit;}
function buildChordEvents(){
 const beats=state.meter===6?6:state.meter,spb=beatSeconds(),events=[];
 state.degrees.forEach((d,i)=>{const c=degreeChord(d),root=fitRange(48+c.root),notes=c.intervals.map(x=>fitRange(root+x));const st=chordStartBeat(i,beats),dur=chordDurationBeats(i,beats);events.push({time:st*spb,duration:dur*spb*.96,notes:[...new Set(notes)],velocity:88,hand:'guide'});});
 return events;
}
function buildBackingEvents(){
 resolveActiveGrid();const beats=state.meter===6?6:state.meter,spb=beatSeconds(),events=[],rand=mulberry32(state.seed*7919+state.degrees.reduce((a,d)=>a*11+d,17));
 state.degrees.forEach((d,bar)=>{
   const chord=degreeChord(d),start=chordStartBeat(bar,beats),dur=chordDurationBeats(bar,beats);
   const local=generateBar(chord,dur,rand,bar);
   local.forEach(e=>{
     let beat=e.beat;
     if(state.swing>0&&!e.foundation){const unit=rhythmUnit(),slot=Math.round(beat/unit);if(slot%2===1)beat+=state.swing/100*unit*.32;}
     const human=e.foundation?0:(rand()-.5)*(state.humanize/100)*.026;
     const globalBeat=start+beat;
     events.push({time:Math.max(0,globalBeat*spb+human),duration:Math.max(.09,e.len)*spb,notes:[...new Set(e.notes.map(fitRange))],velocity:e.foundation?82:clamp(86+(rand()-.5)*state.humanize*.22,1,127),hand:e.hand||'right',root:Boolean(e.foundation),chordTrigger:Boolean(e.chordTrigger)});
   });
 });
 events.sort((a,b)=>a.time-b.time);applyNoteLength(events);return events;
}
function applyNoteLength(events){const scale=.35+(state.noteLength/100)*1.3,roots=events.filter(e=>e.root).sort((a,b)=>a.time-b.time);events.forEach(e=>{let end=e.time+e.duration*scale;const nextRoot=roots.find(r=>r.time>e.time+.001);if(nextRoot)end=Math.min(end,nextRoot.time-.008);e.duration=Math.max(.03,end-e.time);});}
function generateBar(chord,beats,rand,bar){
 const out=[];
 const rootPc=chord.root;
 const lowRoot=fitLowRoot(rootPc);
 const tones=makeChordTonePool(chord);
 const complexity=state.complexity/100,density=state.density/100,variation=state.variation/100;
 const melodic=state.melodic/100,chordChance=state.chordChance/100,freedom=state.freedom/100;
 const varied=rand()<variation;
 const recipe=getPatternRecipe(state.pattern,beats,complexity,varied,rand);recipe.left.forEach(s=>s.beat=clamp(snapRhythm(s.beat),0,Math.max(0,beats-rhythmUnit())));recipe.right.forEach(s=>s.beat=clamp(snapRhythm(s.beat),0,Math.max(0,beats-rhythmUnit())));
 // 左手は必ずコードの頭を示す。白玉／ルート骨格を先に作り、その上へ右手を載せる。
 recipe.left.forEach((step,idx)=>{
   const note=step.role==='fifth'?fitRange(lowRoot+7):step.role==='octave'?fitRange(lowRoot+12):lowRoot;
   const bassNotes=step.role==='rootFifth'?[lowRoot,fitRange(lowRoot+7)]:step.octaves?[note,fitRange(note+12)]:[note];
   out.push({beat:step.beat,len:Math.min(step.len,Math.max(.25,beats-step.beat)),notes:bassNotes,foundation:idx===0,hand:'left'});
 });
 let last=nearestTone(tones,60);
 recipe.right.forEach((step,idx)=>{
   if(rand()>densityBoost(step,density))return;
   let note=chooseChordTone(tones,last,melodic,state.rangeMotion/100,rand,step.toneIndex);
   // 外音はFreedomのごく一部だけ。拍頭・強拍は必ずコード構成音へ戻す。
   const isStrong=step.strong||Math.abs(step.beat-Math.round(step.beat))<.01;
   if(!isStrong&&freedom>0&&rand()<freedom*.12)note=choosePassingTone(note,chord,rand);
   else note=snapToChordTone(note,tones);
   last=snapToChordTone(note,tones);
   let notes=[note];
   if(rand()<state.octave/100*.22&&notes.length<4){const oct=fitRange(notes[0]+12);if(!notes.includes(oct))notes.push(oct);}
   const gate=(.84+(1-freedom)*.12)*(step.gate||1);
   const len=Math.min(Math.max(.24,step.len*gate),Math.max(.25,beats-step.beat));
   out.push({beat:step.beat,len,notes:(isStrong||notes.length>1)?notes.map(n=>snapToChordTone(n,tones)):notes.map(fitRange),hand:'right'});
 });
 // RANDOM NOTESは既存の文法内へ追加する。完全に任意の音は作らない。
 const extras=Math.round(state.randomNotes*(.25+.75*complexity));
 for(let i=0;i<extras;i++){
   if(rand()>.35+density*.55)continue;
   const unit=rhythmUnit();
   const beat=Math.floor(rand()*Math.max(1,beats/unit))*unit;
   const strong=Math.abs(beat-Math.round(beat))<.01;
   let note=chooseChordTone(tones,last,melodic,state.rangeMotion/100,rand);
   if(!strong&&rand()<freedom*.08)note=choosePassingTone(note,chord,rand);
   else note=snapToChordTone(note,tones);
   last=snapToChordTone(note,tones);
   const notes=[last];
   out.push({beat:clamp(beat,0,beats-.05),len:unit*(1.8+complexity*2.2),notes,hand:'right'});
 }
 // 16ステップで直接指定した位置だけ、右手のルート・3度・5度を白玉で鳴らす。
 const triggerBeats=state.chordTriggers.map((on,i)=>on?i/16*beats:null).filter(v=>v!==null&&v<beats-.001);
 triggerBeats.forEach((beat,i)=>{for(let n=out.length-1;n>=0;n--)if(out[n].hand==='right'&&Math.abs(out[n].beat-beat)<.001)out.splice(n,1);const anchor=nearestTone(tones,60),triad=chooseVoicing(tones,anchor,3,0,rand);const next=triggerBeats[i+1]??beats;out.push({beat,len:Math.max(.25,next-beat)*.96,notes:triad,hand:'right',chordTrigger:true});});
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
 const lp=state.leftPattern;
 if(lp==='rootWhole')left=[l(0,beats*.98,'root')];
 else if(lp==='rootFifth')left=[l(0,beats*.98,'rootFifth')];
 else if(lp==='octave')left=[l(0,beats*.98,'octave',true)];
 else if(lp==='rootThenFifth')left=[l(0,beats/2*.94,'root'),l(beats/2,beats/2*.94,'fifth')];
 else if(lp==='rootThenOctave')left=[l(0,beats/2*.94,'root'),l(beats/2,beats/2*.94,'octave')];
 else if(lp==='walk')left=[l(0,beats/3*.94,'root'),l(beats/3,beats/3*.94,'fifth'),l(beats*2/3,beats/3*.94,'octave')];
 else if(lp==='beat13')left=[l(0,Math.min(2,beats)*.96,'root'),l(Math.min(2,beats-1),Math.max(1,beats-2)*.96,'fifth')];
 else if(lp==='waltz')left=[l(0,1.9,'root'),l(2,Math.max(.8,beats-2)*.9,'fifth')];
 else if(lp==='sixEight')left=[l(0,2.9,'root'),l(3,Math.max(.8,beats-3)*.94,'fifth')];
 else if(lp==='sync')left=[l(0,1.4,'root'),l(1.5,Math.min(1.4,beats-1.5),'fifth')];
 const rp=state.rightPattern;
 if(rp!=='auto'){
   right=[];const addPulse=(start,step,chord=true)=>{for(let b=start;b<beats;b+=step)right.push(q(b,step*.92,Math.round(b/step)%3,b%1===0,chord,chord?3:0));};
   if(rp==='block')right=[q(0,beats*.96,0,true,true,3)];
   else if(rp==='quarter')addPulse(0,1,true);else if(rp==='eighth')addPulse(0,.5,true);else if(rp==='offbeat')addPulse(.5,1,true);
   else if(['arpUp','arpDown','arpWave','alternate'].includes(rp)){const seq=rp==='arpDown'?[2,1,0,1]:rp==='arpWave'?[0,1,2,1]:rp==='alternate'?[0,2,1,2]:[0,1,2,1];for(let b=0,i=0;b<beats;b+=.5,i++)right.push(q(b,.48,seq[i%seq.length],b===0,false));}
   else if(rp==='ballad')right=[q(0,1.8,0,true,true,3),q(2,1.8,1,true,true,3)];
   else if(rp==='pop')addPulse(0,.5,true);else if(rp==='rock')addPulse(0,.5,true);
   else if(rp==='city'||rp==='sync')addPulse(.5,1,true);
   else if(rp==='waltz')right=[q(1,.9,0,false,true,3),q(2,.9,1,false,true,3)];
   else if(rp==='sixEight')for(let b=0;b<beats;b+=.5)right.push(q(b,.47,Math.round(b*2)%3,b===0||b===3,false));
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

function queuePianoRoll(){cancelAnimationFrame(state.visualFrame);state.visualFrame=requestAnimationFrame(renderPianoRoll);}
function resetPianoRoll(){state.rollView={zoomX:1,zoomY:1,panX:0,panY:0};queuePianoRoll();}
function setupPianoRollGestures(){const view=els.pianoRollViewport;if(!view)return;const pointers=new Map();let lastCenter=null,lastDistance=0,lastTap=0;
 const center=()=>{const ps=[...pointers.values()];return {x:ps.reduce((a,p)=>a+p.x,0)/ps.length,y:ps.reduce((a,p)=>a+p.y,0)/ps.length};};const distance=()=>{const ps=[...pointers.values()];return ps.length<2?0:Math.hypot(ps[0].x-ps[1].x,ps[0].y-ps[1].y);};
 view.addEventListener('pointerdown',e=>{pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});view.setPointerCapture?.(e.pointerId);lastCenter=center();lastDistance=distance();e.preventDefault();});
 view.addEventListener('pointermove',e=>{if(!pointers.has(e.pointerId))return;pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});const c=center();if(pointers.size===1&&lastCenter){state.rollView.panX+=c.x-lastCenter.x;state.rollView.panY+=c.y-lastCenter.y;}else if(pointers.size>=2){const d=distance();if(lastDistance>0){const factor=clamp(d/lastDistance,.85,1.15);state.rollView.zoomX=clamp(state.rollView.zoomX*factor,1,8);state.rollView.zoomY=clamp(state.rollView.zoomY*factor,1,6);}lastDistance=d;}lastCenter=c;queuePianoRoll();e.preventDefault();});
 const end=e=>{pointers.delete(e.pointerId);lastCenter=pointers.size?center():null;lastDistance=distance();};view.addEventListener('pointerup',e=>{const now=Date.now();if(now-lastTap<330)resetPianoRoll();lastTap=now;end(e);});view.addEventListener('pointercancel',end);
 view.addEventListener('wheel',e=>{e.preventDefault();const factor=e.deltaY<0?1.12:.89;if(e.shiftKey)state.rollView.zoomY=clamp(state.rollView.zoomY*factor,1,6);else state.rollView.zoomX=clamp(state.rollView.zoomX*factor,1,8);queuePianoRoll();},{passive:false});$('resetPianoRoll')?.addEventListener('click',resetPianoRoll);
}
function renderPianoRoll(){
 const canvas=els.pianoRollCanvas,view=els.pianoRollViewport;if(!canvas||!view||view.clientWidth<10)return;
 const events=state.lastEvents||buildBackingEvents(),dpr=Math.min(devicePixelRatio||1,2),w=view.clientWidth,h=view.clientHeight;canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);canvas.style.width=`${w}px`;canvas.style.height=`${h}px`;const ctx=canvas.getContext('2d');ctx.scale(dpr,dpr);ctx.clearRect(0,0,w,h);
 const labelW=36,min=state.rangeLow,max=state.rangeHigh,total=Math.max(...events.map(e=>e.time+e.duration),1),rows=Math.max(1,max-min+1),rv=state.rollView,mapX=x=>labelW+(x-labelW)*rv.zoomX+rv.panX,mapY=y=>(y-h/2)*rv.zoomY+h/2+rv.panY,pitchY=n=>mapY((max-n)/rows*h);
 ctx.fillStyle=getComputedStyle(document.body).getPropertyValue('--surface').trim()||'#102d48';ctx.fillRect(0,0,w,h);ctx.font='9px system-ui';ctx.textBaseline='middle';
 for(let n=min;n<=max;n++){const y=pitchY(n),black=[1,3,6,8,10].includes(n%12);ctx.fillStyle=black?'rgba(0,0,0,.13)':'rgba(255,255,255,.025)';ctx.fillRect(labelW,y,w-labelW,h/rows*rv.zoomY+1);if(n%12===0){ctx.fillStyle='rgba(255,255,255,.5)';ctx.fillText(noteLabel(n),3,y+4);ctx.strokeStyle='rgba(255,255,255,.13)';ctx.beginPath();ctx.moveTo(labelW,y);ctx.lineTo(w,y);ctx.stroke();}}
 const total16=total/beatSeconds()*4;for(let s=0;s<=total16;s++){const x=mapX(labelW+(w-labelW)*s/total16);ctx.strokeStyle=s%16===0?'rgba(255,255,255,.25)':s%4===0?'rgba(255,255,255,.12)':'rgba(255,255,255,.045)';ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,h);ctx.stroke();}
 events.forEach(e=>e.notes.forEach(n=>{const x=mapX(labelW+(w-labelW)*e.time/total),nw=Math.max(2,(w-labelW)*e.duration/total*rv.zoomX),y=pitchY(n),nh=Math.max(3,h/rows*.82*rv.zoomY);ctx.fillStyle=e.hand==='left'?'#3e8cff':e.chordTrigger?'#ffb43e':'#42f5db';ctx.globalAlpha=.86;ctx.fillRect(x,y+1,nw,nh);ctx.globalAlpha=1;}));
}

function exportMidi(backing){const events=backing?(state.lastEvents||buildBackingEvents()):buildChordEvents();const data=makeMidi(events,backing?'COORDINATE_BACKING':'COORDINATE_PROGRESSION');downloadBlob(new Blob([data],{type:'audio/midi'}),`${backing?'COORDINATE_BACKING':'COORDINATE_PROGRESSION'}_${state.bpm}BPM.mid`);}
function makeMidi(events,name){
 const tpq=480,tempo=Math.round(60000000/state.bpm),str=s=>[...s].map(c=>c.charCodeAt(0)),chunk=tr=>[...str('MTrk'),(tr.length>>>24)&255,(tr.length>>>16)&255,(tr.length>>>8)&255,tr.length&255,...tr];
 const meta=[];meta.push(0,0xff,0x03,name.length,...str(name),0,0xff,0x51,3,(tempo>>16)&255,(tempo>>8)&255,tempo&255);const denom=state.meter===6?8:4,nn=state.meter===6?6:state.meter;meta.push(0,0xff,0x58,4,nn,Math.log2(denom),24,8,0,0xff,0x2f,0);
 const makeNoteTrack=(trackName,items,channel)=>{const tr=[0,0xff,0x03,trackName.length,...str(trackName)],flat=[];items.forEach(e=>{const start=Math.max(0,Math.round(e.time/beatSeconds()*tpq)),end=start+Math.max(30,Math.round(e.duration/beatSeconds()*tpq));e.notes.forEach(n=>{flat.push({tick:start,on:true,n,vel:clamp(Math.round(e.velocity),1,127)});flat.push({tick:end,on:false,n,vel:0});});});flat.sort((a,b)=>a.tick-b.tick||Number(a.on)-Number(b.on));let last=0;flat.forEach(e=>{tr.push(...vlq(e.tick-last),(e.on?0x90:0x80)|channel,e.n,e.vel);last=e.tick;});tr.push(0,0xff,0x2f,0);return tr;};
 const left=events.filter(e=>e.hand==='left'),right=events.filter(e=>e.hand==='right'),guide=events.filter(e=>e.hand==='guide');const tracks=[meta,makeNoteTrack('Left Hand',left,0),makeNoteTrack('Right Hand',right,1),makeNoteTrack('Chord Guide',guide.length?guide:buildChordEvents(),2)];
 return new Uint8Array([...str('MThd'),0,0,0,6,0,1,0,tracks.length,(tpq>>8)&255,tpq&255,...tracks.flatMap(chunk)]);
}
function vlq(v){let b=[v&127];while(v>>=7)b.unshift((v&127)|128);return b;}
function downloadBlob(blob,name){const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=name;document.body.append(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove();},1000);}
function clamp(v,min,max){return Math.max(min,Math.min(max,v));}

document.addEventListener('DOMContentLoaded',init);
