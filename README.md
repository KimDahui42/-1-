# SpiritFy
> 숙명여자대학교 웹 프로그래밍 강의 웹시스템설계 수업에서 시작된 프로젝트입니다.
## Description
#### 개발 기간 : 2022.04.10 ~ 2022.04.31

<p>&nbsp우리는 음악을 추천하고 비슷한 음악들을 정리해 음악 탐험의 경험을 제공하고, 음악 서칭 결과를 이 사이트에 접속한 다양한 사람들과 나누어 사용자들이 웹사이트에서 더욱 색다른 경험을 할 수 있기를 바랍니다. </p>
<p>&nbspSpritfy는 음악 샘플 사이트인 Splice의 강력한 검색 기능과 음악 스트리밍 서비스인 Spotify의 방대한 곡의 데이터들을 가지고 음악 검색 기능을 편리하도록 제공하기 위한 웹서비스입니다.</p>

## Environment

<img src="https://img.shields.io/badge/javascript-F7DF1E?style=flat&logo=javascript&logoColor=black"/> 
<img src="https://img.shields.io/badge/html5-F34F26?style=flat&logo=html5&logoColor=white"/>
<img src="https://img.shields.io/badge/css3-1572B6?style=flat&logo=css3&logoColor=white"/>
<img src="https://img.shields.io/badge/tomcat-F8DC75?style=flat&logo=apache%20tomcat&logoColor=black"/>
<img src="https://img.shields.io/badge/spotify-1DB954?style=flat&logo=spotify&logoColor=white"/>

## Pages
### index.html
<p>
&nbsp가장 바깥화면에는 웹사이트 방문자들을 환영하는 문구와 함께 Spiritfy 웹사이트의 소개와 설명을 넣는다. 상단의 메뉴바에는 Spiritfy, EXPLORE, RECOMMED, COMMUNITY, LOGIN 이 차례로 나타난다. 우측에는 오늘의 노래를 3곡 추천해주는 식으로 구현하여 곡의 앨범 커버와 곡명, 아티스트를 출력하는 식으로 창을 구성하였다</p>

### explore.html
<p>&nbsp음악을 장르별, 트랙별, 스케일별로 필터링해서 보여주는 페이지이다. 트랙별로 음악을 필터링하여 볼 수 있으며 각각의 음악에 대해 곡의 분위기나 템포, 스케일, 에너지 등 다양한 정보를 분석하여 보여주는 기능이 있다. 자신의 스타일에 맞는 음악을 찾고 분석하는데 도움이 되도록 Spotify의 API를 활용하였으며 Track의 Audio Fetaures, Audio Analysis, get Genre, get Playlist, get Track 등 여러 기능을 가져와 사용한다. 특히 곡을 레퍼런스로 활용하거나 샘플을 받아올 때 편리하게 사용할 수 있다.
</p>

### recommend.html
<p>&nbsp연관된 곡들을 시각적으로 보여주어 사용자의 음악적 탐색에 도움을 주는 것을 목적으로 한다.
Spotify api를 기반으로 사용자가 검색창에 노래를 입력하면 search api로 노래 데이터를 가져오고 해당 곡의 아티스트 이름, 타이틀, 장르를 seed 데이터로 사용해 추천 곡을 가져와 마인드 맵 형식으로 출력한다. 
</p>

### community.html
<p>&nbspEXPLORE, RECOMMEND 페이지에서 서핑하고 찾은 음악들을 COMMUNITY에서 게시판 형식으로 공유한다. 이 COMMUNITY에서 다양한 장르의 음악과 관련된 글들을 쓸 수 있으며, 쓰고 싶은 장르를 선택하여 게시가 가능하다. 닉네임, 음악 장르, 작성일, 글 제목 순으로 커뮤니티에서 다른 사용자들이 쓴 글들이 보여진다. WRITE글씨에 마우스를 올리면 글씨가 커지는 이벤트가 발생한다.</p>

### signin.html
<p>&nbsp이름, 닉네임, 아이디, 패스워드, 패스워드 확인, 이메일을 입력받을 수 있는 로그인 페이지를 작성한다. 확인 버튼이 눌렸을 때 패스워드가 다르게 쓰였을 경우이 alert 창이 나온다. 각각 입력창에 정확한 형식을 입력할 수 있도록 한다. <다시쓰기> 버튼을 누르면 지금까지 쓰여진 모든 정보가 지워지고, <회원가입> 버튼을 누르면 가입이 완료되어 메인 페이지로 돌아간다.</p>