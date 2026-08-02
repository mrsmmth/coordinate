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
 ['四度上昇 1456','1456',['J-POP','Rock'],['明るい','爽やか','サビ'],4,'4小節'],
 ['下降ベース系 15654325','15654325',['J-POP','バラード'],['切ない','王道','サビ'],4,'8小節'],
 ['ツーファイブワン 251','251',['Jazz','Soul'],['王道','おしゃれ','解決'],5,'3小節'],
 ['リズムチェンジ系 3625','3625',['Jazz','R&B'],['おしゃれ','都会的','Aメロ'],4,'4小節'],
 ['ジャズ循環 6251','6251',['Jazz','R&B'],['おしゃれ','切ない','夜'],5,'4小節'],
 ['ターンアラウンド 1625','1625',['Jazz','Soul'],['循環','王道','終止'],4,'4小節'],
 ['ブルース基本 1411','1411',['Blues','Rock'],['王道','渋い','Aメロ'],4,'4小節'],
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
 pattern:'block',grid:16,click:false,countIn:false,clickVolume:65,randomNotes:4,freedom:35,complexity:45,density:55,variation:35,rangeMotion:30,octave:30,swing:0,humanize:15,accentWidth:55,
 rangeLow:36,rangeHigh:84,melodic:65,chordChance:45,chordOffsets:[],accents:[3,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0],audio:null,master:null,audioUnlocked:false,sources:[],timers:[],lastEvents:null,seed:1,isPlaying:false,stopAt:0
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
function selectTemplate(t){state.current=t;state.degrees=[...t.degrees];state.chordOffsets=state.degrees.map(()=>0);state.substituteIndex=0;renderLibrary();renderCurrent();}
function renderCurrent(){els.currentName.textContent=state.current.name;els.spreadStars.textContent=`蔓延率 ${stars(state.current.spread)}`;renderChordStrip(els.currentChords,state.degrees);renderChordStrip(els.backingChords,state.degrees);els.cycleInfo.textContent=`最小周期：${state.current.cycleLabel||state.degrees.length+'小節'} / ${state.degrees.length}コード`;renderChordTiming();renderSimilar();renderSubstitutes();updateSummary();}
function renderChordStrip(root,degrees){root.innerHTML='';degrees.forEach((d,i)=>{const c=degreeChord(d),div=document.createElement('div');div.className='chord-cell';div.innerHTML=`${c.name}<small>${ROMANS[d-1]||d} / ${i+1}</small><span class="offset">頭 ${formatOffset(state.chordOffsets[i]||0)}</span>`;root.append(div);});}
function formatOffset(step){if(step===0)return '拍頭';const beat=Math.floor(step/4)+1,sub=step%4;return sub===0?`${beat}拍目`:`${beat}拍目 + ${sub}/16`;}
function renderChordTiming(){
 if(!els.chordTimingGrid)return;
 els.chordTimingGrid.innerHTML='';
 state.degrees.forEach((d,i)=>{
   const row=document.createElement('div');row.className='timing-row';
   const lab=document.createElement('div');lab.className='timing-label';lab.innerHTML=`<strong>${degreeChord(d).name}</strong><small>${formatOffset(state.chordOffsets[i]||0)}</small>`;
   const track=document.createElement('div');track.className='timing-slider';track.setAttribute('role','slider');track.tabIndex=0;track.setAttribute('aria-label',`${degreeChord(d).name} の発音位置`);track.setAttribute('aria-valuemin','0');track.setAttribute('aria-valuemax','15');
   const ticks=document.createElement('div');ticks.className='timing-ticks';
   for(let st=0;st<16;st++){const tick=document.createElement('i');if(st%4===0)tick.className='beat';ticks.append(tick);}
   const handle=document.createElement('button');handle.type='button';handle.className='timing-handle';handle.innerHTML=`<span>${degreeChord(d).name}</span>`;
   const paint=()=>{const v=state.chordOffsets[i]||0;handle.style.left=`${v/15*100}%`;track.setAttribute('aria-valuenow',String(v));lab.querySelector('small').textContent=formatOffset(v);};
   const setFromPointer=e=>{const r=track.getBoundingClientRect();const x=clamp(e.clientX-r.left,0,r.width);state.chordOffsets[i]=clamp(Math.round(x/r.width*15),0,15);paint();renderChordStrip(els.currentChords,state.degrees);renderChordStrip(els.backingChords,state.degrees);state.lastEvents=null;updateSummary();};
   let dragging=false;
   handle.addEventListener('pointerdown',e=>{dragging=true;handle.setPointerCapture?.(e.pointerId);e.preventDefault();});
   handle.addEventListener('pointermove',e=>{if(dragging)setFromPointer(e);});
   handle.addEventListener('pointerup',e=>{if(dragging){dragging=false;setFromPointer(e);}});
   track.addEventListener('pointerdown',e=>{if(e.target===handle||handle.contains(e.target))return;setFromPointer(e);});
   track.addEventListener('keydown',e=>{let v=state.chordOffsets[i]||0;if(e.key==='ArrowRight'||e.key==='ArrowUp')v++;else if(e.key==='ArrowLeft'||e.key==='ArrowDown')v--;else return;e.preventDefault();state.chordOffsets[i]=clamp(v,0,15);paint();renderChordStrip(els.currentChords,state.degrees);renderChordStrip(els.backingChords,state.degrees);state.lastEvents=null;});
   track.append(ticks,handle);row.append(lab,track);els.chordTimingGrid.append(row);paint();
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
function updateAllControls(){['bpm','clickVolume','randomNotes','freedom','complexity','density','variation','rangeMotion','octave','swing','humanize','melodic','chordChance','accentWidth'].forEach(p=>setParam(p,state[p],false));renderRange();updateSummary();}
function updateSummary(){const p=PATTERNS.find(x=>x.id===state.pattern);els.backingSummary.textContent=`${p?.name||'Theory'} / ${meterLabel()} / ${state.bpm} BPM`;els.engineSummary.textContent=`旋律性 ${state.melodic} · 和音率 ${state.chordChance} · Complexity ${state.complexity} · Freedom ${state.freedom} · Random ${state.randomNotes} · Range ${noteLabel(state.rangeLow)}–${noteLabel(state.rangeHigh)}`;$('bpmValue').textContent=state.bpm;$('clickVolumeValue').textContent=state.clickVolume;}
function meterLabel(){return state.meter===6?'6/8':`${state.meter}/4`;}
function flashSummary(){els.engineSummary.animate([{opacity:.2},{opacity:1}],{duration:350});}

function audioContext(){
 if(!state.audio || state.audio.state==='closed'){
   const Ctx=window.AudioContext||window.webkitAudioContext;
   if(!Ctx)throw new Error('Web Audio API is not supported');
   state.audio=new Ctx();
   state.master=state.audio.createGain();
   state.master.gain.value=1.0;
   state.master.connect(state.audio.destination);
 }
 return state.audio;
}
function stopAudio(){
 state.timers.forEach(t=>clearTimeout(t));state.timers=[];
 state.sources.forEach(n=>{try{n.stop();}catch{}});state.sources=[];
 state.isPlaying=false;updatePlayButtons();
}
function updatePlayButtons(){const txt=state.isPlaying?'■ 停止':'▶ 再生';const global=state.isPlaying?'■ STOP':'▶ PLAY';if($('playBacking'))$('playBacking').textContent=txt;if($('globalPlay'))$('globalPlay').innerHTML=`<span>${state.isPlaying?'■':'▶'}</span> ${state.isPlaying?'STOP':'PLAY'}`;}
function unlockAudioNow(){
 try{
   const ctx=audioContext();
   if(ctx.state==='suspended')ctx.resume().catch(()=>{});
   // iOS Safari/PWAでは、ユーザー操作と同じイベント内で音源をstartする必要がある。
   const buffer=ctx.createBuffer(1,1,ctx.sampleRate);
   const source=ctx.createBufferSource();
   const gain=ctx.createGain();
   gain.gain.value=.00001;
   source.buffer=buffer;source.connect(gain).connect(state.master||ctx.destination);source.start(0);
   state.audioUnlocked=true;
   return ctx;
 }catch(err){console.error('Audio unlock failed',err);return null;}
}
function togglePlay(backing){
 if(state.isPlaying){stopAudio();return;}
 const ctx=unlockAudioNow();
 if(!ctx){showAudioError('音声エンジンを作れませんでした');return;}
 play(backing,ctx);
}
function showAudioError(message){
 const target=$('engineSummary');
 if(target){target.textContent='⚠ '+message+'。端末音量と消音設定を確認し、もう一度再生してください。';target.classList.add('audio-error');}
}
async function play(backing,ctx=audioContext()){
 stopAudio();
 try{
   if(ctx.state==='suspended')await ctx.resume();
   if(ctx.state!=='running')throw new Error('AudioContext state: '+ctx.state);
 }
 catch(err){console.error(err);showAudioError('音声の開始がブロックされました');return;}
 state.isPlaying=true;updatePlayButtons();
 $('engineSummary')?.classList.remove('audio-error');
 const countBeats=state.countIn?(state.meter===6?6:state.meter):0;
 const delay=countBeats*secondsPerBeat();
 const lead=.06;
 if(state.click||state.countIn)scheduleClick(ctx,countBeats,delay+lead,backing);
 const events=backing?buildBackingEvents():buildChordEvents();if(backing)state.lastEvents=events;
 events.forEach(e=>scheduleNotes(ctx,e.time+delay+lead,e.duration,e.notes,e.velocity));
 const end=Math.max(0,...events.map(e=>e.time+e.duration))+delay+lead+.2;
 state.timers.push(setTimeout(stopAudio,end*1000));
}
function scheduleClick(ctx,countBeats,delay,includeMain){const beatsPerBar=state.meter===6?6:state.meter,total=countBeats+state.degrees.length*beatsPerBar;for(let i=0;i<total;i++){if(i>=countBeats&&!state.click)continue;const t=delay+i*secondsPerBeat();const strong=i%beatsPerBar===0;scheduleTone(ctx,t,.055,strong?1500:950,Math.max(.025,state.clickVolume/100*.13),true);}}
function scheduleNotes(ctx,time,duration,notes,velocity=90){notes.forEach((n,i)=>{const freq=440*Math.pow(2,(n-69)/12);scheduleTone(ctx,time,duration,freq,Math.max(.045,velocity/127*.20)/(1+i*.08),false);});}
function scheduleTone(ctx,time,duration,freq,gainValue,click){
 const o=ctx.createOscillator(),g=ctx.createGain(),f=ctx.createBiquadFilter();
 const start=ctx.currentTime+Math.max(0,time),end=start+Math.max(.06,duration);
 o.type=click?'square':'triangle';o.frequency.setValueAtTime(freq,start);
 f.type='lowpass';f.frequency.setValueAtTime(click?2600:2100,start);f.Q.value=click?.3:.75;
 g.gain.setValueAtTime(.0001,start);g.gain.exponentialRampToValueAtTime(Math.max(.0002,gainValue),start+.012);
 g.gain.setValueAtTime(Math.max(.0002,gainValue*.82),Math.max(start+.013,end-.055));g.gain.exponentialRampToValueAtTime(.0001,end);
 o.connect(f).connect(g).connect(state.master||ctx.destination);o.start(start);o.stop(end+.03);state.sources.push(o);
 o.addEventListener('ended',()=>{const i=state.sources.indexOf(o);if(i>=0)state.sources.splice(i,1);},{once:true});
}

function chordStartBeat(index,beats){return index*beats+(state.chordOffsets[index]||0)/4;}
function chordDurationBeats(index,beats){const start=chordStartBeat(index,beats);const next=index<state.degrees.length-1?chordStartBeat(index+1,beats):state.degrees.length*beats;return Math.max(.25,next-start);}
function buildChordEvents(){const beats=state.meter===6?6:state.meter,spb=secondsPerBeat(),events=[];state.degrees.forEach((d,i)=>{const c=degreeChord(d),root=fitRange(48+c.root),notes=c.intervals.map(x=>fitRange(root+x));const st=chordStartBeat(i,beats),dur=chordDurationBeats(i,beats);events.push({time:st*spb,duration:dur*spb*.96,notes:[...new Set(notes)],velocity:88});});return events;}
function buildBackingEvents(){
 const beats=state.meter===6?6:state.meter,spb=secondsPerBeat(),events=[],rand=mulberry32(state.seed++ + Date.now()%100000);
 state.degrees.forEach((d,bar)=>{const chord=degreeChord(d),start=chordStartBeat(bar,beats),dur=chordDurationBeats(bar,beats);const local=generateBar(chord,dur,rand,bar);local.forEach(e=>{let beat=e.beat;if(state.grid===24||state.swing>0){const frac=beat%1;if(frac>.2&&frac<.8)beat+=state.swing/100*.16;}const human=(rand()-.5)*(state.humanize/100)*.045;const globalBeat=start+beat;const accentIndex=Math.floor((globalBeat%beats)/beats*16)%16;events.push({time:globalBeat*spb+human,duration:Math.max(.08,e.len)*spb,notes:[...new Set(e.notes.map(fitRange))],velocity:accentVelocity(state.accents[accentIndex],rand)});});});
 return events.sort((a,b)=>a.time-b.time);
}
function generateBar(chord,beats,rand,bar){
 const root=48+chord.root, tones=chord.intervals.map(i=>root+i), out=[];
 // 必ず小節頭にコードの根を示す白玉ベース。コード開始位置がシンコペでもそこから鳴る。
 out.push({beat:0,len:Math.max(.75,beats*.96),notes:[root-12],foundation:true});
 const density=state.density/100, melodic=state.melodic/100, chordChance=state.chordChance/100, complexity=state.complexity/100, freedom=state.freedom/100;
 const baseCount=Math.max(1,Math.round(beats*(1+density*2.2)+state.randomNotes*(.3+.7*freedom)));
 let lastTone=tones[0];
 for(let i=0;i<baseCount;i++){
   if(rand()>.45+density*.55)continue;
   const grid=state.grid===24?6:4;let beat=Math.floor(rand()*beats*grid)/grid;
   if(i===0)beat=0;
   const chordOnly=rand()>freedom*.28;
   let pitch;
   if(chordOnly){
     if(melodic>.15){const sorted=[...tones,tones[0]+12,tones[1]+12,tones[2]+12];sorted.sort((a,b)=>Math.abs(a-lastTone)-Math.abs(b-lastTone));const pool=sorted.slice(0,Math.max(2,Math.round(2+melodic*3)));pitch=pool[Math.floor(rand()*pool.length)];}
     else pitch=tones[Math.floor(rand()*tones.length)];
   } else {const scale=MAJOR_SCALE.map(x=>48+state.key+x);pitch=scale[Math.floor(rand()*scale.length)]+(rand()<.35?12:0);}
   lastTone=pitch;
   let notes=[pitch];
   if(rand()<chordChance){const maxVoices=2+Math.round(complexity*2);const count=2+Math.floor(rand()*Math.max(1,maxVoices-1));notes=[];const shuffled=[...tones,tones[0]+12,tones[1]+12,tones[2]+12].sort(()=>rand()-.5);for(let n=0;n<count;n++)notes.push(shuffled[n]);}
   if(rand()<state.octave/100*.35)notes.push(notes[0]+(rand()<.5?12:-12));
   const gate=.72+(.22*(1-freedom));const unit=state.grid===24?1/3:.25;let len=Math.max(unit,unit*(1+Math.floor(rand()*(2+complexity*4))))*gate;
   if(state.pattern==='block')len=Math.max(.8,1.8*gate);
   if(state.pattern==='pulse8')beat=Math.round(beat*2)/2;
   if(state.pattern==='arpUp'||state.pattern==='arpWave'||state.pattern==='broken')notes=[notes[0]];
   const motion=Math.round((rand()-.5)*(state.rangeMotion/100)*20);notes=notes.map(n=>n+motion);
   out.push({beat:clamp(beat,0,beats-.05),len:clamp(len,.18,Math.max(.25,beats-beat)),notes});
 }
 return out.sort((a,b)=>a.beat-b.beat);
}
function accentVelocity(level,rand){const width=state.accentWidth/100;const center=84,spread=10+width*34;const offsets=[-spread*.55,-spread*.2,spread*.25,spread];return clamp(center+offsets[level]+(rand()-.5)*state.humanize*.22,1,127);}
function fitRange(note){while(note<state.rangeLow)note+=12;while(note>state.rangeHigh)note-=12;return clamp(Math.round(note),state.rangeLow,state.rangeHigh);}
function noteLabel(n){return NOTE_NAMES[((n%12)+12)%12]+(Math.floor(n/12)-1);}
function mulberry32(a){return function(){let t=a+=0x6D2B79F5;t=Math.imul(t^t>>>15,t|1);t^=t+Math.imul(t^t>>>7,t|61);return ((t^t>>>14)>>>0)/4294967296;};}

function exportMidi(backing){const events=backing?(state.lastEvents||buildBackingEvents()):buildChordEvents();const data=makeMidi(events,backing?'COORDINATE_BACKING':'COORDINATE_PROGRESSION');downloadBlob(new Blob([data],{type:'audio/midi'}),`${backing?'COORDINATE_BACKING':'COORDINATE_PROGRESSION'}_${state.bpm}BPM.mid`);}
function makeMidi(events,name){const tpq=480,tempo=Math.round(60000000/state.bpm),bytes=[],push=(...x)=>bytes.push(...x),str=s=>[...s].map(c=>c.charCodeAt(0));push(...str('MThd'),0,0,0,6,0,1,0,1,(tpq>>8)&255,tpq&255);let tr=[],tpush=(...x)=>tr.push(...x);tpush(0,0xff,0x03,name.length,...str(name));tpush(0,0xff,0x51,3,(tempo>>16)&255,(tempo>>8)&255,tempo&255);const denom=state.meter===6?8:4,nn=state.meter===6?6:state.meter;tpush(0,0xff,0x58,4,nn,Math.log2(denom),24,8);const flat=[];events.forEach(e=>{const start=Math.max(0,Math.round(e.time/secondsPerBeat()*tpq)),end=start+Math.max(90,Math.round(e.duration/secondsPerBeat()*tpq));e.notes.forEach(n=>{flat.push({tick:start,on:true,n,vel:Math.round(e.velocity)});flat.push({tick:end,on:false,n,vel:0});});});flat.sort((a,b)=>a.tick-b.tick||Number(a.on)-Number(b.on));let last=0;flat.forEach(e=>{tpush(...vlq(e.tick-last),e.on?0x90:0x80,e.n,e.vel);last=e.tick;});tpush(0,0xff,0x2f,0);push(...str('MTrk'),(tr.length>>>24)&255,(tr.length>>>16)&255,(tr.length>>>8)&255,tr.length&255,...tr);return new Uint8Array(bytes);}
function vlq(v){let b=[v&127];while(v>>=7)b.unshift((v&127)|128);return b;}
function downloadBlob(blob,name){const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=name;document.body.append(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove();},1000);}
function clamp(v,min,max){return Math.max(min,Math.min(max,v));}

document.addEventListener('DOMContentLoaded',init);
