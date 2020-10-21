function check() {
  const posts = document.querySelectorAll(".post");   //postをクラス名にもつ要素を取得、変数postsに代入
  posts.forEach(function (post) {    //postsの中身をforEachを使って一個ずつ取り出す。postsの中身は引数postに代入
    if (post.getAttribute("data-load") != null) {    //もし、data-load属性の中身が空じゃなかった場合
      return null;                                   //return nullでこれ以降の処理を終了する
    }
    post.setAttribute("data-load", "true")     //data-load属性の中身にtrueが入る要はdata-load=true
    post.addEventListener("click", () => {    //postがクリックされた時
      const postId = post.getAttribute("data-id")    //postIdの中にdata-id属性の値を取り出す中身はpostテーブルのidカラム？
      const XHR = new XMLHttpRequest();    //XHRの中に今からXMLHttpRequestを使うぞーと宣言
      XHR.open("GET", `/posts/${postId}`, true);    //openメソッドを使って、リクエストを送信するopen以降はリクエストの詳細
      XHR.responseType = "json";    //responseType メソッドを使ってレスポンスのデータ形式を指定。今回はjson恐らく他にはcsv,xmlも考えられる
      XHR.send();    //このsendメソッドで初めてリクエストが送信される。
      XHR.onload = () => {                 //onloadメソッドを宣言し、レスポンスの受信に成功した場合の処理を下記に記述
        if (XHR.status != 200) {     //もしレスポンスとして返されたHTTPステータスコードが200以外だったら
          alert(`Error ${XHR.status}: ${XHR.statusText}`);    //alertでエラーメッセージを表示させる
          return null;                                        //return nullでエラーが出た場合ここで処理が終わるように設定する
        }
        const item = XHR.response.post;    //XHR.responseで、レスポンスされてきたjsonにアクセスまた、コントローラーのcheckedアクションの中身が =以降に入る。それを変数itemに代入
        if (item.checked === true) {       //もしcheckedアクションが実行され返却された値がtrueの場合
          post.setAttribute("data-check", "true");    //data-check属性のデータがtrueになる
        } else if (item.checked === false) {    //falseの場合
          post.removeAttribute("data-check");   //data-check属性そのものが削除される
        }
      };
    });
  })
}
setInterval(check, 1000);     //check関数を1000ミリ秒間隔で実行