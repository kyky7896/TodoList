// <!--  자바 스크립트  -->

let cnt = 0; //글번호

window.onload=function () {
  let add = document.getElementById('add');
  let todoList = document.getElementById('todoList');

  let todoValue=document.getElementById('inputbox')
  add.addEventListener('click', function () {
    cnt++;
    todo=todoValue.value
    console.log(todo)
    if (!todo) { //input창에 아무것도 없을때
      alert("다시 입력해주세요")
      return;
    }

    //input에 있을때
    //객체 생성
    let obj="{cnt:'"+cnt+"',input:'"+todo+"'}";
    //li요소 생성
    let li = document.createElement("li");
    li.setAttribute("id", "todo_" + cnt);
    let html = "<input type='checkbox' name='chkbox' id='chkbox_" + cnt + "' onclick=Is_chked(" + obj +")>";
    html += todo ;
    html += "<input type='button' value='수정' onclick=edit("+obj+")>";
    html += "<input type='button' value='삭제' onclick=del("+obj+")>";

    //div의 html요소에 html넣기
    li.innerHTML = html;

    //list라는 id를 객체로 받아오기
    let list = document.getElementById("todoList");
    //list의 자식에 div 추가하기
    list.appendChild(li);

    clear();

  });

  //todo부분 이미 추가되었을때 삭제
  const clear = () => {
    f1.inputbox.value = "";
  }

}//리스너


  //div 내에 있는 체크박스 체크시 => 완료된 일로 이동하고 밑줄
  const Is_chked = (obj) => {
    let list = document.getElementById("todoList"); //현재 있는 list
    let todo = document.getElementById("todo_" + obj.cnt);
    let wan = document.getElementById("wanList"); //옮겨야할 list
    let todo_ch=todo.childNodes; //자식객체
    let chk=todo_ch[0] //checkbox가 첫번째 객체임.
    if(chk.checked==true) { // 완료div에 있고, checked되었을때 : 완료 목록으로 이동
      list.removeChild(todo);
      wan.appendChild(todo);
    }else if(chk.checked==false){
      wan.removeChild(todo);
      list.appendChild(todo);
    }
  }

  const del=(obj)=>{
    let todo=document.getElementById("todo_"+obj.cnt);
    let parent=todo.parentNode;
    parent.removeChild(todo);
  }

  //전체 checkbox 체크시 => 아래 체크박스들도 전부 체크되게 하기!
  const checkAll = (checkAll) => { //checkAll==this
    let chkboxes=document.getElementsByName("chkbox");
    chkboxes.forEach((checkbox)=>{
      checkbox.checked=checkAll.checked;
    });
  }

  //삭제
  const edit=(obj)=>{
    let todo_li=document.getElementById("todo_"+obj.cnt);
    let todo_ch=todo_li.childNodes; //자식객체
    let chk=todo_ch[0]//check유무 t와 f로

    let object="{cnt:'"+obj.cnt+"',input:'"+obj.input+"'}";
    console.log(JSON.stringify(object))
    let html="<form id='f2'>";
    html+="<input type='checkbox' id='chkbox_"+obj.cnt+"' onclick=Is_chked(" + obj + ")>";
    html+="<input type='text' id='inputbox_"+obj.cnt+"' value='"+obj.input+"'>";
    html+="<input type='button' value='수정함' onclick=editWan("+object+")>";
    html+="<input type='button' value='수정안함' onclick=notEdit("+object+")>";
    html+="</form>"
    if(chk==true){
      document.getElementById("chkbox_"+obj.cnt).checked=true;
    }else if(chk==false){
      document.getElementById("chkbox_"+obj.cnt).checked=false;
    }
    todo_li.innerHTML=html;
  }

  const editWan=(object)=>{
    let todo_li= document.getElementById("todo_"+object.cnt);
    let input=document.getElementById("inputbox_"+object.cnt).value;

    let obj="{cnt:'"+object.cnt+"',input:'"+input+"'}";
    let html = "<input type='checkbox' name='chkbox' id='chkbox_" + object.cnt + "' onclick=Is_chked(" + obj +")>";
    html += input ;
    html += "<input type='button' value='수정' onclick=edit(" + obj + ")>";
    html += "<input type='button' value='삭제' onclick=del(" + obj + ")>";

    todo_li.innerHTML = html;
  }

  const notEdit=(object)=>{

    let todo_li = document.getElementById("todo_" + object.cnt);
    let input = object.input; //이전의 객체에 들어간 정보
    console.log(input);
    let obj="{cnt:'"+object.cnt+"',input:'"+input+"'}";
    let html = "<input type='checkbox' name='chkbox' id='chkbox_" + object.cnt + "' onclick=Is_chked(" + object.cnt + ")>";
    html += input;
    html += "<input type='button' value='수정' onclick=edit(" + obj + ")>";
    html += "<input type='button' value='삭제' onclick=del(" + obj + ")>";

    //div의 html요소에 html넣기
    todo_li.innerHTML = html;

    //현재 list가 있는 부모 위치
    let list = todo_li.parentNode;
    //부모의 자식에 div 추가하기
    // list.appendChild(todo_li);
    
    list.replaceChild(todo_li)

  }

