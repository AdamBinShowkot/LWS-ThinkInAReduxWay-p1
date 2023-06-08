const AddAnotherEl=document.querySelector(".lws-addMatch");
const ResetMatch=document.querySelector('.lws-reset');
const AllMatchs=document.querySelector(".all-matches");

// action identifiers
const ADD_NEW_MATCH='match/addNewMatch';
const RESET_MATCH_SCORE='match/resetMatchScore';
const HANDLE_SCORE_CHANGE='match/handleScoreChange';
const HANDLE_REMOVE_MATCH='match/removerow';

// action creators

const addNewMatch=(matchData)=>{
    return{
        type:ADD_NEW_MATCH,
        payload:matchData
    }
}
const handleScoreChange=(matchData)=>{
    return{
        type:HANDLE_SCORE_CHANGE,
        payload:matchData
    }
}
const handleReset=(matchData)=>{
    return{
        type:RESET_MATCH_SCORE,
        payload:matchData
    }
}
const removeMatchRow=(matchData)=>{
    return{
        type:RESET_MATCH_SCORE,
        payload:matchData
    }
}

const initialState={
    matchLists:[
        {
            total:0
        }
    ]
}

// create reducer function
function matchReducer(state=initialState,action){
    if(action.type===ADD_NEW_MATCH){
        return{
            ...state,
            matchLists:[...state.matchLists,action.payload]
        }
    }else if(action.type===HANDLE_SCORE_CHANGE){
        return{
            ...state,
            matchLists:action.payload
        }
    }else if(action.type===RESET_MATCH_SCORE){
        return{
            ...state,
            matchLists:action.payload
        }
    }else if(action.type===RESET_MATCH_SCORE){
        return{
            ...state,
            matchLists:action.payload
        }
    }else{
        return state;
    }
}

// create store
const store=Redux.createStore(matchReducer);


function handleAddNewMatch(){
    const newMatch={
        total:0
    }
    store.dispatch(addNewMatch(newMatch));
}

AddAnotherEl.addEventListener("click",handleAddNewMatch);

function handleResetAllMatch(){
    const state=store.getState();
    const matchLists=[...state.matchLists];

    let newMatchLists=[];
    if(matchLists.length){
        matchLists.map((mData,index)=>{
            const newObj={
                total:0
            }
            newMatchLists=[...newMatchLists,newObj];
        })
    }
    store.dispatch(handleReset(newMatchLists));
}
ResetMatch.addEventListener("click",handleResetAllMatch);


function onScoreChange(inputEl,index) {
    const state=store.getState();
    const matchLists=[...state.matchLists];

    let inputForm=inputEl.parentNode;
    let Name=inputEl.name;
    let Value=inputEl.value;
    
    let total=matchLists[index].total;
    if(Name==="increment"){
        total=(+total)+(+Value);
    }else if(Name==="decrement"){
        total-=Value;
    }

    if(total<0){
        total=0;
    }
    inputForm.addEventListener("submit",function(event){
        event.preventDefault();
        matchLists[index].total=total;
        store.dispatch(handleScoreChange(matchLists));
        inputEl.value="";
    })
}
function handleMatchDelete(inputEl,index){
    const state=store.getState();
    const matchLists=state.matchLists;

    if(matchLists.length>1){
        matchLists.splice(index,1);
        store.dispatch(removeMatchRow(matchLists));
    }
}

function initialMatchLoad(){
    const state=store.getState();
    const matchLists=state.matchLists;
    if(matchLists.length){
        AllMatchs.innerHTML=`${matchLists.map(function(mData,index){
            return `<div class="match">
            <div class="wrapper">
                <button onclick="handleMatchDelete(this,'${index}')" class="lws-delete">
                    <img src="./image/delete.svg" alt="" />
                </button>
                <h3 class="lws-matchName">Match ${index+1}</h3>
            </div>
            <div class="inc-dec">
                <form class="incrementForm">
                    <h4>Increment</h4>
                    <input
                        type="number"
                        name="increment"
                        onkeydown="onScoreChange(this, '${index}')"
                        class="lws-increment"
                    />
                </form>
                <form class="decrementForm">
                    <h4>Decrement</h4>
                    <input
                        type="number"
                        name="decrement"
                        onkeydown="onScoreChange(this, '${index}')"
                        class="lws-decrement"
                    />
                </form>
            </div>
            <div class="numbers">
                <h2 class="lws-singleResult">${mData.total?mData.total:0}</h2>
            </div>
        </div>`
        })}
        `
    }
}
initialMatchLoad();
store.subscribe(initialMatchLoad);
