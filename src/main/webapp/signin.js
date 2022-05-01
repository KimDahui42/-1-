/**
 * 
 */
 let name=document.getElementById("name");
 let id_=document.getElementById("ID");
 let sign=document.getElementById("button");
 sign.addEventListener('click',signin);
 let password = document.getElementById("password");
 let passwordCheck = document.getElementById("passwordCheck");

function passwordcheck() {
		if(password.value!= passwordCheck.value) {
			alert("비밀번호가 동일하지 않습니다.");
			let pwcheck=false;
		}
		else {
			alert("비밀번호가 일치합니다.");
			let pwcheck= true;
		}
	}

 function signin() {
	if(pwcheck==true) {
		alert("Welcome To SPIRITFY");
		location.replace('index.html');
	}
	else {
		alert("비밀번호를 다시 확인하세요");
		return false;
	}
	
}
