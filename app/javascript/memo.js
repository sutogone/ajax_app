function memo() {
  const submit = document.getElementById("submit");     //投稿ボタンのIDを取得し、変数submitへ代入
  submit.addEventListener("click", (e) => {       //submitボタンが押された時以下の処理を実行。また、処理の内容は引数eへ入る。
    const formData = new FormData(document.getElementById("form"));   //FormDataオブジェクトを作成し、post:id（メモ内容）を取得。変数fromDataに代入
    const XHR = new XMLHttpRequest()    //XHRの中に今からXMLHttpRequestを使うぞーと宣言
    XHR.open("POST", "/posts", true);    //openメソッドを使って、リクエストを送信するopen以降はリクエストの詳細
    XHR.responseType = "json";    //responseType メソッドを使ってレスポンスのデータ形式を指定。今回はjson
    XHR.send(formData);    //formの内容を送信する
    XHR.onload = () => {          //onloadメソッドを宣言し、レスポンスの受信に成功した場合の処理を下記に記述
      if (XHR.status != 200) {     //もしレスポンスとして返されたHTTPステータスコードが200以外だったら
        alert(`Error ${XHR.status}: ${XHR.statusText}`);    //alertでエラーメッセージを表示させる
        return null;                                        //return nullでエラーが出た場合ここで処理が終わるように設定する
      }
      const item = XHR.response.post;    //XHR.responseで、レスポンスされてきたjsonにアクセスまた、コントローラーのcreateアクションの中身が =以降に入る。それを変数itemに代入
      const list = document.getElementById("list")    //id listの中身を変数itemに代入
      const formText = document.getElementById("content")    //id contentの中身を変数formTextに代入
      const HTML = `
          <div class="post" data-id=${item.id}>
            <div class="post-date">
              投稿日時 : ${item.created_at}
            </div>
            <div class="post-content">
            ${item.content}
            </div>
          </div> `;                              //HTMLの記述はID listへ表示させる部分内容を変数HTMLへ代入
      list.insertAdjacentHTML("afterend", HTML);      //id listの直後にHTML変数の中身を代入
      formText.value = "";          //入力蘭(content)の内容(value)を空っぽに上書きしている
    };
    e.preventDefault();    //submitボタンが押された際のURLへの画面遷移とデータ送信を阻止する
  });
}
window.addEventListener("load", memo);     //ページが読み込まれたらmemo関数を実行